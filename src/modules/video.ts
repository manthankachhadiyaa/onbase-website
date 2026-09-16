export function initHeroVideo(): void {
  const heroVideo = document.getElementById('heroVideo') as HTMLVideoElement | null;
  const muteToggle = document.getElementById('muteToggle') as HTMLElement | null;

  if (heroVideo) {
    heroVideo.muted = true;
    const tryPlay = (): void => {
      const p = heroVideo.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    };
    heroVideo.addEventListener('loadeddata', tryPlay);
    heroVideo.addEventListener('canplay', tryPlay);
    tryPlay();
  }

  if (heroVideo && muteToggle) {
    muteToggle.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      muteToggle.classList.toggle('is-on', !heroVideo.muted);
    });
  }
}
