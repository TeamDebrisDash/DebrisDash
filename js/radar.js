const radarCanvas = document.getElementById('radar-canvas');
const rCtx = radarCanvas.getContext('2d');
let sweepAngle = 0;

function resizeRadar() {
  radarCanvas.width = radarCanvas.clientWidth || 480;
  radarCanvas.height = radarCanvas.clientHeight || 530;
}

radarCanvas.addEventListener('click', e => {
  const rect = radarCanvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const cx = radarCanvas.width / 2;
  const cy = radarCanvas.height / 2;
  const maxR = Math.min(cx, cy) - 24;

  for (const obj of ISRO_DATA.leoObjects) {
    const ox = cx + Math.cos(obj.angle) * (obj.dist * maxR);
    const oy = cy + Math.sin(obj.angle) * (obj.dist * maxR);
    if (Math.hypot(mx - ox, my - oy) < 16) {
      document.getElementById('object-info').innerHTML = `
        <strong>${obj.name}</strong>
        <div>Altitude: <b>${obj.alt}</b> • Velocity: <b>${obj.vel}</b></div>
        <div style="margin-top:4px; color:#cbd5e1;">${obj.note}</div>
      `;
      break;
    }
  }
});

function radarLoop() {
  if (radarCanvas.width === 0) resizeRadar();
  const w = radarCanvas.width;
  const h = radarCanvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(cx, cy) - 24;

  rCtx.clearRect(0, 0, w, h);

  // Orbit rings
  rCtx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
  rCtx.lineWidth = 1;
  [0.35, 0.55, 0.75, 0.95].forEach(f => {
    rCtx.beginPath();
    rCtx.arc(cx, cy, maxR * f, 0, Math.PI * 2);
    rCtx.stroke();
  });

  // Earth center
  rCtx.fillStyle = '#1d4ed8';
  rCtx.beginPath();
  rCtx.arc(cx, cy, 22, 0, Math.PI * 2);
  rCtx.fill();
  rCtx.fillStyle = '#e2e8f0';
  rCtx.font = 'bold 10px sans-serif';
  rCtx.textAlign = 'center';
  rCtx.fillText('EARTH', cx, cy + 3);

  // Sweep line
  sweepAngle += 0.025;
  rCtx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
  rCtx.lineWidth = 2;
  rCtx.beginPath();
  rCtx.moveTo(cx, cy);
  rCtx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
  rCtx.stroke();

  // Plot LEO objects
  ISRO_DATA.leoObjects.forEach(obj => {
    obj.angle += obj.speed;
    const ox = cx + Math.cos(obj.angle) * (obj.dist * maxR);
    const oy = cy + Math.sin(obj.angle) * (obj.dist * maxR);
    const colors = { green: '#22c55e', yellow: '#facc15', red: '#ef4444' };

    rCtx.fillStyle = colors[obj.type];
    rCtx.beginPath();
    rCtx.arc(ox, oy, 6, 0, Math.PI * 2);
    rCtx.fill();
    rCtx.fillStyle = '#cbd5e1';
    rCtx.font = '11px sans-serif';
    rCtx.fillText(obj.name.split(' ')[0], ox, oy - 10);
  });

  requestAnimationFrame(radarLoop);
}

resizeRadar();
radarLoop();
