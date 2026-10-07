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
async function fetchRepoMeta(owner: string, name: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
      headers: {
        "User-Agent": "effessdev.github.io",
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      description: typeof data.description === "string" ? data.description : "",
      language: (data.language as string | null) ?? undefined,
      stars:
        typeof data.stargazers_count === "number"
          ? data.stargazers_count
          : undefined,
    };
  } catch {
    return null;
  }
}

async function resolveRepo(ref: RepoRef): Promise<Repo> {
  const entry = typeof ref === "string" ? { name: ref } : ref;
  const isGithub = entry.github ?? true;
  const owner = entry.owner ?? DEFAULT_OWNER;

  let description = entry.description ?? "";
  let language: string | undefined;
  let stars: number | undefined;
  if (isGithub) {
    // Fetch to refresh the description and pick up language/stars each build.
    const meta = await fetchRepoMeta(owner, entry.name);
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
  return Promise.all(
    categories.map(async (category) => ({
      name: category.name,
      description: category.description,
      repos: await Promise.all(category.repos.map(resolveRepo)),
    })),
  );
}
