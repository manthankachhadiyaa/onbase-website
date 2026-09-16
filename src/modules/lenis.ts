import Lenis from 'lenis';

export type ScrollCallback = () => void;

export function initLenis(onScrollCallbacks: ScrollCallback[] = []): Lenis {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    infinite: false
  });

  function raf(time: number): void {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', () => {
    for (const cb of onScrollCallbacks) {
      cb();
    }
  });

  // Smooth scroll for internal hash links with offset
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e: MouseEvent) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -50, duration: 1.2 });
      }
    });
  });

  return lenis;
}
