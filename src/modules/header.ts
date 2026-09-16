export function initHeader(): () => void {
  const siteHeader = document.querySelector<HTMLElement>('header');

  const updateHeader = (): void => {
    if (!siteHeader) return;
    siteHeader.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.7);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  return updateHeader;
}
