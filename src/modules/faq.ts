export function initFaq(): void {
  const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('.faq-question');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other open accordion items for a clean single-open experience
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          const otherTrigger = other.querySelector<HTMLButtonElement>('.faq-question');
          if (otherTrigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
