function buildSearchIndex() {
  const index = [];
  Object.keys(PRODUCTS_DATA).forEach(function(catKey) {
    const cat = PRODUCTS_DATA[catKey];
    cat.items.forEach(function(item) {
      index.push({
        name: item.name,
        brand: item.brand.split(' — ')[0],
        price: item.price,
        icon: item.icon,
        cat: cat.title,
        catKey: catKey
      });
    });
  });
  return index;
}

const SEARCH_INDEX = (typeof PRODUCTS_DATA !== 'undefined') ? buildSearchIndex() : [];
const TRENDING_TERMS = ["iPhone", "MacBook", "AirPods", "GoPro", "RAM"];

document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('searchOverlay');
  const panel = document.getElementById('searchPanel');
  const input = document.getElementById('searchInput');
  const trendingZone = document.getElementById('trendingZone');
  const resultsZone = document.getElementById('resultsZone');
  const emptyZone = document.getElementById('emptyZone');
  const searchMeta = document.getElementById('searchMeta');
  const trendingChips = document.getElementById('trendingChips');
  const searchIcon = document.getElementById('searchIcon');
  const openBtn = document.querySelector('.search-trigger-btn');
  const closeBtn = document.getElementById('closeSearchBtn');

  if (!overlay || !input) return;

  trendingChips.innerHTML = TRENDING_TERMS.map(function(t) {
    return '<span class="s-chip" data-term="' + t + '">' + t + '</span>';
  }).join('');

  function openSearch() {
    overlay.classList.add('open');
    setTimeout(function() { input.focus(); }, 150);
  }

  function closeSearch() {
    overlay.classList.remove('open');
    input.value = '';
    renderResults('');
  }

  if (openBtn) openBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSearch();
  });

  function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
  }

  let kbdIndex = -1;

  function renderResults(query) {
    kbdIndex = -1;

    if (!query.trim()) {
      trendingZone.style.display = 'block';
      resultsZone.style.display = 'none';
      emptyZone.style.display = 'none';
      searchMeta.textContent = '';
      return;
    }

    const t0 = performance.now();
    const matches = SEARCH_INDEX.filter(function(p) {
      return p.name.toLowerCase().includes(query.toLowerCase()) ||
             p.brand.toLowerCase().includes(query.toLowerCase()) ||
             p.cat.toLowerCase().includes(query.toLowerCase());
    });
    const elapsed = (performance.now() - t0).toFixed(2);

    trendingZone.style.display = 'none';
    searchMeta.textContent = matches.length + ' results · ' + elapsed + 'ms';

    searchIcon.style.animation = 'none';
    requestAnimationFrame(function() {
      searchIcon.style.animation = 'pulseIcon 0.4s ease';
    });

    if (matches.length === 0) {
      resultsZone.style.display = 'none';
      emptyZone.style.display = 'block';
      return;
    }

    emptyZone.style.display = 'none';
    resultsZone.style.display = 'block';

    const top = matches[0];
    const rest = matches.slice(1);
    const grouped = {};
    rest.forEach(function(p) {
      if (!grouped[p.cat]) grouped[p.cat] = [];
      grouped[p.cat].push(p);
    });

    let html =
      '<div class="s-row top-match" data-cat-key="' + top.catKey + '" style="animation-delay:0s;">' +
        '<div class="s-thumb"><i class="' + top.icon + '" aria-hidden="true"></i></div>' +
        '<div>' +
          '<span class="s-top-badge">BEST MATCH</span>' +
          '<div class="s-name">' + highlightMatch(top.name, query) + '</div>' +
          '<div class="s-brand">' + top.brand + '</div>' +
        '</div>' +
        '<div class="s-price">' + top.price + '</div>' +
      '</div>';

    let delayIndex = 1;
    Object.keys(grouped).forEach(function(cat) {
      html += '<div class="s-cat-group"><div class="s-cat-label">' + cat.toUpperCase() + '</div>';
      grouped[cat].forEach(function(p) {
        html +=
          '<div class="s-row" data-cat-key="' + p.catKey + '" style="animation-delay:' + (delayIndex * 0.04) + 's;">' +
            '<div class="s-thumb"><i class="' + p.icon + '" aria-hidden="true"></i></div>' +
            '<div>' +
              '<div class="s-name">' + highlightMatch(p.name, query) + '</div>' +
              '<div class="s-brand">' + p.brand + '</div>' +
            '</div>' +
            '<div class="s-price">' + p.price + '</div>' +
          '</div>';
        delayIndex++;
      });
      html += '</div>';
    });

    resultsZone.innerHTML = html;
  }

  input.addEventListener('input', function() {
    renderResults(this.value);
  });

  trendingChips.addEventListener('click', function(e) {
    const chip = e.target.closest('.s-chip');
    if (!chip) return;
    input.value = chip.dataset.term;
    renderResults(chip.dataset.term);
  });

  input.addEventListener('keydown', function(e) {
    const rows = resultsZone.querySelectorAll('.s-row');
    if (rows.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      kbdIndex = Math.min(kbdIndex + 1, rows.length - 1);
      rows.forEach(function(r) { r.classList.remove('kbd-active'); });
      rows[kbdIndex].classList.add('kbd-active');
      rows[kbdIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      kbdIndex = Math.max(kbdIndex - 1, 0);
      rows.forEach(function(r) { r.classList.remove('kbd-active'); });
      rows[kbdIndex].classList.add('kbd-active');
      rows[kbdIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      const targetIndex = kbdIndex >= 0 ? kbdIndex : 0;
      rows[targetIndex].click();
    }
  });

  resultsZone.addEventListener('click', function(e) {
    const row = e.target.closest('.s-row');
    if (!row) return;
    row.classList.add('selecting');
    const catKey = row.dataset.catKey;
    setTimeout(function() {
      window.location.href = 'products.html?cat=' + catKey;
    }, 180);
  });

  renderResults('');
});