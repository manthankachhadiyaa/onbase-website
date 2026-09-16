import type { Brick } from '../types';

export function initGame(): void {
  const canvas = document.getElementById('game') as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const scoreEl = document.getElementById('score');
  let score = 0;
  let bricks: Brick[] = [];
  const running = true;

  function resizeCanvas(): void {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function spawn(): void {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    bricks.push({
      x: Math.random() * (w - 70) + 35,
      y: rect.height + 24,
      w: 54,
      h: 26,
      speed: 1.1 + Math.random() * 1.2,
      popped: false,
      life: 0
    });
  }

  setInterval(() => {
    if (running && bricks.length < 8) spawn();
  }, 850);

  function draw(): void {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    bricks.forEach((b) => {
      b.y -= b.speed;
      b.life++;
      ctx.save();
      ctx.globalAlpha = b.popped ? Math.max(0, 1 - b.life / 20) : 1;
      const scale = b.popped ? 1.3 : 1;
      const bw = b.w * scale;
      const bh = b.h * scale;
      ctx.fillStyle = b.popped ? '#ffb877' : '#ff6900';
      ctx.fillRect(b.x - bw / 2, b.y - bh / 2, bw, bh);

      if (!b.popped) {
        ctx.strokeStyle = 'rgba(30,41,59,0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(b.x - bw / 2, b.y);
        ctx.lineTo(b.x + bw / 2, b.y);
        ctx.stroke();
      }
      ctx.restore();
    });

    bricks = bricks.filter((b) => b.y > -40 && !(b.popped && b.life > 20));
    requestAnimationFrame(draw);
  }
  draw();

  canvas.addEventListener('click', (e: MouseEvent) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (const b of bricks) {
      if (!b.popped) {
        if (Math.abs(mx - b.x) < b.w / 2 + 6 && Math.abs(my - b.y) < b.h / 2 + 6) {
          b.popped = true;
          b.life = 0;
          score++;
          if (scoreEl) scoreEl.textContent = score.toString();
          break;
        }
      }
    }
  });
}
