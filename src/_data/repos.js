async function getRepos(username) {
  const hiddenRepos = [username, username + ".github.io"];

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: {
        "User-Agent": "eleventy-build-script",
      },
    },
  );

  if (!res.ok) {
    console.error(
      `GitHub API error for ${username}: ${res.status} ${res.statusText}`,
    );
    return [];
  }

  const repos = await res.json();

  if (!Array.isArray(repos)) {
    return [];
  }

  return repos
    .filter((repo) => !repo.fork)
    .filter((repo) => !hiddenRepos.includes(repo.name))
    .sort((a, b) => {
      if (a.description && !b.description) return -1;
      if (!a.description && b.description) return 1;
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
}

module.exports = async function () {
  const [mainRepos, archivedRepos] = await Promise.all([
    getRepos("faseehfs-dev"),
    getRepos("faseehfs-archive"),
  ]);

  return { mainRepos, archivedRepos };
};
