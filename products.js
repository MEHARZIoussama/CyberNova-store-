const params = new URLSearchParams(window.location.search);
const catKey = params.get('cat') || 'laptops';
const catData = PRODUCTS_DATA[catKey] || PRODUCTS_DATA.laptops;

const catTitleEl = document.getElementById('catTitle');
const miniRow = document.getElementById('miniRow');
const card = document.getElementById('card');
const img = document.getElementById('img');
const glow = document.getElementById('glow');
const discount = document.getElementById('discount');
const oldprice = document.getElementById('oldprice');
const addBtn = document.getElementById('addBtn');
const pstars = document.getElementById('pstars');
const othersLabel = document.getElementById('othersLabel');

let currentItemIndex = 0;

catTitleEl.textContent = catData.title;
othersLabel.textContent = "Other " + catData.title.toLowerCase();

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  let html = '★'.repeat(full);
  if (half) html += '☆';
  const empty = 5 - full - (half ? 1 : 0);
  html += '✩'.repeat(empty);
  return html;
}

function updateDiscount(oldP, newP) {
  if (oldP) {
    const oldNum = parseFloat(oldP.replace(/[^0-9.]/g, ''));
    const newNum = parseFloat(newP.replace(/[^0-9.]/g, ''));
    const percent = Math.round((1 - newNum / oldNum) * 100);
    oldprice.textContent = oldP;
    oldprice.style.visibility = 'visible';
    discount.textContent = '-' + percent + '%';
    discount.classList.add('show');
  } else {
    oldprice.style.visibility = 'hidden';
    discount.classList.remove('show');
  }
}

function showProduct(item) {
  document.getElementById('pname').textContent = item.name;
  document.getElementById('pbrand').textContent = item.brand;
  document.getElementById('pprice').textContent = item.price;
  pstars.innerHTML = renderStars(parseFloat(item.rating)) + ' <span id="previews">(' + item.rev + ' reviews)</span>';
  img.querySelector('i').className = item.icon;
  updateDiscount(item.old, item.price);
}

function buildMiniCards() {
  while (miniRow.firstChild) {
    miniRow.removeChild(miniRow.firstChild);
  }

  catData.items.forEach(function(item, index) {
    const mini = document.createElement('div');
    mini.className = 'mini' + (index === 0 ? ' active' : '');
    mini.innerHTML =
      '<span class="mini-stars">' + renderStars(parseFloat(item.rating)) + '</span>' +
      '<i class="' + item.icon + '"></i>' +
      '<span class="mini-price">' + item.price + '</span>';

    mini.addEventListener('click', function() {
      if (mini.classList.contains('active')) return;
      const allMinis = miniRow.querySelectorAll('.mini');
      allMinis.forEach(function(x) { x.classList.remove('active'); });
      mini.classList.add('active');

      card.classList.add('swapping');
      glow.style.opacity = '0.3';

      setTimeout(function() {
        currentItemIndex = index;
        showProduct(item);
        card.classList.remove('swapping');
        glow.style.opacity = '1';
      }, 350);
    });

    miniRow.appendChild(mini);
  });
}

buildMiniCards();
currentItemIndex = 0;
showProduct(catData.items[0]);

const pageSkeleton = document.getElementById('pageSkeleton');
if (pageSkeleton) {
  pageSkeleton.classList.add('hidden');
  setTimeout(function() { pageSkeleton.remove(); }, 400);
}

img.addEventListener('mousemove', function(e) {
  const rect = img.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  img.style.transform = 'rotateY(' + (x * 20) + 'deg) rotateX(' + (-y * 20) + 'deg) scale(1.05)';
});

img.addEventListener('mouseleave', function() {
  img.style.transform = 'rotateY(0) rotateX(0) scale(1)';
});

addBtn.addEventListener('click', function() {
  if (addBtn.disabled) return;

  addBtn.disabled = true;
  addBtn.classList.add('loading');
  addBtn.innerHTML = '<span class="btn-dots"><span></span><span></span><span></span></span>';

  setTimeout(function() {
    addBtn.classList.remove('loading');
    addBtn.classList.add('added');
    addBtn.innerHTML = '<i class="fas fa-check"></i> Added';

    const rect = addBtn.getBoundingClientRect();
    const fly = document.createElement('div');
    fly.className = 'cart-fly';
    fly.style.left = (rect.left + rect.width / 2) + 'px';
    fly.style.top = rect.top + 'px';
    document.body.appendChild(fly);
    fly.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: 'translate(120px,-300px) scale(0.3)', opacity: 0 }
    ], { duration: 600, easing: 'ease-out' });
    setTimeout(function() { fly.remove(); }, 600);

    addToCart({
      id: catKey + '-' + currentItemIndex,
      name: document.getElementById('pname').textContent,
      brand: document.getElementById('pbrand').textContent,
      price: document.getElementById('pprice').textContent,
      icon: img.querySelector('i').className
    });

    setTimeout(function() {
      addBtn.classList.remove('added');
      addBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to cart';
      addBtn.disabled = false;
    }, 1800);
  }, 500);
});