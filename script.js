document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');
  const dealsGrid = document.getElementById('dealsGrid');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const cartIcon = document.getElementById('cartIcon');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartList = document.getElementById('cartList');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckout = document.getElementById('closeCheckout');
  const checkoutForm = document.getElementById('checkoutForm');
  const orderSuccessModal = document.getElementById('orderSuccessModal');
  const closeOrderSuccess = document.getElementById('closeOrderSuccess');
  const orderSuccessMessage = document.getElementById('orderSuccessMessage');
  const orderSuccessRedirectText = document.getElementById('orderSuccessRedirectText');
  const orderSuccessDone = document.getElementById('orderSuccessDone');
  const checkoutItems = document.getElementById('checkoutItems');
  const checkoutItemCount = document.getElementById('checkoutItemCount');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
  const checkoutState = document.getElementById('checkoutState');
  const checkoutCity = document.getElementById('checkoutCity');
  const checkoutArea = document.getElementById('checkoutArea');
  const checkoutMenuToggle = document.getElementById('checkoutMenuToggle');
  const checkoutBackButton = document.getElementById('checkoutBackButton');
  const checkoutCartIcon = document.getElementById('checkoutCartIcon');
  const checkoutListIcon = document.getElementById('checkoutListIcon');
  const checkoutCartCount = document.getElementById('checkoutCartCount');
  const checkoutListCount = document.getElementById('checkoutListCount');
  const checkoutSearchInput = document.getElementById('checkoutSearchInput');
  const checkoutSearchBtn = document.getElementById('checkoutSearchBtn');
  const listIcon = document.getElementById('listIcon');
  const mobileListButton = document.getElementById('mobileListButton');
  const listModal = document.getElementById('listModal');
  const closeList = document.getElementById('closeList');
  const listItems = document.getElementById('listItems');
  const listCount = document.getElementById('listCount');
  const mobileListCount = document.getElementById('mobileListCount');
  const emptyListMessage = document.getElementById('emptyListMessage');
  const productModal = document.getElementById('productModal');
  const closeProduct = document.getElementById('closeProduct');
  const productDetails = document.getElementById('productDetails');
  const yearEl = document.getElementById('year');
  const welcomeEl = document.querySelector('.bounceText');
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const menuOverlay = document.getElementById('menuOverlay');
  const categoryMenu = document.getElementById('categoryMenu');

  function closeAllAccountDropdowns(exceptDropdown = null) {
    document.querySelectorAll('.account-dropdown.active').forEach(dropdown => {
      if (dropdown !== exceptDropdown) {
        dropdown.classList.remove('active');
      }
    });
  }

  // Account dropdown functionality for home, product details, and checkout headers
  document.addEventListener('click', (e) => {
    const accountToggle = e.target.closest('.account-toggle');

    if (accountToggle) {
      const accountDropdown = accountToggle.closest('.account-dropdown');
      const shouldOpen = !accountDropdown?.classList.contains('active');
      closeAllAccountDropdowns(accountDropdown);
      accountDropdown?.classList.toggle('active', shouldOpen);
      return;
    }

    if (!e.target.closest('.account-dropdown')) {
      closeAllAccountDropdowns();
    }
  });

  function openCategoryMenu() {
    categoryMenu?.classList.add('active');
    menuOverlay?.classList.add('active');
    menuToggle?.classList.add('active');
  }

  function closeCategoryMenuPanel() {
    categoryMenu?.classList.remove('active');
    menuOverlay?.classList.remove('active');
    menuToggle?.classList.remove('active');
  }

  function toggleProductDetailMenu() {
    const detailMenu = productDetails.querySelector('.detail-top-category-bar');
    const detailToggle = productDetails.querySelector('#modalMenuToggle');
    if (!detailMenu || !detailToggle) return;

    const isOpen = detailMenu.classList.toggle('is-open');
    detailToggle.classList.toggle('active', isOpen);
    detailToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function handleModalMenuToggle() {
    const detailMenu = productDetails.querySelector('.detail-top-category-bar');
    const detailToggle = productDetails.querySelector('#modalMenuToggle');

    if (window.matchMedia('(max-width: 768px)').matches) {
      detailMenu?.classList.remove('is-open');
      detailToggle?.classList.remove('active');
      detailToggle?.setAttribute('aria-expanded', 'false');
      openCategoryMenu();
      return;
    }

    toggleProductDetailMenu();
  }

  function handleModalBack() {
    const detailMenu = productDetails.querySelector('.detail-top-category-bar');
    const detailToggle = productDetails.querySelector('#modalMenuToggle');
    detailMenu?.classList.remove('is-open');
    detailToggle?.classList.remove('active');
    detailToggle?.setAttribute('aria-expanded', 'false');
    productModal.setAttribute('aria-hidden', 'true');
  }

  menuToggle?.addEventListener('click', openCategoryMenu);
  menuClose?.addEventListener('click', closeCategoryMenuPanel);
  menuOverlay?.addEventListener('click', closeCategoryMenuPanel);

  // Apply bouncing animation to welcome text for first 2 seconds
  if (welcomeEl) {
    welcomeEl.classList.add('bounce');
    setTimeout(() => {
      welcomeEl.classList.remove('bounce');
    }, 2000);
  }

  let currentFilter = 'all';
  let currentSearch = '';
  let currentMenuSelection = sessionStorage.getItem('jayx_active_menu') || 'all';
  const categoryMenuItems = [
    { label: 'Home', isHome: true, icon: '&#127968;' },
    { label: 'All', filter: 'all', icon: '&#128717;&#65039;' },
    { label: 'Phones', filter: 'phones', icon: '&#128241;' },
    { label: 'Computers', filter: 'computers', icon: '&#128187;' },
    { label: 'Accessories', filter: 'accessories', icon: '&#127911;' },
    { label: 'Gadgets', filter: 'gadgets', icon: '&#8986;' }
  ];
  const lagosLocations = {
    'Agege': ['Isale-Agege', 'Oke-Afa', 'Orile-Agege', 'Agbowo', 'Dopemu', 'Iju Road', 'Old Abeokuta Road'],
    'Ajeromi-Ifelodun': ['Ajeromi', 'Ifelodun', 'Okun-Ajah'],
    'Alimosho': ['Iyana-Ipaja', 'Egbeda', 'Ilupeju', 'Akowonjo', 'Ogombo'],
    'Amuwo-Odofin': ['Festac Town', 'Amuwo', 'Lagos Airport', 'Iba'],
    'Abule-Egba': ['Agbado ijaye Road', 'Ajasa Command Rd', 'Ajegunle', 'Alagbado', 'Alakuko', 'Ekoro', 'Meiran Road', 'New Oko Oba', 'Old Otta Road'],
    'Agbara': [],
    'Ajah': ['Abraham Adesanya', 'Amuwo', 'Lagos Airport', 'Iba', 'Ajah Town', 'Sangotedo', 'Lekki-Ajah Expressway'],
    'Ajao Estate': ['Amuwo', 'Lagos Airport', 'Iba'],
    'Apapa': ['Apapa Wharf', 'Shogunle', 'Tin-Can Island', 'Tincan'],
    'Badagry': ['Badagry Town', 'Ajido', 'Iberekodo', 'Olorunda'],
    'Epe': ['Epe Town', 'Ige', 'Ilaje'],
    'Eti-Osa': ['Ikoyi', 'Victoria Island', 'Lekki Phase 1', 'Lekki Phase 2'],
    'Ejigbo': ['Iseri Osun', 'Jakande Wood Market', 'NNPC Road', 'Oke-Afa', 'Pipeline', 'Powerline'],
    'Fagba': ['Iju Road'],
    'Festac': ['1st Avenue', '2nd Avenue', '3rd Avenue', '5th Avenue', '7th Avenue'],
    'Ibeju-Lekki': ['Ibeju Town', 'Eleko', 'Awoyaya', 'Lekki Free Trade Zone'],
    'Ifako-Ijaiye': ['Ifako', 'Ijaiye', 'Agege Road'],
    'Ikeja': ['Ikeja GRA', 'Opebi', 'Allen Avenue', 'Computer Village', 'Alausa', 'Adeniyi Jones', 'Mangoro', 'Oba Akran', 'M M Airport', 'Opebi'],
    'Igando': ['abc'],
    'Idimu': [],
    'Ikoyi': ['Old Ikoyi', 'New Ikoyi', 'Banana Island (nearby)', 'Bourdillon', 'Awolowo Road', 'Glover Road', 'Dolphin', 'Kings Way Road'],
    'Ikorodu': ['Ikorodu Town', 'Igbogbo', 'Ketu', 'Ijede', 'Elepe', 'itamaga', 'Offin', 'Laspotech', 'Ogolonto', 'Sabo', 'Agufoye', 'Odokekere', 'Benson', 'Garage', 'Odonla'],
    'Kosofe': ['Ikosi', 'Agboyi-Ketu', 'Ojota', 'Ketu', 'Agbado'],
    'Lagos Island': ['Marina', 'Broad Street', 'Balogun', 'Iga Idunganran'],
    'Lagos Mainland': ['Yaba', 'Ebute-Metta', 'Surulere (part)'],
    'Mushin': ['Mushin Central', 'Oshodi-Apapa Road'],
    'Ojo': ['Ojo Town', 'Alaba International Market', 'Iba'],
    'Oshodi-Isolo': ['Oshodi', 'Isolo', 'Dopemu'],
    'Shomolu': ['Shomolu Proper', 'Bola', 'Bode Thomas'],
    'Surulere': ['Mile 2', 'Akerele', 'Iponri', 'Bode Thomas'],
    'Lekki': ['Lekki Phase 1', 'Lekki Phase 2', 'Chevron', 'Ajah'],
    'Victoria Island': ['Victoria Island East', 'Victoria Island West'],
    'Yaba': ['Yaba Central', 'Computer Village', 'Akoka'],
    'Bariga': ['Bariga Estate', 'Upper Hill'],
    'Isolo': ['Isolo North', 'Isolo South'],
    'Ilupeju': ['Ilupeju Estate', 'Ogba Road'],
    'Magodo': ['Magodo Phase 1', 'Magodo Phase 2'],
    'Gbagada': ['Gbagada Phase 1', 'Gbagada Phase 2', 'Deeper life', 'Expressway', 'L&K', 'New Garage', 'Olopomeji', 'Pedro', 'SawMill', 'Sholuyi'],
    'Ilasamaja': ['Ilasamaja East', 'Ilasamaja West']
  };

  // Load products from localStorage
  function loadProducts() {
    try {
      const products = JSON.parse(localStorage.getItem('jayx_products') || '[]');
      return products;
    } catch (e) {
      console.error('Error loading products:', e);
      return [];
    }
  }

  // Load/save cart
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem('jayx_cart') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem('jayx_cart', JSON.stringify(items));
  }

  // Load/save list
  function loadList() {
    try {
      return JSON.parse(localStorage.getItem('jayx_list') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveList(items) {
    localStorage.setItem('jayx_list', JSON.stringify(items));
  }

  function getCartSummary(items = loadCart()) {
    const groupedItems = [];
    const groupedMap = new Map();

    items.forEach((item) => {
      const key = `${item.id || item.name}-${item.color || ''}`;

      if (!groupedMap.has(key)) {
        groupedMap.set(key, { ...item, quantity: 0 });
        groupedItems.push(groupedMap.get(key));
      }

      groupedMap.get(key).quantity += 1;
    });

    return {
      groupedItems,
      total: items.reduce((sum, item) => sum + Number(item.price), 0),
      count: items.length
    };
  }

  function populateSelectOptions(selectEl, placeholder, options) {
    if (!selectEl) return;

    selectEl.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = placeholder;
    selectEl.appendChild(defaultOption);

    options.forEach((optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue;
      selectEl.appendChild(option);
    });
  }

  function setupLocationSelectors(stateSelect, citySelect, areaSelect, onLocationChange) {
    if (!stateSelect || !citySelect || !areaSelect) return;

    const emitLocationChange = () => {
      if (typeof onLocationChange === 'function') {
        onLocationChange({
          state: stateSelect.value,
          city: citySelect.value,
          area: areaSelect.value
        });
      }
    };

    stateSelect.addEventListener('change', () => {
      const cities = stateSelect.value === 'Lagos' ? Object.keys(lagosLocations) : [];
      populateSelectOptions(citySelect, 'Select City/Area', cities);
      populateSelectOptions(areaSelect, 'Select Sub Area', []);
      emitLocationChange();
    });

    citySelect.addEventListener('change', () => {
      const areas = citySelect.value && lagosLocations[citySelect.value]
        ? lagosLocations[citySelect.value]
        : [];
      populateSelectOptions(areaSelect, 'Select Sub Area', areas);
      emitLocationChange();
    });

    areaSelect.addEventListener('change', emitLocationChange);
  }

  function updateListCount() {
    const list = loadList();
    listCount.textContent = list.length;
    if (mobileListCount) {
      mobileListCount.textContent = list.length;
    }
    const detailListCount = document.getElementById('detailListCount');
    if (detailListCount) {
      detailListCount.textContent = list.length;
    }
    const modalListCount = document.getElementById('modalListCount');
    if (modalListCount) {
      modalListCount.textContent = list.length;
    }
    if (checkoutListCount) {
      checkoutListCount.textContent = list.length;
    }
  }

  // Escape HTML
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function getCategoryButtons() {
    return document.querySelectorAll('.category-btn[data-filter]');
  }

  function setActiveMenuSelection(selection) {
    currentMenuSelection = selection || 'all';
    sessionStorage.setItem('jayx_active_menu', currentMenuSelection);
  }

  function syncActiveCategoryButtons() {
    document.querySelectorAll('.category-btn[data-home]').forEach(btn => {
      btn.classList.toggle('active', currentMenuSelection === 'home');
    });

    getCategoryButtons().forEach(btn => {
      btn.classList.toggle('active', currentMenuSelection !== 'home' && (btn.dataset.filter || 'all') === currentFilter);
    });
  }

  function renderDetailCategoryMenu() {
    const categoryButtons = categoryMenuItems.map(item => `
      <button
        class="category-btn ${(item.isHome && currentMenuSelection === 'home') || (item.filter && currentMenuSelection !== 'home' && currentFilter === item.filter) ? 'active' : ''}"
        ${item.isHome ? 'data-home="true"' : `data-filter="${item.filter}"`}
        type="button"
      >
        ${item.icon} ${item.label}
      </button>
    `).join('');

    return `${categoryButtons}
      <button class="category-btn mobile-list-btn detail-list-btn" id="detailListButton" type="button">
        &#128278; My List <span id="detailListCount">0</span>
      </button>
    `;
  }

  function applyCategoryFilter(filter, options = {}) {
    currentFilter = filter || 'all';
    setActiveMenuSelection(currentFilter);
    syncActiveCategoryButtons();
    renderProducts();

    if (options.closeProductModal) {
      productModal.setAttribute('aria-hidden', 'true');
    }

    if (options.scrollToProducts && productGrid) {
      productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function goToHomePage() {
    setActiveMenuSelection('home');
    window.location.href = 'index.html';
  }

  // Render products
  function renderProducts() {
    const products = loadProducts();
    const filtered = products.filter(p => {
      const matchFilter = currentFilter === 'all' || (p.category && p.category === currentFilter);
      if (!currentSearch) return matchFilter;
      const q = currentSearch.toLowerCase();
      return matchFilter && (
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.color || '').toLowerCase().includes(q)
      );
    });

    productGrid.innerHTML = '';
    if (filtered.length === 0) {
      productGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</div>';
      return;
    }

    filtered.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      const discount = Math.floor(Math.random() * 30);
      const oldPrice = (Number(prod.price) * (1 + discount / 100)).toFixed(2);
      const ratingVal = prod.rating ? Number(prod.rating) : (Math.random() * 1.5 + 3.5);
      const stars = '★'.repeat(Math.round(ratingVal));

      card.innerHTML = `
        ${prod.category ? `<span class="badge">${escapeHtml(prod.category)}</span>` : ''}
        <img src="${prod.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${escapeHtml(prod.name)}">
        <div class="product-info">
          <h3>${escapeHtml(prod.name)}</h3>
          <div class="desc">${escapeHtml(prod.description || '')}</div>
          <div class="meta"><div><span class="old-price">₦${oldPrice}</span><span class="price">₦${Number(prod.price).toFixed(2)}</span></div></div>
        </div>
      `;

      productGrid.appendChild(card);
      // reveal animation: add 'in-view' so CSS shows the card
      setTimeout(() => card.classList.add('in-view'), 50);

      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-add')) {
          showProductDetails(prod.id);
        }
      });
    });

    // attach add-to-cart handlers
    document.querySelectorAll('.btn-add').forEach(btn => {
      btn.removeEventListener && btn.removeEventListener('click', () => {});
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.target.dataset.id;
        const prod = loadProducts().find(p => p.id === id);
        if (prod) {
          const cart = loadCart();
          cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image });
          saveCart(cart);
          updateCartCount();
          showCartBriefly();
        }
      });
    });
  }

  // Render deals
  function renderDeals() {
    const products = loadProducts();
    const deals = products.slice(0, 6);
    dealsGrid.innerHTML = '';
    deals.forEach(prod => {
      const discount = Math.floor(Math.random() * 50) + 20;
      const oldPrice = (Number(prod.price) * (1 + discount / 100)).toFixed(2);
      const el = document.createElement('div');
      el.className = 'product-card';
      el.innerHTML = `
        ${prod.category ? `<span class="badge">${escapeHtml(prod.category)}</span>` : ''}
        <img src="${prod.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${escapeHtml(prod.name)}">
        <div class="product-info">
          <h3>${escapeHtml(prod.name)}</h3>
          <div class="desc">${escapeHtml(prod.description || '')}</div>
          <div class="meta"><div><span class="old-price">₦${oldPrice}</span><span class="price">₦${Number(prod.price).toFixed(2)}</span></div></div>
        </div>
      `;
      dealsGrid.appendChild(el);
      // reveal animation for deals
      setTimeout(() => el.classList.add('in-view'), 50);
      el.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-add')) {
          showProductDetails(prod.id);
        }
      });
    });
  }

  // Show product details
  function showProductDetails(prodId) {
    const prod = loadProducts().find(p => p.id === prodId);
    if (!prod) return;

    const stockClass = prod.stock <= 5 ? 'low-stock' : 'in-stock';
    const ratingVal = prod.rating ? Number(prod.rating) : (Math.random() * 1.5 + 3.5);
    const stars = '★'.repeat(Math.round(ratingVal)) + '☆'.repeat(5 - Math.round(ratingVal));
    
    // Mock color variations (in real app, these would come from product data)
    const colorVariations = ['Red', 'Blue', 'Black', 'Silver', 'White'];
    const currentColor = prod.color || 'Black';
    const colorOptions = colorVariations.map(color => 
      `<button class="color-btn ${color === currentColor ? 'active' : ''}" data-color="${color}" title="${color}">
        <span class="color-swatch" style="background-color: ${getColorCode(color)}"></span>
      </button>`
    ).join('');

    productDetails.innerHTML = `
      <header class="header">
        <div class="container">
          <button id="modalMenuToggle" class="menu-toggle" type="button" aria-label="Toggle categories" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div class="logo"><span class="logo-jay">JAY</span><span class="logo-x">X</span><span class="logo-stores">STORES</span></div>
          <button id="modalBackButton" class="modal-back-btn" type="button" aria-label="Go back">&lt;</button>
          <div class="search-section">
            <div class="search-bar">
              <input id="modalSearchInput" type="text" placeholder="Search products, brands..." />
              <button id="modalSearchBtn">🔍</button>
            </div>
          </div>
          <div class="header-actions">
            <div class="account account-dropdown">
              <button class="account-toggle">
                <span>👤</span>
                <span>Account</span>
              </button>
              <div class="account-menu">
                <a href="../web-signin/index.html" class="account-menu-item">Sign In</a>
                <a href="../web-signin/index.html" class="account-menu-item">Register</a>
              </div>
            </div>
            <div class="list-icon" id="modalListIcon">
              <span>🔖</span>
              <span id="modalListCount">0</span>
            </div>
            <div class="cart-icon" id="modalCartIcon">
              <span>🛒</span>
              <span id="modalCartCount">0</span>
            </div>
          </div>
        </div>
      </header>
      <div class="detail-top-category-bar">
        <div class="detail-category-menu detail-category-menu-top">
          <div class="detail-category-copy">
            <span class="detail-welcome-text">Welcome to JayXstores! 🚚 Free Shipping on orders over ₦50,000</span>
          </div>
          <div class="detail-category-list">
            ${renderDetailCategoryMenu()}
          </div>
        </div>
      </div>
      <div class="product-details-modal">
        <div class="product-image-section">
          <img src="${prod.image || 'https://via.placeholder.com/350x350?text=No+Image'}" alt="${escapeHtml(prod.name)}" class="detail-main-image">
          <div class="color-section">
            <p><strong>Color Options:</strong></p>
            <div class="color-options">
              ${colorOptions}
            </div>
            <p class="selected-color">Selected: <span id="selectedColor">${currentColor}</span></p>
          </div>
          <div class="quantity-section">
            <label for="quantityInput"><strong>Quantity:</strong></label>
            <div class="quantity-controls">
              <button class="qty-btn minus-btn">−</button>
              <input type="number" id="quantityInput" class="quantity-input" value="1" min="1" max="${prod.stock}">
              <button class="qty-btn plus-btn">+</button>
            </div>
          </div>
        </div>
        <div class="product-info-section">
          <h2 class="detail-title">${escapeHtml(prod.name)}</h2>
          <div class="detail-rating">
            <span class="rating-stars">${stars}</span>
            <span class="rating-value">(${ratingVal.toFixed(1)}/5)</span>
          </div>
          <div class="detail-price-section">
            <span class="detail-price">₦${Number(prod.price).toFixed(2)}</span>
          </div>
          <div class="detail-stock ${stockClass}">
            Stock: <strong>${prod.stock}</strong> ${prod.stock <= 5 ? '(Low Stock)' : '(Available)'}
          </div>
          <div class="detail-meta">
            <p><strong>Category:</strong> ${escapeHtml(prod.category || 'Uncategorized')}</p>
          </div>
          <p class="detail-desc">${escapeHtml(prod.description || 'No description available')}</p>
          <div class="detail-actions">
            <button class="add-btn" data-id="${prod.id}">Add to Cart</button>
            <button class="add-list-btn" data-id="${prod.id}">Add to List</button>
          </div>
        </div>
        <div class="product-side-section">
          <div class="review-section">
            <h3>Customer Reviews</h3>
            <div id="reviewsList" class="reviews-list"></div>
            <div class="review-form">
              <h4>Leave a Review</h4>
              <div class="review-rating">
                <label><strong>Rating:</strong></label>
                <div class="star-rating" id="starRating">
                  ${[1,2,3,4,5].map(i => `<button class="star-btn" data-rating="${i}" title="${i} star${i>1?'s':''}">★</button>`).join('')}
                </div>
                <span id="selectedRating">0</span>/5
              </div>
              <div class="review-input">
                <label for="reviewText"><strong>Your Review:</strong></label>
                <textarea id="reviewText" class="review-textarea" placeholder="Share your thoughts about this product..." maxlength="300"></textarea>
                <small id="charCount">0/300</small>
              </div>
              <button id="submitReviewBtn" class="submit-review-btn">Submit Review</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const modalMenuToggle = productDetails.querySelector('#modalMenuToggle');
    modalMenuToggle?.addEventListener('click', handleModalMenuToggle);
    const modalBackButton = productDetails.querySelector('#modalBackButton');
    modalBackButton?.addEventListener('click', handleModalBack);
    const modalListIcon = productDetails.querySelector('#modalListIcon');
    modalListIcon?.addEventListener('click', () => {
      listModal.setAttribute('aria-hidden', 'false');
      renderList();
    });
    const detailListButton = productDetails.querySelector('#detailListButton');
    detailListButton?.addEventListener('click', () => {
      const detailMenu = productDetails.querySelector('.detail-top-category-bar');
      const detailToggle = productDetails.querySelector('#modalMenuToggle');
      detailMenu?.classList.remove('is-open');
      detailToggle?.classList.remove('active');
      detailToggle?.setAttribute('aria-expanded', 'false');
      listModal.setAttribute('aria-hidden', 'false');
      renderList();
    });
    const modalCartIcon = productDetails.querySelector('#modalCartIcon');
    modalCartIcon?.addEventListener('click', () => {
      cartModal.setAttribute('aria-hidden', 'false');
      renderCart();
    });

    updateCartCount();
    updateListCount();

    // Handle color selection
    const colorButtons = productDetails.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('selectedColor').textContent = btn.dataset.color;
      });
    });

    // Handle quantity controls
    const quantityInput = productDetails.querySelector('#quantityInput');
    const minusBtn = productDetails.querySelector('.minus-btn');
    const plusBtn = productDetails.querySelector('.plus-btn');

    minusBtn.addEventListener('click', () => {
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });

    plusBtn.addEventListener('click', () => {
      if (quantityInput.value < prod.stock) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      }
    });

    quantityInput.addEventListener('change', () => {
      if (quantityInput.value < 1) quantityInput.value = 1;
      if (quantityInput.value > prod.stock) quantityInput.value = prod.stock;
    });

    // Handle add to cart
    productDetails.querySelector('.add-btn').addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const product = prod;
      const selectedColor = document.getElementById('selectedColor').textContent;
      const quantity = parseInt(quantityInput.value);
      
      if (product) {
        const cart = loadCart();
        for (let i = 0; i < quantity; i++) {
          cart.push({ id: product.id, name: product.name, price: product.price, color: selectedColor, image: product.image });
        }
        saveCart(cart);
        updateCartCount();
        showCartBriefly();
      }
    });

    // Handle add to list
    productDetails.querySelector('.add-list-btn').addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const product = prod;
      
      if (product) {
        const list = loadList();
        // Check if product already exists in list
        if (!list.some(item => item.id === product.id)) {
          list.push({ id: product.id, name: product.name, price: product.price, image: product.image });
          saveList(list);
          updateListCount();
          alert(`${product.name} added to your list!`);
        } else {
          alert(`${product.name} is already in your list!`);
        }
      }
    });

    // Handle star rating
    const starButtons = productDetails.querySelectorAll('.star-btn');
    let selectedRating = 0;
    starButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedRating = parseInt(btn.dataset.rating);
        document.getElementById('selectedRating').textContent = selectedRating;
        starButtons.forEach((b, idx) => {
          if (idx < selectedRating) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      });
    });

    // Handle review textarea
    const reviewText = productDetails.querySelector('#reviewText');
    const charCount = productDetails.querySelector('#charCount');
    reviewText.addEventListener('input', () => {
      charCount.textContent = reviewText.value.length;
    });

    // Load and display existing reviews
    function loadReviews() {
      try {
        return JSON.parse(localStorage.getItem(`reviews_${prodId}`) || '[]');
      } catch (e) {
        return [];
      }
    }

    function displayReviews() {
      const reviews = loadReviews();
      const reviewsList = productDetails.querySelector('#reviewsList');
      reviewsList.innerHTML = '';
      
      if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
        return;
      }

      reviews.forEach(review => {
        const reviewEl = document.createElement('div');
        reviewEl.className = 'review-item';
        reviewEl.innerHTML = `
          <div class="review-header">
            <div class="review-rating-display">
              <span class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
              <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
            </div>
          </div>
          <p class="review-text">${escapeHtml(review.text)}</p>
          ${review.city && review.state ? `<p class="review-location">From: ${escapeHtml(review.city)}, ${escapeHtml(review.state)}</p>` : ''}
        `;
        reviewsList.appendChild(reviewEl);
      });
    }

    // Submit review
    const submitReviewBtn = productDetails.querySelector('#submitReviewBtn');
    submitReviewBtn.addEventListener('click', () => {
      if (selectedRating === 0) {
        alert('Please select a rating');
        return;
      }
      if (reviewText.value.trim() === '') {
        alert('Please write a review');
        return;
      }
      const reviews = loadReviews();
      reviews.push({
        rating: selectedRating,
        text: reviewText.value,
        date: new Date().toISOString()
      });
      localStorage.setItem(`reviews_${prodId}`, JSON.stringify(reviews));

      // Reset form
      selectedRating = 0;
      starButtons.forEach(b => b.classList.remove('active'));
      document.getElementById('selectedRating').textContent = '0';
      reviewText.value = '';
      charCount.textContent = '0';

      // Refresh reviews display
      displayReviews();
      alert('Thank you for your review!');
    });

    displayReviews();
    syncActiveCategoryButtons();

    productModal.setAttribute('aria-hidden', 'false');
  }

  // Helper function to get color codes
  function getColorCode(color) {
    const colorMap = {
      'Red': '#ff6b6b',
      'Blue': '#4ecdc4',
      'Black': '#2c3e50',
      'Silver': '#bdc3c7',
      'White': '#f5f5f5'
    };
    return colorMap[color] || '#999';
  }

  // Close product modal
  closeProduct.addEventListener('click', () => {
    productModal.setAttribute('aria-hidden', 'true');
  });

  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      productModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Update cart count
  function updateCartCount() {
    const cartLength = loadCart().length;
    const itemLabel = cartLength === 1 ? 'item' : 'items';
    cartCount.textContent = cartLength;
    const modalCartCount = document.getElementById('modalCartCount');
    if (modalCartCount) {
      modalCartCount.textContent = cartLength;
    }
    if (checkoutBtn) {
      checkoutBtn.textContent = cartLength > 0
        ? `Proceed to Checkout (${cartLength} ${itemLabel})`
        : 'Proceed to Checkout';
    }
    if (checkoutCartCount) {
      checkoutCartCount.textContent = cartLength;
    }
  }

  // Render cart
  function renderCart() {
    const items = loadCart();
    const cartTitle = cartModal.querySelector('h2');
    cartList.innerHTML = '';
    let total = 0;
    if (cartTitle) {
      cartTitle.textContent = items.length > 0
        ? `Shopping Cart (${items.length})`
        : 'Shopping Cart';
    }
    items.forEach((item, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${escapeHtml(item.name)} — ₦${Number(item.price).toFixed(2)}</span>
        <button class="remove-btn" data-idx="${idx}">Remove</button>
      `;
      cartList.appendChild(li);
      total += Number(item.price);
    });
    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.target.dataset.idx);
        const items = loadCart();
        items.splice(idx, 1);
        saveCart(items);
        renderCart();
        updateCartCount();
      });
    });
  }

  // Open cart and keep it visible until the user closes it
  function showCartBriefly() {
    cartModal.setAttribute('aria-hidden', 'false');
    renderCart();
  }

  function renderCart() {
    const items = loadCart();
    const { groupedItems, total, count } = getCartSummary(items);
    const cartTitle = cartModal.querySelector('h2');

    cartList.innerHTML = '';

    if (cartTitle) {
      cartTitle.textContent = count > 0
        ? `Shopping Cart (${count})`
        : 'Shopping Cart';
    }

    groupedItems.forEach((item) => {
      const matchingIndexes = items.reduce((acc, cartItem, index) => {
        const sameId = (cartItem.id || cartItem.name) === (item.id || item.name);
        const sameColor = (cartItem.color || '') === (item.color || '');

        if (sameId && sameColor) {
          acc.push(index);
        }

        return acc;
      }, []);

      const li = document.createElement('li');
      li.innerHTML = `
        <div class="cart-item-copy">
          <strong>${escapeHtml(item.name)}</strong>
          <span>Qty ${item.quantity}${item.color ? ` - ${escapeHtml(item.color)}` : ''}</span>
        </div>
        <div class="cart-item-actions">
          <span>₦${(Number(item.price) * item.quantity).toFixed(2)}</span>
          <button class="remove-btn" data-idx="${matchingIndexes[matchingIndexes.length - 1]}">Remove</button>
        </div>
      `;
      cartList.appendChild(li);
    });

    if (groupedItems.length === 0) {
      cartList.innerHTML = '<li class="cart-empty-state">Your cart is empty. Add a few items to continue.</li>';
    }

    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.target.dataset.idx);
        const updatedItems = loadCart();
        updatedItems.splice(idx, 1);
        saveCart(updatedItems);
        renderCart();
        renderCheckout();
        updateCartCount();
      });
    });
  }

  function renderCheckout() {
    if (!checkoutItems) return;

    const { groupedItems, total, count } = getCartSummary();
    checkoutItems.innerHTML = '';

    groupedItems.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span>Qty ${item.quantity}${item.color ? ` - ${escapeHtml(item.color)}` : ''}</span>
        </div>
        <span>₦${(Number(item.price) * item.quantity).toFixed(2)}</span>
      `;
      checkoutItems.appendChild(li);
    });

    if (groupedItems.length === 0) {
      checkoutItems.innerHTML = '<li class="checkout-empty-state">Your cart is empty.</li>';
    }

    checkoutItemCount.textContent = String(count);
    checkoutSubtotal.textContent = total.toFixed(2);
    checkoutGrandTotal.textContent = total.toFixed(2);
  }

  // Render list
  function renderList() {
    const items = loadList();
    listItems.innerHTML = '';
    
    if (items.length === 0) {
      emptyListMessage.style.display = 'block';
    } else {
      emptyListMessage.style.display = 'none';
      items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = 'list-item';
        if (item.id) {
          li.dataset.id = item.id;
        }
        li.innerHTML = `
          <img src="${item.image || 'https://via.placeholder.com/80x80?text=No+Image'}" alt="${escapeHtml(item.name)}" class="list-item-image">
          <div class="list-item-info">
            <span>${escapeHtml(item.name)}</span>
            <span class="list-item-price">₦${Number(item.price).toFixed(2)}</span>
          </div>
          <button class="remove-list-btn" data-idx="${idx}">Remove</button>
        `;
        listItems.appendChild(li);
      });

      document.querySelectorAll('.list-item').forEach(itemEl => {
        itemEl.addEventListener('click', (e) => {
          if (e.target.closest('.remove-list-btn')) {
            return;
          }

          const productId = itemEl.dataset.id;
          if (!productId) {
            return;
          }

          listModal.setAttribute('aria-hidden', 'true');
          showProductDetails(productId);
        });
      });

      document.querySelectorAll('.remove-list-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = Number(e.target.dataset.idx);
          const items = loadList();
          items.splice(idx, 1);
          saveList(items);
          renderList();
          updateListCount();
        });
      });
    }
  }

  // Cart events
  cartIcon.addEventListener('click', () => {
    cartModal.setAttribute('aria-hidden', 'false');
    renderCart();
  });

  closeCart.addEventListener('click', () => {
    cartModal.setAttribute('aria-hidden', 'true');
  });

  checkoutMenuToggle?.addEventListener('click', openCategoryMenu);
  checkoutBackButton?.addEventListener('click', () => {
    checkoutModal.setAttribute('aria-hidden', 'true');
    cartModal.setAttribute('aria-hidden', 'false');
    renderCart();
  });
  checkoutCartIcon?.addEventListener('click', () => {
    checkoutModal.setAttribute('aria-hidden', 'true');
    cartModal.setAttribute('aria-hidden', 'false');
    renderCart();
  });
  checkoutListIcon?.addEventListener('click', () => {
    listModal.setAttribute('aria-hidden', 'false');
    renderList();
  });
  checkoutSearchBtn?.addEventListener('click', () => {
    currentSearch = checkoutSearchInput?.value.trim() || '';
    checkoutModal.setAttribute('aria-hidden', 'true');
    renderProducts();
    if (productGrid) {
      productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  checkoutSearchInput?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      checkoutSearchBtn?.click();
    }
  });

  checkoutBtn.addEventListener('click', () => {
    const cart = loadCart();
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    renderCheckout();
    cartModal.setAttribute('aria-hidden', 'true');
    checkoutModal.setAttribute('aria-hidden', 'false');
  });

  closeCheckout?.addEventListener('click', () => {
    checkoutModal.setAttribute('aria-hidden', 'true');
  });

  checkoutModal?.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.setAttribute('aria-hidden', 'true');
    }
  });

  let orderSuccessRedirectTimeout = null;
  let orderSuccessCountdownInterval = null;

  function redirectToHomepage() {
    window.location.href = './index.html';
  }

  function clearOrderSuccessTimers() {
    if (orderSuccessRedirectTimeout) {
      clearTimeout(orderSuccessRedirectTimeout);
      orderSuccessRedirectTimeout = null;
    }
    if (orderSuccessCountdownInterval) {
      clearInterval(orderSuccessCountdownInterval);
      orderSuccessCountdownInterval = null;
    }
  }

  function closeOrderSuccessModal() {
    clearOrderSuccessTimers();
    orderSuccessModal?.setAttribute('aria-hidden', 'true');
  }

  function openOrderSuccessModal(customerName) {
    let secondsRemaining = 10;
    if (orderSuccessMessage) {
      orderSuccessMessage.textContent = `Thank you, ${customerName}. Your order has been placed successfully and is now being processed.`;
    }
    if (orderSuccessRedirectText) {
      orderSuccessRedirectText.textContent = `Redirecting to homepage in ${secondsRemaining} seconds...`;
    }

    clearOrderSuccessTimers();
    orderSuccessModal?.setAttribute('aria-hidden', 'false');

    orderSuccessCountdownInterval = setInterval(() => {
      secondsRemaining -= 1;
      if (secondsRemaining > 0 && orderSuccessRedirectText) {
        orderSuccessRedirectText.textContent = `Redirecting to homepage in ${secondsRemaining} seconds...`;
      }
    }, 1000);

    orderSuccessRedirectTimeout = setTimeout(() => {
      closeOrderSuccessModal();
      redirectToHomepage();
    }, secondsRemaining * 1000);
  }

  closeOrderSuccess?.addEventListener('click', closeOrderSuccessModal);
  orderSuccessDone?.addEventListener('click', () => {
    closeOrderSuccessModal();
    redirectToHomepage();
  });

  orderSuccessModal?.addEventListener('click', (e) => {
    if (e.target === orderSuccessModal) {
      closeOrderSuccessModal();
    }
  });

  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = loadCart();
    if (cart.length === 0) {
      alert('Your cart is empty.');
      checkoutModal.setAttribute('aria-hidden', 'true');
      return;
    }

    const orderData = {
      customer: {
        fullName: checkoutForm.fullName.value.trim(),
        email: checkoutForm.email.value.trim(),
        phone: checkoutForm.phone.value.trim(),
        state: checkoutForm.state.value.trim(),
        address: checkoutForm.address.value.trim(),
        city: checkoutForm.city.value.trim(),
        area: checkoutForm.area.value.trim(),
        payment: checkoutForm.payment.value,
        notes: checkoutForm.notes.value.trim()
      },
      items: cart,
      total: getCartSummary(cart).total,
      date: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('jayx_orders') || '[]');
    existingOrders.unshift(orderData);
    localStorage.setItem('jayx_orders', JSON.stringify(existingOrders));

    saveCart([]);
    checkoutForm.reset();
    populateSelectOptions(checkoutCity, 'Select City/Area', []);
    populateSelectOptions(checkoutArea, 'Select Sub Area', []);
    renderCheckout();
    checkoutModal.setAttribute('aria-hidden', 'true');
    updateCartCount();
    renderCart();
    openOrderSuccessModal(orderData.customer.fullName);
  });

  setupLocationSelectors(checkoutState, checkoutCity, checkoutArea);

  // List events
  listIcon.addEventListener('click', () => {
    listModal.setAttribute('aria-hidden', 'false');
    renderList();
  });

  mobileListButton?.addEventListener('click', () => {
    closeCategoryMenuPanel();
    listModal.setAttribute('aria-hidden', 'false');
    renderList();
  });

  closeList.addEventListener('click', () => {
    listModal.setAttribute('aria-hidden', 'true');
  });

  // Category filters
  getCategoryButtons().forEach(btn => {
    btn.addEventListener('click', () => {
      applyCategoryFilter(btn.dataset.filter, {
        closeProductModal: btn.closest('#productDetails') !== null,
        scrollToProducts: btn.closest('#productDetails') !== null
      });
    });
  });

  productDetails.addEventListener('click', (e) => {
    const detailCategoryBtn = e.target.closest('.detail-category-menu .category-btn[data-filter]');
    if (!detailCategoryBtn) return;

    applyCategoryFilter(detailCategoryBtn.dataset.filter, {
      closeProductModal: true,
      scrollToProducts: true
    });
  });

  document.addEventListener('click', (e) => {
    const homeBtn = e.target.closest('.category-btn[data-home]');
    if (!homeBtn) return;

    goToHomePage();
  });

  // Search
  function doSearch() {
    currentSearch = searchInput.value.trim();
    renderProducts();
  }

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') doSearch();
  });
  searchBtn.addEventListener('click', doSearch);

  // Initialize
  yearEl.textContent = new Date().getFullYear();

  // Demo products
  if (loadProducts().length === 0) {
    const demoProducts = [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        description: 'Latest Apple smartphone',
        category: 'phones',
        price: 999,
        stock: 15,
        color: 'Space Black',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '2',
        name: 'MacBook Pro 16"',
        description: 'Powerful laptop for professionals',
        category: 'computers',
        price: 2499,
        stock: 8,
        color: 'Silver',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '3',
        name: 'AirPods Pro Max',
        description: 'Premium headphones',
        category: 'accessories',
        price: 549,
        stock: 20,
        color: 'Space Black',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '4',
        name: 'iPad Air',
        description: 'Versatile tablet',
        category: 'gadgets',
        price: 599,
        stock: 12,
        color: 'Blue',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '5',
        name: 'Apple Watch Series 9',
        description: 'Advanced smartwatch',
        category: 'gadgets',
        price: 399,
        stock: 25,
        color: 'Midnight',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '6',
        name: 'Sony WH-1000XM5',
        description: 'Noise-cancelling headphones',
        category: 'accessories',
        price: 399,
        stock: 18,
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '7',
        name: 'Samsung Galaxy S24',
        description: 'Flagship Android phone',
        category: 'phones',
        price: 899,
        stock: 22,
        color: 'Phantom Black',
        image: 'https://images.unsplash.com/photo-1511454715159-c8a3cb1c3ff7?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '8',
        name: 'Dell XPS 13',
        description: 'Ultraportable Windows laptop',
        category: 'computers',
        price: 1299,
        stock: 14,
        color: 'Silver',
        image: 'https://images.unsplash.com/photo-1588872657840-18f45ea20ee0?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '9',
        name: 'Google Pixel Buds Pro',
        description: 'True wireless earbuds',
        category: 'accessories',
        price: 199,
        stock: 30,
        color: 'Charcoal',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '10',
        name: 'iPad Pro 12.9"',
        description: 'Premium tablet with M2',
        category: 'gadgets',
        price: 1099,
        stock: 9,
        color: 'Space Grey',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '11',
        name: 'AirPods Pro (2nd Gen)',
        description: 'Wireless earbuds with ANC',
        category: 'accessories',
        price: 249,
        stock: 35,
        color: 'White',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '12',
        name: 'Google Pixel Watch 2',
        description: 'Smartwatch with Wear OS',
        category: 'gadgets',
        price: 349,
        stock: 16,
        color: 'Obsidian',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '13',
        name: 'OnePlus 12',
        description: 'Fast charging flagship phone',
        category: 'phones',
        price: 799,
        stock: 19,
        color: 'Silky Black',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '14',
        name: 'Lenovo ThinkPad X1',
        description: 'Business laptop',
        category: 'computers',
        price: 1199,
        stock: 11,
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1588872657840-18f45ea20ee0?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '15',
        name: 'Bose QuietComfort 45',
        description: 'Premium over-ear headphones',
        category: 'accessories',
        price: 379,
        stock: 13,
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=60&auto=format&fit=crop'
      },
      {
        id: '16',
        name: 'Samsung Galaxy Tab S9',
        description: 'High-end Android tablet',
        category: 'gadgets',
        price: 799,
        stock: 10,
        color: 'Graphite',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=60&auto=format&fit=crop'
      }
    ];
    localStorage.setItem('jayx_products', JSON.stringify(demoProducts));
  }

  updateCartCount();
  updateListCount();
  renderCheckout();
  syncActiveCategoryButtons();
  renderProducts();
  renderDeals();
});
