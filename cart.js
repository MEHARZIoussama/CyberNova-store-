const FREE_SHIP_THRESHOLD = 1500;

function getCart() {
  const data = localStorage.getItem('cn_cart');
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem('cn_cart', JSON.stringify(cart));
}

function fmt(n) {
  return n.toLocaleString() + '$';
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(function(i) { return i.id === item.id; });

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
      icon: item.icon,
      qty: 1
    });
  }

  saveCart(cart);
  renderCartPanel();
  pulseCartCount();
}

function pulseCartCount() {
  const countEl = document.querySelector('.cart-count');
  if (!countEl) return;
  countEl.classList.remove('pulse');
  requestAnimationFrame(function() {
    countEl.classList.add('pulse');
  });
}

function renderCartPanel() {
  const cart = getCart();
  const wrap = document.getElementById('cartItemsList');
  const countEl = document.querySelector('.cart-count');
  if (!wrap || !countEl) return;

  const totalQty = cart.reduce(function(s, i) { return s + i.qty; }, 0);
  countEl.textContent = totalQty;

  if (cart.length === 0) {
    wrap.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-cart"></i>سلتك فارغة</div>';
  } else {
    wrap.innerHTML = cart.map(function(item) {
      return '<div class="cart-row-item" data-id="' + item.id + '">' +
        '<div class="cart-thumb"><i class="' + item.icon + '"></i></div>' +
        '<div class="cart-row-info">' +
          '<div class="cart-row-name">' + item.name + '</div>' +
          '<div class="cart-row-brand">' + item.brand + '</div>' +
        '</div>' +
        '<div class="cart-qty-group">' +
          '<button class="cart-qty-btn" data-action="dec"><i class="fas fa-minus"></i></button>' +
          '<span>' + item.qty + '</span>' +
          '<button class="cart-qty-btn" data-action="inc"><i class="fas fa-plus"></i></button>' +
        '</div>' +
        '<div class="cart-row-price">' + fmt(item.price * item.qty) + '</div>' +
        '<i class="fas fa-trash cart-remove-btn" data-action="remove"></i>' +
      '</div>';
    }).join('');
  }

  const subtotal = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  document.getElementById('cartTotal').textContent = fmt(subtotal);

  const remaining = FREE_SHIP_THRESHOLD - subtotal;
  const percent = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));
  document.getElementById('shipFill').style.width = percent + '%';
  document.getElementById('shipPercent').textContent = percent + '%';
  document.getElementById('shipLabel').textContent =
    remaining > 0 ? ('أضف ' + remaining + '$ لشحن مجاني') : 'تهانينا! شحن مجاني مفعّل';
}

document.addEventListener('DOMContentLoaded', function() {
  const cartBtn = document.querySelector('.cart-btn');
  const panel = document.getElementById('cartPanel');
  const closeBtn = document.getElementById('cartClose');
  const catcher = document.getElementById('cartCatcher');
  const itemsList = document.getElementById('cartItemsList');

  renderCartPanel();

  function openPanel() {
    panel.classList.add('open');
    catcher.classList.add('active');
  }

  function closePanel() {
    panel.classList.remove('open');
    catcher.classList.remove('active');
  }

  cartBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  closeBtn.addEventListener('click', closePanel);
  catcher.addEventListener('click', closePanel);

  itemsList.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const row = btn.closest('.cart-row-item');
    const id = row.dataset.id;
    const cart = getCart();
    const item = cart.find(function(i) { return i.id === id; });
    const action = btn.dataset.action;

    if (action === 'inc') {
      item.qty++;
      saveCart(cart);
      renderCartPanel();
    } else if (action === 'dec' || action === 'remove') {
      row.style.opacity = '0';
      row.style.transform = 'translateX(16px)';
      row.style.maxHeight = '0';
      setTimeout(function() {
        let updatedCart = getCart();
        if (action === 'remove' || item.qty <= 1) {
          updatedCart = updatedCart.filter(function(i) { return i.id !== id; });
        } else {
          const target = updatedCart.find(function(i) { return i.id === id; });
          target.qty--;
        }
        saveCart(updatedCart);
        renderCartPanel();
      }, 250);
    }
  });

  document.getElementById('checkoutBtn').addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-check"></i> جاري التحويل...';
  });

  document.getElementById('viewCartBtn').addEventListener('click', closePanel);
});