import type { StepData } from '../types';

interface StepInfo extends StepData {
  title: string;
  desc: string;
  pillTopIcon: string;
  pillTopText: string;
  pillBottomIcon: string;
  pillBottomText: string;
}

export function initStory(): () => void {
  const storyCard = document.getElementById('storyCard');
  const stSteps = document.querySelectorAll<HTMLElement>('.st-step');
  const storyIcons = document.querySelectorAll<HTMLElement>('.story-icon');
  const storyTime = document.getElementById('storyTime');
  const storyClockLabel = document.getElementById('storyClockLabel');
  const storyCaption = document.getElementById('storyCaption');
  const storyTimeBlock = storyTime ? storyTime.parentElement : null;
  const storyPillTop = document.getElementById('storyPillTop');
  const storyPillBottom = document.getElementById('storyPillBottom');
  const storyPillTopText = document.getElementById('storyPillTopText');
  const storyPillBottomText = document.getElementById('storyPillBottomText');

  const progBars = [
    document.getElementById('prog1'),
    document.getElementById('prog2'),
    document.getElementById('prog3')
  ];

  const stepData: Record<number, StepInfo> = {
    1: {
      time: 'Select Trade',
      label: 'STEP 01',
      caption: 'Browse trades and tap ADD to build your crew.',
      glow: '85% -10%',
      title: 'Pick your trade & headcount',
      desc: 'Open the OnBase app and browse verified tradesmen — brick masons, plasterers, tilers, and helpers. Tap ADD to select the exact crew required for your project.',
      pillTopIcon: '👆',
      pillTopText: 'Tap ADD on any trade',
      pillBottomIcon: '🛡️',
      pillBottomText: 'Verified site masons'
    },
    2: {
      time: 'Review Cart',
      label: 'STEP 02',
      caption: 'Add helpers, site contact & address with ₹0 platform fee.',
      glow: '50% 30%',
      title: 'Review cart, add helpers & site location',
      desc: 'Add helper labor if needed, enter your site address and supervisor contact details, and review the transparent payout with ₹0 platform booking fees.',
      pillTopIcon: '💸',
      pillTopText: '₹0 Platform Fee',
      pillBottomIcon: '📍',
      pillBottomText: 'Delivered to site'
    },
    3: {
      time: 'Book Slot',
      label: 'STEP 03',
      caption: 'Pick single or multi-day shift timings and confirm slot.',
      glow: '20% 75%',
      title: 'Choose your dates, hours & confirm slot',
      desc: 'Select single-day or multi-day schedules, pick your exact shift working hours (e.g. 9:00 AM to 5:00 PM), and tap Confirm Slot to lock in your verified crew.',
      pillTopIcon: '⏰',
      pillTopText: '9 AM – 5 PM hours',
      pillBottomIcon: '✅',
      pillBottomText: 'Ready next morning'
    }
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
    if (storyPillTop) storyPillTop.classList.add('transitioning');
    if (storyPillBottom) storyPillBottom.classList.add('transitioning');

    setTimeout(() => {
      if (storyTime) storyTime.textContent = d.time;
      if (storyClockLabel) storyClockLabel.textContent = d.label;
      if (storyCaption) storyCaption.textContent = d.caption;

      if (storyPillTop) {
        const icon = storyPillTop.querySelector('.pill-icon');
        if (icon) icon.textContent = d.pillTopIcon;
        if (storyPillTopText) storyPillTopText.textContent = d.pillTopText;
        storyPillTop.classList.remove('transitioning');
      }
      if (storyPillBottom) {
        const icon = storyPillBottom.querySelector('.pill-icon');
        if (icon) icon.textContent = d.pillBottomIcon;
        if (storyPillBottomText) storyPillBottomText.textContent = d.pillBottomText;
        storyPillBottom.classList.remove('transitioning');
      }

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

  // Desktop click on steps
  stSteps.forEach((step) => {
    step.addEventListener('click', () => {
      step.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  let storyTicking = false;

  const updateStory = (): void => {
    if (window.innerWidth <= 860) return;

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
    if (window.innerWidth > 860 && !storyTicking) {
      requestAnimationFrame(updateStory);
      storyTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateStory);
  setStoryStep(1);

  return updateStory;
}
