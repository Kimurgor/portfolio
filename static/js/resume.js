(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : preference.matches;
  const syncToggle = () => {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(isDark()));
    toggle.setAttribute('aria-label', `Switch to ${isDark() ? 'light' : 'dark'} theme`);
  };
  syncToggle();
  preference.addEventListener('change', syncToggle);
  toggle?.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch (e) {}
    syncToggle();
  });
  const clock = document.getElementById('local-time');
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  const updateClock = () => {
    if (!clock) return;
    const now = new Date();
    clock.textContent = formatter.format(now);
    clock.dateTime = now.toISOString();
  };
  updateClock();
  setInterval(updateClock, 1000);
})();
