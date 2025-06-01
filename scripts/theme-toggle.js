document.addEventListener('DOMContentLoaded', () => {
  // Apply default theme based on 7am–7pm window
  const now = new Date();
  const hour = now.getHours();
  const defaultMode = (hour >= 7 && hour < 19) ? 'light' : 'dark';
  document.body.classList.add(`${defaultMode}-mode`);

  // Manual toggle for override
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      document.body.classList.toggle('light-mode', !isLight);
      document.body.classList.toggle('dark-mode', isLight);
    });
  }
});
