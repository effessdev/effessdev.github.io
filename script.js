const username = "faseehfs-dev";
const container = document.getElementById("repos");

/*
  Add repo names here that you want to hide from the website
  Example: ["old-project", "test-repo"]
*/
const hiddenRepos = [username, username + ".github.io"];

async function loadRepos() {
  container.innerHTML = `<div class="card">Loading repositories...</div>`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
    );
    const repos = await res.json();

    const visibleRepos = repos
      .filter((repo) => !repo.fork)
      .filter((repo) => !hiddenRepos.includes(repo.name))
      .sort((a, b) => {
        if (a.description && !b.description) return -1;
        if (!a.description && b.description) return 1;
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

    container.innerHTML = "";

    visibleRepos.forEach((repo) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        ${repo.description ? `<p>${repo.description}</p>` : ""}
        <p style="font-size: 0.9rem; opacity: 0.7;">
          ⭐ ${repo.stargazers_count} • Updated ${new Date(repo.updated_at).toLocaleDateString()}
        </p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<div class="card">Failed to load repositories.</div>`;
  }
}

loadRepos();
