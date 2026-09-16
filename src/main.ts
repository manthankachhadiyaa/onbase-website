import './style.css';
import { initLenis } from './modules/lenis';
import { initHeader } from './modules/header';
import { initHeroVideo } from './modules/video';
import { initStory } from './modules/story';
import { initCarousel } from './modules/carousel';
import { initCounters } from './modules/counters';
import { initTestimonials } from './modules/testimonials';
import { initGame } from './modules/game';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Header and Story controllers first to register scroll listeners with Lenis
  const updateHeader = initHeader();
  const updateStory = initStory();

  // Initialize Lenis smooth scrolling with synced scroll updates
  initLenis([updateHeader, updateStory]);

  // Initialize all interactive components
  initHeroVideo();
  initCarousel();
  initCounters();
  initTestimonials();
  initGame();
});
