import type { StepData } from '../types';

export function initStory(): () => void {
  const storyCard = document.getElementById('storyCard');
  const stSteps = document.querySelectorAll<HTMLElement>('.st-step');
  const storyIcons = document.querySelectorAll<HTMLElement>('.story-icon');
  const storyTime = document.getElementById('storyTime');
  const storyClockLabel = document.getElementById('storyClockLabel');
  const storyCaption = document.getElementById('storyCaption');
  const storyTimeBlock = storyTime ? storyTime.parentElement : null;
  const progBars = [
    document.getElementById('prog1'),
    document.getElementById('prog2'),
    document.getElementById('prog3')
  ];

  const stepData: Record<number, StepData> = {
    1: { time: 'Select Trade', label: 'STEP 01', caption: 'Browse trades and tap ADD to build your crew.', glow: '85% -10%' },
    2: { time: 'Review Cart', label: 'STEP 02', caption: 'Add helpers, site contact & address with ₹0 platform fee.', glow: '50% 30%' },
    3: { time: 'Book Slot', label: 'STEP 03', caption: 'Pick single or multi-day shift timings and confirm slot.', glow: '20% 75%' }
  };

  let currentStoryStep = 0;

  function setStoryStep(n: number): void {
    if (n === currentStoryStep) return;
    currentStoryStep = n;
    const d = stepData[n];
    if (!d) return;

    if (storyCard) {
      const [glowX, glowY] = d.glow.split(' ');
      if (glowX) storyCard.style.setProperty('--glow-x', glowX);
      if (glowY) storyCard.style.setProperty('--glow-y', glowY);
    }

    if (storyTimeBlock) storyTimeBlock.classList.add('transitioning');
    if (storyCaption) storyCaption.classList.add('transitioning');

    setTimeout(() => {
      if (storyTime) storyTime.textContent = d.time;
      if (storyClockLabel) storyClockLabel.textContent = d.label;
      if (storyCaption) storyCaption.textContent = d.caption;
      if (storyTimeBlock) storyTimeBlock.classList.remove('transitioning');
      if (storyCaption) storyCaption.classList.remove('transitioning');
    }, 160);

    storyIcons.forEach((icon) => {
      const iconIndex = parseInt(icon.dataset.icon || '0', 10);
      icon.classList.toggle('on', iconIndex === n);
    });

    progBars.forEach((bar, i) => {
      if (bar) bar.style.width = (i < n) ? '100%' : '0%';
    });

    stSteps.forEach((step) => {
      const stepIndex = parseInt(step.dataset.step || '0', 10);
      step.classList.toggle('active', stepIndex === n);
    });
  }

  stSteps.forEach((step) => {
    step.addEventListener('click', () => {
      step.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  let storyTicking = false;

  const updateStory = (): void => {
    const vh = window.innerHeight;
    const triggerY = vh * 0.45;
    let active = 1;
    stSteps.forEach((step) => {
      const r = step.getBoundingClientRect();
      if (r.top <= triggerY) {
        active = parseInt(step.dataset.step || '1', 10);
      }
    });
    setStoryStep(active);
    storyTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!storyTicking) {
      requestAnimationFrame(updateStory);
      storyTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateStory);
  updateStory();

  return updateStory;
}
