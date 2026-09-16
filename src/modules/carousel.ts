export function initCarousel(): void {
  const tradeScroll = document.getElementById('tradeScroll') as HTMLElement | null;
  const tradePrevBtn = document.getElementById('tradePrevBtn') as HTMLButtonElement | null;
  const tradeNextBtn = document.getElementById('tradeNextBtn') as HTMLButtonElement | null;
  const tradeFloatingNext = document.getElementById('tradeFloatingNext') as HTMLElement | null;

  function updateTradeNav(): void {
    if (!tradeScroll) return;
    const maxScroll = tradeScroll.scrollWidth - tradeScroll.clientWidth - 15;
    const current = tradeScroll.scrollLeft;
    if (tradePrevBtn) tradePrevBtn.disabled = current <= 10;
    if (tradeNextBtn) tradeNextBtn.disabled = current >= maxScroll;
    if (tradeFloatingNext) {
      if (current >= maxScroll) {
        tradeFloatingNext.classList.add('is-hidden');
      } else {
        tradeFloatingNext.classList.remove('is-hidden');
      }
    }
  }

  function scrollTrades(direction: number): void {
    if (!tradeScroll) return;
    const cardStep = 306; // card width + gap
    tradeScroll.scrollBy({ left: direction * cardStep, behavior: 'smooth' });
  }

  if (tradePrevBtn) tradePrevBtn.addEventListener('click', () => scrollTrades(-1));
  if (tradeNextBtn) tradeNextBtn.addEventListener('click', () => scrollTrades(1));
  if (tradeFloatingNext) tradeFloatingNext.addEventListener('click', () => scrollTrades(1));
  if (tradeScroll) {
    tradeScroll.addEventListener('scroll', updateTradeNav, { passive: true });
    window.addEventListener('resize', updateTradeNav, { passive: true });
    setTimeout(updateTradeNav, 100);
  }
}
