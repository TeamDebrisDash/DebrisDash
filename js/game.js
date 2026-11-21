// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
    resizeGame();
    resizeRadar();
  });
});

// PSLV Cleanup Game Engine
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('game-wrapper');

function resizeGame() {
  canvas.width = wrapper.clientWidth || 820;
  canvas.height = wrapper.clientHeight || 530;
}
window.addEventListener('resize', () => {
  resizeGame();
  resizeRadar();
});

let running = false;
let fuel = 100;
let streak = 0;
let score = 0;
let speedMultiplier = 1.0;
let frame = 0;

const player = { x: 400, y: 450, speed: 6.5 };
let items = [];
let particles = [];
const stars = Array.from({ length: 70 }, () => ({
  x: Math.random() * 860,
  y: Math.random() * 530,
  r: Math.random() * 1.6 + 0.4,
  s: Math.random() * 0.6 + 0.2
}));

const keys = {};
window.addEventListener('keydown', e => (keys[e.key.toLowerCase()] = true));
window.addEventListener('keyup', e => (keys[e.key.toLowerCase()] = false));

function handlePointer(clientX, clientY) {
  if (!running) return;
  const rect = canvas.getBoundingClientRect();
  player.x = ((clientX - rect.left) / rect.width) * canvas.width;
  player.y = Math.max(80, Math.min(canvas.height - 35, ((clientY - rect.top) / rect.height) * canvas.height));
}
canvas.addEventListener('mousemove', e => {
  if (e.buttons === 1) handlePointer(e.clientX, e.clientY);
});
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  handlePointer(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('share-btn').addEventListener('click', () => {
  const text = `I cleared ${score} kg of orbital space junk in DebrisDash before Kessler Syndrome hit! 🛰️ Help keep Low Earth Orbit clean for ISRO's 2030 Debris-Free Space Mission: ${window.location.href}`;
  navigator.clipboard.writeText(text);
  document.getElementById('copy-msg').textContent = '✅ Impact score copied to clipboard! Share with your squad.';
});

function startGame() {
  resizeGame();
  fuel = 100;
  streak = 0;
  score = 0;
  speedMultiplier = 1.0;
  items = [];
  particles = [];
  player.x = canvas.width / 2;
  player.y = canvas.height - 75;
  running = true;

  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('gameover-screen').classList.add('hidden');
  document.getElementById('hud').classList.remove('hidden');
  document.getElementById('copy-msg').textContent = '';
  updateHUD();
  requestAnimationFrame(loop);
}

function spawnItem() {
  const isDebris = Math.random() < 0.62;
  items.push({
    x: Math.random() * (canvas.width - 50) + 25,
    y: -25,
    r: isDebris ? 13 : 15 + Math.random() * 6,
    type: isDebris ? 'debris' : 'asteroid',
    vy: (isDebris ? 2.5 : 3.4) * speedMultiplier + Math.random() * 1.1,
    vx: (Math.random() - 0.5) * 1.2,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.08
  });
}

function createExplosion(x, y, color, count = 18) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = Math.random() * 4 + 1;
    particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 35, color });
  }
}

function updateHUD() {
  document.getElementById('fuel-text').textContent = Math.max(0, Math.round(fuel)) + '%';
  document.getElementById('fuel-fill').style.width = Math.max(0, fuel) + '%';
  document.getElementById('streak-text').textContent = streak;
  document.getElementById('score-text').textContent = score;
  document.getElementById('level-text').textContent = speedMultiplier.toFixed(1) + 'x';
  for (let i = 1; i <= 5; i++) {
    document.getElementById('d' + i).classList.toggle('active', i <= streak);
  }
}

function triggerGameOver(reason) {
  running = false;
  createExplosion(player.x, player.y, '#ef4444', 55);

  const randomImpact = ISRO_DATA.impacts[Math.floor(Math.random() * ISRO_DATA.impacts.length)];
  document.getElementById('death-reason').textContent = `${reason} • Total Debris Cleared: ${score} kg`;
  document.getElementById('impact-text').textContent = 'Real-World Impact: ' + randomImpact;

  let board = JSON.parse(localStorage.getItem('debrisdash_lb') || '[]');
  board.push({ name: 'PSLV-' + Math.floor(100 + Math.random() * 900), score });
  board.sort((a, b) => b.score - a.score);
  board = board.slice(0, 4);
  localStorage.setItem('debrisdash_lb', JSON.stringify(board));
  document.getElementById('lb-list').innerHTML = board
    .map((e, i) => `<div class="lb-row"><span>#${i + 1} ${e.name}</span><strong>${e.score} kg</strong></div>`)
    .join('');

  setTimeout(() => {
    document.getElementById('gameover-screen').classList.remove('hidden');
  }, 450);
}

function drawPSLV(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = frame % 4 < 2 ? '#f97316' : '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(-7, 22);
  ctx.lineTo(0, 34 + Math.random() * 8);
  ctx.lineTo(7, 22);
  ctx.fill();

  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(-15, 4, 5, 18);
  ctx.fillRect(10, 4, 5, 18);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-9, -14, 18, 36);

  ctx.fillStyle = '#f97316';
  ctx.fillRect(-9, -4, 18, 5);
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(-9, 8, 18, 4);

  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(-9, -14);
  ctx.lineTo(0, -26);
  ctx.lineTo(9, -14);
  ctx.fill();
  ctx.restore();
}

function loop() {
  if (!running) return;
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height + 260, 220, canvas.width / 2, canvas.height + 260, 360);
  grad.addColorStop(0, '#1d4ed8');
  grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.25)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#94a3b8';
  stars.forEach(s => {
    s.y += s.s * speedMultiplier;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  if (keys['arrowleft'] || keys['a']) player.x -= player.speed;
  if (keys['arrowright'] || keys['d']) player.x += player.speed;
  if (keys['arrowup'] || keys['w']) player.y -= player.speed;
  if (keys['arrowdown'] || keys['s']) player.y += player.speed;
  player.x = Math.max(24, Math.min(canvas.width - 24, player.x));
  player.y = Math.max(75, Math.min(canvas.height - 32, player.y));

  fuel -= 0.035 * speedMultiplier;
  if (fuel <= 0) {
    updateHUD();
    return triggerGameOver('PSLV Fuel Exhausted in Orbit!');
  }

  if (frame % Math.max(24, Math.round(52 / speedMultiplier)) === 0) spawnItem();

  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i];
    it.y += it.vy;
    it.x += it.vx;
    it.angle += it.spin;

    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(it.angle);
    if (it.type === 'debris') {
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#facc15';
      ctx.fillStyle = '#facc15';
      ctx.fillRect(-10, -6, 20, 12);
      ctx.strokeStyle = '#fef08a';
      ctx.strokeRect(-10, -6, 20, 12);
    } else {
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ef4444';
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      for (let k = 0; k < 7; k++) {
        const ang = (k / 7) * Math.PI * 2;
        const rad = it.r * (k % 2 === 0 ? 1 : 0.72);
        ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    if (Math.hypot(player.x - it.x, player.y - it.y) < it.r + 20) {
      if (it.type === 'debris') {
        score += 100;
        streak++;
        createExplosion(it.x, it.y, '#facc15', 12);
        if (streak >= 5) {
          fuel = Math.min(100, fuel + 35);
          streak = 0;
          speedMultiplier = Math.min(2.6, speedMultiplier + 0.18);
          createExplosion(player.x, player.y, '#38bdf8', 24);
        }
        items.splice(i, 1);
        updateHUD();
        continue;
      } else {
        updateHUD();
        return triggerGameOver('Direct Impact with High-Speed Asteroid!');
      }
    }

    if (it.y > canvas.height + 30) {
      if (it.type === 'debris') {
        streak = 0;
        fuel -= 8;
        createExplosion(it.x, canvas.height - 10, '#f97316', 10);
        if (fuel <= 0) {
          updateHUD();
          return triggerGameOver('Missed Debris Caused Fuel Depletion!');
        }
      }
      items.splice(i, 1);
      updateHUD();
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life / 35);
    ctx.fillRect(p.x, p.y, 3, 3);
    ctx.globalAlpha = 1;
    if (p.life <= 0) particles.splice(i, 1);
  }

  drawPSLV(player.x, player.y);
  updateHUD();
  requestAnimationFrame(loop);
}
