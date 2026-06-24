function playCardTransition(clickEvent, destinationUrl) {
  clickEvent.preventDefault();

  const cardEl = clickEvent.currentTarget;

  cardEl.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(0.9)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(1)' }
  ], { duration: 280, easing: 'ease-out' });

  const rect = cardEl.getBoundingClientRect();
  const cxPx = rect.left + rect.width / 2;
  const cyPx = rect.top + rect.height / 2;
  const cx = (cxPx / window.innerWidth * 100).toFixed(1);
  const cy = (cyPx / window.innerHeight * 100).toFixed(1);

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
  document.body.appendChild(overlay);

  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    const angle = (i / 8) * Math.PI * 2;
    const size = 2 + Math.random() * 3;
    spark.style.cssText =
      'position:fixed;left:' + cxPx + 'px;top:' + cyPx + 'px;' +
      'width:' + size + 'px;height:' + size + 'px;border-radius:50%;' +
      'background:#fff;box-shadow:0 0 6px #e945f5;pointer-events:none;';
    overlay.appendChild(spark);
    spark.animate([
      { transform: 'translate(-50%,-50%)', opacity: 1 },
      { transform: 'translate(' + (Math.cos(angle) * 36 - size / 2) + 'px,' + (Math.sin(angle) * 36 - size / 2) + 'px)', opacity: 0 }
    ], { duration: 350, delay: 80, easing: 'ease-out' });
  }

  const iris = document.createElement('div');
  iris.style.cssText =
    'position:fixed;inset:0;background:#05051a;pointer-events:none;z-index:9998;' +
    'clip-path:circle(0px at ' + cx + '% ' + cy + '%);';
  document.body.appendChild(iris);

  setTimeout(function() {
    iris.animate([
      { clipPath: 'circle(0px at ' + cx + '% ' + cy + '%)' },
      { clipPath: 'circle(8% at ' + cx + '% ' + cy + '%)', offset: 0.15 },
      { clipPath: 'circle(150% at ' + cx + '% ' + cy + '%)' }
    ], { duration: 650, easing: 'cubic-bezier(0.65,0,0.35,1)', fill: 'forwards' });
  }, 100);

  setTimeout(function() {
    sessionStorage.setItem('cn_transition_origin', JSON.stringify({ cx: cx, cy: cy }));
    window.location.href = destinationUrl;
  }, 720);
}

function playPageEnterTransition() {
  const originData = sessionStorage.getItem('cn_transition_origin');
  sessionStorage.removeItem('cn_transition_origin');

  let cx = '50';
  let cy = '50';
  if (originData) {
    const origin = JSON.parse(originData);
    cx = origin.cx;
    cy = origin.cy;
  }

  const iris = document.createElement('div');
  iris.style.cssText =
    'position:fixed;inset:0;background:#05051a;pointer-events:none;z-index:9998;' +
    'clip-path:circle(150% at ' + cx + '% ' + cy + '%);';
  document.body.appendChild(iris);

  document.body.style.opacity = '0';
  document.body.style.transform = 'scale(1.04)';

  requestAnimationFrame(function() {
    document.body.style.transition = 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.2,0.8,0.2,1)';
    document.body.style.opacity = '1';
    document.body.style.transform = 'scale(1)';

    iris.animate([
      { clipPath: 'circle(150% at ' + cx + '% ' + cy + '%)' },
      { clipPath: 'circle(0px at ' + cx + '% ' + cy + '%)' }
    ], { duration: 600, easing: 'cubic-bezier(0.65,0,0.35,1)', fill: 'forwards' });
  });

  setTimeout(function() { iris.remove(); }, 700);
}

document.addEventListener('DOMContentLoaded', function() {
  playPageEnterTransition();

  document.querySelectorAll('.cat-card, .card').forEach(function(el) {
    const href = el.getAttribute('href');
    if (!href) return;
    el.addEventListener('click', function(e) {
      playCardTransition(e, href);
    });
  });
});