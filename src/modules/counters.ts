export function initCounters(): void {
  // scroll reveal
  const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  // stat count-up
  const stats = document.querySelectorAll<HTMLElement>('.stat-num');
  const statIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const raw = el.textContent?.trim() || '';
          const match = raw.match(/[\d.]+/);
          if (match) {
            const num = parseFloat(match[0]);
            const suffix = raw.replace(match[0], '');
            let cur = 0;
            const step = Math.max(num / 40, 0.5);
            const tick = (): void => {
              cur += step;
              if (cur >= num) {
                el.textContent = num + suffix;
                return;
              }
              el.textContent = Math.floor(cur) + suffix;
              requestAnimationFrame(tick);
            };
            tick();
          }
          statIO.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  stats.forEach((el) => statIO.observe(el));

  // crew counter
  let count = 0;
  const crewCount = document.getElementById('crewCount');
  document.querySelectorAll<HTMLElement>('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      count++;
      if (crewCount) crewCount.textContent = count.toString();
      const originalText = btn.textContent || '';
      btn.textContent = 'ADDED ✓';
      btn.style.background = 'var(--orange)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--orange)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 700);
    });
  });
}
