(() => {
  const root = document.documentElement;
  const system = matchMedia("(prefers-color-scheme: dark)");
  try {
    const saved = localStorage.getItem("notes-theme");
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch {}
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : system.matches;
    const syncTheme = () => {
      const label = isDark() ? "Switch to light mode" : "Switch to dark mode";
      toggle?.setAttribute("aria-label", label);
      toggle?.setAttribute("title", label);
    };
    syncTheme();
    toggle?.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("notes-theme", root.dataset.theme); } catch {}
      syncTheme();
    });
    system.addEventListener?.("change", syncTheme);

    const filters = document.querySelector(".filters");
    if (!filters) return;
    const buttons = [...filters.querySelectorAll("button[data-filter]")];
    const rows = [...document.querySelectorAll("[data-post-list] [data-category]")];
    const empty = document.querySelector("[data-empty-state]");
    const message = document.querySelector("[data-empty-message]");
    const heading = empty?.querySelector("p");
    const status = document.querySelector("[data-filter-status]");
    function select(value) {
      const chosen = buttons.find(b => b.dataset.filter === value) || buttons[0];
      const selected = chosen.dataset.filter;
      let visible = 0;
      rows.forEach(row => {
        row.hidden = selected !== "all" && row.dataset.category !== selected;
        if (!row.hidden) visible++;
      });
      buttons.forEach(button => button.setAttribute("aria-pressed", String(button === chosen)));
      if (empty) empty.hidden = visible !== 0;
      if (heading) heading.textContent = selected === "all" ? "A little room for what comes next." : "Nothing filed here just yet.";
      if (message) message.textContent = selected === "all" ? "The first notes will find their way here." : "Notes in this collection will appear here when they are ready.";
      if (status) status.textContent = visible + (visible === 1 ? " note" : " notes") + (selected === "all" ? "" : " in " + chosen.title);
    }
    buttons.forEach(button => button.addEventListener("click", () => select(button.dataset.filter)));
    filters.hidden = false;
    select("all");
  });
})();
