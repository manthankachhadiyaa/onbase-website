export function initStory(): () => void {
  const cards = document.querySelectorAll<HTMLElement>('.how-step-card');
  if (!cards.length) return () => {};

  // Interactive subtle radial glow following cursor on desktop hover
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    });
  });

  return () => {};
}
