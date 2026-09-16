export function initTestimonials(): void {
  const quotes: string[] = [
    'Had three masons on site by 7am, no calls made.',
    'Finally a helper who actually shows up.',
    'Booked at midnight, confirmed before I woke up.',
    'Fixed rate, no haggling at the gate.',
    "This replaced my entire contractor's phonebook.",
    'Scaffolding crew showed up with their own harnesses.'
  ];

  function buildRow(id: string): void {
    const row = document.getElementById(id);
    if (!row) return;
    const doubled = [...quotes, ...quotes];
    row.innerHTML = doubled.map((q) => `<div class="chip">${q}</div>`).join('');
  }

  buildRow('row1');
  buildRow('row2');
}
