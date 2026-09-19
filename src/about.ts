import './style.css';
import { initLenis } from './modules/lenis';
import { initHeader } from './modules/header';
import { initCounters } from './modules/counters';

document.addEventListener('DOMContentLoaded', () => {
  const updateHeader = initHeader();
  initLenis([updateHeader]);
  initCounters();
});
