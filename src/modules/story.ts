import type { StepData } from '../types';

interface StepInfo extends StepData {
  title: string;
  desc: string;
}

export function initStory(): () => void {
  const storyCard = document.getElementById('storyCard');
  const stSteps = document.querySelectorAll<HTMLElement>('.st-step');
  const storyIcons = document.querySelectorAll<HTMLElement>('.story-icon');
  const storyTime = document.getElementById('storyTime');
  const storyClockLabel = document.getElementById('storyClockLabel');
  const storyCaption = document.getElementById('storyCaption');
  const storyTimeBlock = storyTime ? storyTime.parentElement : null;
  const storyMobileTitle = document.getElementById('storyMobileTitle');
  const storyMobileBody = document.getElementById('storyMobileBody');
  const storyTabs = document.querySelectorAll<HTMLButtonElement>('.story-tab');
  const storyDots = document.querySelectorAll<HTMLElement>('.story-mobile-dots .dot');
  const storyPrevBtn = document.getElementById('storyPrevBtn') as HTMLButtonElement | null;
  const storyNextBtn = document.getElementById('storyNextBtn') as HTMLButtonElement | null;
  const storyNextBtnText = document.getElementById('storyNextBtnText');

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
      desc: 'Open the OnBase app and browse verified tradesmen — brick masons, plasterers, tilers, and helpers. Tap ADD to select the exact crew required for your project.'
    },
    2: {
      time: 'Review Cart',
      label: 'STEP 02',
      caption: 'Add helpers, site contact & address with ₹0 platform fee.',
      glow: '50% 30%',
      title: 'Review cart, add helpers & site location',
      desc: 'Add helper labor if needed, enter your site address and supervisor contact details, and review the transparent payout with ₹0 platform booking fees.'
    },
    3: {
      time: 'Book Slot',
      label: 'STEP 03',
      caption: 'Pick single or multi-day shift timings and confirm slot.',
      glow: '20% 75%',
      title: 'Choose your dates, hours & confirm slot',
      desc: 'Select single-day or multi-day schedules, pick your exact shift working hours (e.g. 9:00 AM to 5:00 PM), and tap Confirm Slot to lock in your verified crew.'
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

    setTimeout(() => {
      if (storyTime) storyTime.textContent = d.time;
      if (storyClockLabel) storyClockLabel.textContent = d.label;
      if (storyCaption) storyCaption.textContent = d.caption;
      if (storyMobileTitle) storyMobileTitle.textContent = d.title;
      if (storyMobileBody) storyMobileBody.textContent = d.desc;
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

    // Sync mobile tabs
    storyTabs.forEach((tab) => {
      const tabNum = parseInt(tab.dataset.tab || '0', 10);
      tab.classList.toggle('active', tabNum === n);
    });

    // Sync mobile dots
    storyDots.forEach((dot) => {
      const dotNum = parseInt(dot.dataset.dot || '0', 10);
      dot.classList.toggle('active', dotNum === n);
    });

    // Sync prev/next buttons
    if (storyPrevBtn) {
      storyPrevBtn.disabled = (n === 1);
    }
    if (storyNextBtn && storyNextBtnText) {
      if (n === 3) {
        storyNextBtnText.textContent = 'Get App';
      } else {
        storyNextBtnText.textContent = 'Next Step';
      }
    }
  }

  // Mobile tab click events
  storyTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabNum = parseInt(tab.dataset.tab || '1', 10);
      setStoryStep(tabNum);
    });
  });

  // Mobile Prev / Next click events
  if (storyPrevBtn) {
    storyPrevBtn.addEventListener('click', () => {
      if (currentStoryStep > 1) {
        setStoryStep(currentStoryStep - 1);
      }
    });
  }

  if (storyNextBtn) {
    storyNextBtn.addEventListener('click', () => {
      if (currentStoryStep < 3) {
        setStoryStep(currentStoryStep + 1);
      } else {
        document.getElementById('download-app')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Touch swipe gesture support on mobile
  if (storyCard) {
    let touchStartX = 0;
    let touchEndX = 0;

    storyCard.addEventListener('touchstart', (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    storyCard.addEventListener('touchend', (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 45) {
        if (diffX < 0 && currentStoryStep < 3) {
          // Swiped left -> Next
          setStoryStep(currentStoryStep + 1);
        } else if (diffX > 0 && currentStoryStep > 1) {
          // Swiped right -> Prev
          setStoryStep(currentStoryStep - 1);
        }
      }
    }, { passive: true });
  }

  // Desktop click on steps
  stSteps.forEach((step) => {
    step.addEventListener('click', () => {
      step.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  let storyTicking = false;

  const updateStory = (): void => {
    // Only scroll-sync on desktop where st-step is visible in the viewport
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
