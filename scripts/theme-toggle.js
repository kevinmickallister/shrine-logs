function handleThemeToggle() {
  const isLight = document.body.classList.contains('light-mode');
  document.body.classList.toggle('light-mode', !isLight);
  document.body.classList.toggle('dark-mode', isLight);
}

function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', handleThemeToggle);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply default theme from 7am to before 7pm
  const now = new Date();
  const hour = now.getHours();
  const defaultMode = (hour >= 7 && hour < 19) ? 'light' : 'dark';
  document.body.classList.add(`$defaultMode}-mode`);

  setupThemeToggle();

  // Load external includes (Codex addition)
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    if (file) {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;
    }
  });
});

// Enable exports for testing (Codex addition)
if (typeof module !== 'undefined') {
  module.exports = { handleThemeToggle };
}
