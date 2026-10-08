import { readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

/** GitHub account that owns the plain-string repos in `home.json`. */
const DEFAULT_OWNER = "effessdev";

/**
 * A repo is either just its GitHub name (description fetched at build time) or
 * an object for curated/non-GitHub entries where we already know the details.
 */
const RepoRefSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    owner: z.string().optional(),
    label: z.string().optional(),
    url: z.string().url().optional(),
    description: z.string().optional(),
    note: z.string().optional(),
    /** When false, the entry isn't a GitHub repo — skip the API fetch. */
    github: z.boolean().optional(),
  }),
]);

const CategorySchema = z.object({
  name: z.string(),
  description: z.string().default(""),
  repos: z.array(RepoRefSchema).default([]),
});

const HomeSchema = z.object({
  categories: z.array(CategorySchema),
});

type RepoRef = z.infer<typeof RepoRefSchema>;

export type Repo = {
  label: string;
  url: string;
  description: string;
  note?: string;
  language?: string;
  stars?: number;
};

export type Category = { name: string; description: string; repos: Repo[] };

/** Live metadata for a GitHub repo, read fresh on every build. */
type RepoMeta = {
  description: string;
  language?: string;
  stars?: number;
};

/**
 * Fetches every repo for an owner in as few requests as possible (one per
 * page of 100) and returns a map keyed by lowercased repo name. This replaces
 * the old per-repo fetch that exhausted the unauthenticated GitHub rate limit
 * and left some descriptions blank.
 */
async function fetchOwnerRepos(owner: string): Promise<Map<string, RepoMeta>> {
  const byName = new Map<string, RepoMeta>();
  try {
    for (let page = 1; ; page++) {
      const res = await fetch(
        `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}`,
        {
          headers: {
            "User-Agent": "effessdev.github.io",
            Accept: "application/vnd.github+json",
          },
          // Static export has no runtime to re-fetch, so `cache: "no-store"` would
          // break the build. `force-cache` reuses the response from the persisted
          // fetch cache (see deploy.yml) instead of pinging GitHub on every build —
          // so a deploy only hits the API when that cache is cold or has rolled
          // over, which is far less often than one call per deploy.
          cache: "force-cache",
        },
      );
      if (!res.ok) break;
      const data = (await res.json()) as unknown[];
      if (!Array.isArray(data) || data.length === 0) break;
      for (const item of data as Record<string, unknown>[]) {
        const name = typeof item.name === "string" ? item.name : undefined;
        if (!name) continue;
        byName.set(name.toLowerCase(), {
          description:
            typeof item.description === "string" ? item.description : "",
          language: (item.language as string | null) ?? undefined,
          stars:
            typeof item.stargazers_count === "number"
              ? item.stargazers_count
              : undefined,
        });
      }
      if (data.length < 100) break;
    }
  } catch {
    // Return whatever we managed to collect; missing repos keep their curated text.
  }
  return byName;
}

function ownerOf(ref: RepoRef): string | null {
  const entry = typeof ref === "string" ? { name: ref } : ref;
  if ((entry.github ?? true) === false) return null;
  return entry.owner ?? DEFAULT_OWNER;
}

async function resolveRepo(
  ref: RepoRef,
  repos: Map<string, RepoMeta>,
): Promise<Repo> {
  const entry = typeof ref === "string" ? { name: ref } : ref;
  const isGithub = entry.github ?? true;
  const owner = entry.owner ?? DEFAULT_OWNER;

  let description = entry.description ?? "";
  let language: string | undefined;
  let stars: number | undefined;
  if (isGithub) {
    // Read metadata from the pre-fetched owner listing — no per-repo request.
    const meta = repos.get(entry.name.toLowerCase());
    if (meta) {
      description = entry.description ?? meta.description;
      language = meta.language;
      stars = meta.stars;
    }
  }

  return {
    label: entry.label ?? entry.name,
    url:
      entry.url ??
      (isGithub ? `https://github.com/${owner}/${entry.name}` : ""),
    description,
    note: entry.note,
    language,
    stars,
  };
}

/** Reads `home.json` and enriches each repo with build-time GitHub metadata. */
export async function loadHome(): Promise<Category[]> {
  const raw = readFileSync(join(process.cwd(), "content", "home.json"), "utf8");
  const { categories } = HomeSchema.parse(JSON.parse(raw));

  // Fetch once per distinct owner, then reuse that listing for every repo.
  const owners = new Set<string>();
  for (const category of categories) {
    for (const ref of category.repos) {
      const owner = ownerOf(ref);
      if (owner) owners.add(owner);
    }
  }
  const reposByOwner = new Map<string, Map<string, RepoMeta>>();
  await Promise.all(
    [...owners].map(async (owner) => {
      reposByOwner.set(owner, await fetchOwnerRepos(owner));
    }),
  );

  return Promise.all(
    categories.map(async (category) => ({
      name: category.name,
      description: category.description,
      repos: await Promise.all(
        category.repos.map((ref) => {
          const owner = ownerOf(ref);
          return resolveRepo(
            ref,
            (owner && reposByOwner.get(owner)) || new Map(),
          );
        }),
      ),
    })),
  );
}
