const NOVA_USE_CATEGORY_MAP = {
  work: ["laptops", "keyboard", "mouse", "monitors"],
  photo: ["cameras", "powerbanks", "cases"],
  study: ["laptops", "headphones", "earbuds"],
  gaming: ["laptops", "mouse", "keyboard", "monitors"]
};

const NOVA_ACCESSORY_MAP = {
  laptops: ["mouse", "keyboard", "ram"],
  monitors: ["mouse", "keyboard"],
  ram: ["laptops"],
  headphones: ["earbuds"],
  mouse: ["keyboard"],
  keyboard: ["mouse"],
  smartphones: ["cases", "chargers", "earbuds", "powerbanks"],
  earbuds: ["chargers", "powerbanks"],
  powerbanks: ["chargers"],
  chargers: ["powerbanks", "cases"],
  cases: ["chargers", "powerbanks"],
  cameras: ["powerbanks", "cases"]
};

function novaFlattenProducts() {
  const all = [];
  if (typeof PRODUCTS_DATA === 'undefined') return all;
  Object.keys(PRODUCTS_DATA).forEach(function(catKey) {
    const cat = PRODUCTS_DATA[catKey];
    cat.items.forEach(function(item) {
      all.push({
        name: item.name,
        brand: item.brand.split(' — ')[0],
        price: item.price,
        icon: item.icon,
        rating: parseFloat(item.rating),
        catKey: catKey,
        catTitle: cat.title
      });
    });
  });
  return all;
}

const NOVA_ALL_PRODUCTS = novaFlattenProducts();

function novaFindBestInCategories(catKeys) {
  const candidates = NOVA_ALL_PRODUCTS.filter(function(p) {
    return catKeys.indexOf(p.catKey) !== -1;
  });
  candidates.sort(function(a, b) { return b.rating - a.rating; });
  return candidates[0] || null;
}

function novaFindAccessory(catKey) {
  const accessoryCats = NOVA_ACCESSORY_MAP[catKey] || [];
  for (let i = 0; i < accessoryCats.length; i++) {
    const best = novaFindBestInCategories([accessoryCats[i]]);
    if (best) return best;
  }
  return null;
}

function novaFindProductByName(query) {
  const q = query.toLowerCase();
  return NOVA_ALL_PRODUCTS.find(function(p) {
    return p.name.toLowerCase().indexOf(q) !== -1;
  }) || null;
}

document.addEventListener('DOMContentLoaded', function() {
  const bubble = document.getElementById('novaBubble');
  const panel = document.getElementById('novaPanel');
  const closeBtn = document.getElementById('novaClose');
  const messages = document.getElementById('novaMessages');
  const optionsZone = document.getElementById('novaOptionsZone');
  const dot = document.getElementById('novaDot');

  if (!bubble || !panel) return;

  function openPanel() {
    panel.classList.add('open');
    if (dot) dot.style.display = 'none';
  }

  function closePanel() {
    panel.classList.remove('open');
  }

  bubble.addEventListener('click', function() {
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
      if (!messages.dataset.started) {
        messages.dataset.started = 'true';
        startFlow();
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  function addMsg(html, who) {
    const div = document.createElement('div');
    div.className = 'nova-msg ' + who;
    div.innerHTML = html;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping(callback) {
    const t = document.createElement('div');
    t.className = 'nova-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
    setTimeout(function() {
      t.remove();
      callback();
    }, 700);
  }

  function setOptions(opts) {
    optionsZone.innerHTML = '';
    opts.forEach(function(opt, i) {
      const btn = document.createElement('button');
      btn.className = 'nova-opt-btn';
      btn.style.animationDelay = (i * 0.06) + 's';
      btn.innerHTML = opt.label;
      btn.addEventListener('click', function() {
        addMsg(opt.label, 'user');
        optionsZone.innerHTML = '';
        showTyping(opt.action);
      });
      optionsZone.appendChild(btn);
    });
  }

  function prodCard(p) {
    if (!p) return '';
    return '<div class="nova-prod-card" data-cat-key="' + p.catKey + '">' +
      '<div class="nova-prod-thumb"><i class="' + p.icon + '" aria-hidden="true"></i></div>' +
      '<div><div class="nova-prod-name">' + p.name + '</div><div class="nova-prod-price">' + p.price + '</div></div>' +
    '</div>';
  }

  messages.addEventListener('click', function(e) {
    const card = e.target.closest('.nova-prod-card');
    if (!card) return;
    const catKey = card.dataset.catKey;
    if (catKey) window.location.href = 'products.html?cat=' + catKey;
  });

  function startFlow() {
    messages.innerHTML = '';
    addMsg("Hey! I'm NOVA, your shopping assistant. What are you looking for today?", 'bot');
    setOptions([
      { label: "Help me find a product", action: askUsage },
      { label: "Compare two products", action: showCompare },
      { label: "My device has a problem", action: showDiagnostic }
    ]);
  }

  function askUsage() {
    addMsg("Great! What will you mainly use it for?", 'bot');
    setOptions([
      { label: "Work / Productivity", action: function() { showResult('work'); } },
      { label: "Photo / Video", action: function() { showResult('photo'); } },
      { label: "Study", action: function() { showResult('study'); } },
      { label: "Gaming", action: function() { showResult('gaming'); } }
    ]);
  }

  function showResult(use) {
    const catKeys = NOVA_USE_CATEGORY_MAP[use] || [];
    const best = novaFindBestInCategories(catKeys);

    if (!best) {
      addMsg("I couldn't find a match right now, sorry about that.", 'bot');
      setOptions([{ label: "Start over", action: startFlow }]);
      return;
    }

    addMsg("Based on that, here's my top pick:" + prodCard(best), 'bot');

    showTyping(function() {
      const acc = novaFindAccessory(best.catKey);
      if (acc) {
        addMsg("People who buy this usually also grab:" + prodCard(acc), 'bot');
      }
      setOptions([
        { label: "View " + best.name, action: function() { window.location.href = 'products.html?cat=' + best.catKey; } },
        { label: "Start over", action: startFlow }
      ]);
    });
  }

  function showCompare() {
    addMsg("Sure! Type two product names separated by 'vs' anywhere in the chat... actually, let's keep it simple. Pick one of these popular comparisons:", 'bot');
    const opt1a = novaFindProductByName("MacBook");
    const opt1b = novaFindProductByName("ThinkPad");
    const opt2a = novaFindProductByName("iPhone");
    const opt2b = novaFindProductByName("Galaxy S25");

    const opts = [];
    if (opt1a && opt1b) {
      opts.push({ label: opt1a.name + " vs " + opt1b.name, action: function() { runCompare(opt1a, opt1b); } });
    }
    if (opt2a && opt2b) {
      opts.push({ label: opt2a.name + " vs " + opt2b.name, action: function() { runCompare(opt2a, opt2b); } });
    }
    opts.push({ label: "Start over", action: startFlow });
    setOptions(opts);
  }

  function runCompare(a, b) {
    const html =
      '<strong>' + a.name + '</strong> (' + a.price + ') — rating ' + a.rating + '/5, ' + a.catTitle + '<br>' +
      '<strong>' + b.name + '</strong> (' + b.price + ') — rating ' + b.rating + '/5, ' + b.catTitle + '<br><br>' +
      (a.rating >= b.rating
        ? a.name + ' has the higher rating, but the right pick depends on your budget and preferred brand ecosystem.'
        : b.name + ' has the higher rating, but the right pick depends on your budget and preferred brand ecosystem.');
    addMsg(html, 'bot');
    setOptions([{ label: "Start over", action: startFlow }]);
  }

  function showDiagnostic() {
    addMsg("Sorry to hear that! What's the issue?", 'bot');
    setOptions([
      { label: "Battery drains fast", action: function() {
        addMsg("Common causes: background apps, old battery health, or screen brightness. A portable power bank can help in the meantime.", 'bot');
        const pb = novaFindBestInCategories(['powerbanks']);
        setOptions([
          { label: "Show me a power bank", action: function() { if (pb) addMsg(prodCard(pb), 'bot'); setOptions([{ label: "Start over", action: startFlow }]); } },
          { label: "Start over", action: startFlow }
        ]);
      }},
      { label: "Screen cracked / damaged", action: function() {
        addMsg("That sounds frustrating. A protective case helps prevent future damage. For the screen itself, a certified repair center is best.", 'bot');
        const cs = novaFindBestInCategories(['cases']);
        setOptions([
          { label: "Show me protective cases", action: function() { if (cs) addMsg(prodCard(cs), 'bot'); setOptions([{ label: "Start over", action: startFlow }]); } },
          { label: "Start over", action: startFlow }
        ]);
      }},
      { label: "Slow performance", action: function() {
        addMsg("Try restarting the device and clearing storage first. If it's still slow after that, it might be time for an upgrade.", 'bot');
        setOptions([
          { label: "Show me faster options", action: askUsage },
          { label: "Start over", action: startFlow }
        ]);
      }}
    ]);
  }

  const hasAutoOpened = sessionStorage.getItem('cn_nova_opened');
  if (!hasAutoOpened) {
    setTimeout(function() {
      openPanel();
      messages.dataset.started = 'true';
      startFlow();
      sessionStorage.setItem('cn_nova_opened', 'true');
    }, 4000);
  }
});