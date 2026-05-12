const username = "faseehfs-dev";

const hiddenRepos = [username, username + ".github.io"];

module.exports = async function () {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
  );

  const repos = await res.json();

  return repos
    .filter((repo) => !repo.fork)
    .filter((repo) => !hiddenRepos.includes(repo.name))
    .sort((a, b) => {
      if (a.description && !b.description) return -1;
      if (!a.description && b.description) return 1;
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
};
