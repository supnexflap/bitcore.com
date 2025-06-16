document.addEventListener('DOMContentLoaded', () => {
  // Инициализация корзины при загрузке страницы
  updateCart();

  // --- Каталог (catalog.html) ---
  if (window.location.pathname.includes('catalog.html')) {
    // Поиск по названию
    const searchForm = document.getElementById('product-search-form');
    const searchInput = document.getElementById('product-search-input');

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        const items = document.querySelectorAll('.blocks__item');
      
        items.forEach(item => {
          const title = item.querySelector('.card__title')?.textContent.toLowerCase() || '';
          item.style.display = title.includes(query) ? 'block' : 'none';
        });
      });
    }

    const list = document.querySelector('.categories__list');
    const items = document.querySelectorAll('.blocks__item');
    const filtersTitle = document.querySelector('.filters-category');
    const filtersContent = document.querySelector('.filters-content');
    const blocksRow = document.querySelector('.blocks__row');

    if (!list || !filtersTitle || !filtersContent || !blocksRow) {
      console.error('Required elements not found');
      return;
    }

    // Функция для случайного перемешивания элементов
    function shuffleElements(container) {
      const children = Array.from(container.children);
      for (let i = children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [children[i], children[j]] = [children[j], children[i]];
      }
      children.forEach(child => container.appendChild(child));
    }

    // Перемешиваем карточки при загрузке страницы
    shuffleElements(blocksRow);

    const labels = {
      socket: 'Сокет',
      chipset: 'Чипсет',
      formFactor: 'Форм-фактор',
      typeMemory: 'Тип памяти',
      maxMemoryFrequency: 'Макс. частота памяти',
      memorySlots: 'Слоты памяти',
      wiFi: 'Wi-Fi',
      pcieEx5: 'PCIe Ex5',
      slotsM2: 'Слоты M.2',
      manufacturer: 'Производитель',
      cores: 'Количество ядер',
      threads: 'Количество потоков',
      baseClock: 'Базовая частота',
      boostClock: 'Турбо частота',
      graphics: 'Встроенная графика',
      memoryType: 'Тип памяти',
      tdp: 'TDP',
      series: 'Серия',
      memory: 'Память',
      gpuBrand: "Графический чип",
      series: "Серия видеокарты",
      vram: "Объём видеопамяти",
      connectors: "Разъёмы",
      tdp: "Энергопотребление (TDP)",
      power: "Мощность",
      certification: "Сертификация 80+"
    };

    const filtersData = {
      motherboards: [
        { id: "socket", type: "select", options: ["AM4", "AM5", "LGA1200", "LGA1700", "LGA1151"] },
        { id: "chipset", type: "select", options: ["B450", "B550", "X570", "B650", "X670", "Z590", "Z690", "Z790", "AMD B550"] },
        { id: "formFactor", type: "select", options: ["ATX", "Micro-ATX", "Mini-ITX", "E-ATX"] },
        { id: "typeMemory", type: "select", options: ["DDR4", "DDR5"] },
        { id: "maxMemoryFrequency", type: "select", options: ["3200 МГц", "3600 МГц", "4800 МГц", "5200 МГц и выше"] },
        { id: "memorySlots", type: "select", options: ["2", "4", "8"] },
        { id: "wiFi", type: "select", options: ["Есть", "Нет"] },
        { id: "pcieEx5", type: "select", options: ["Да", "Нет"] },
        { id: "slotsM2", type: "select", options: ["1", "2", "3 и более"] },
        { id: "manufacturer", type: "select", options: ["Gigabyte", "ASRock"] }
      ],
      cpu: [
        { id: "socket", type: "select", options: ["LGA1700", "AM4", "AM5", "LGA1151"] },
        { id: "cores", type: "select", options: ["6", "16", "20"] },
        { id: "threads", type: "select", options: ["12", "24", "28"] },
        { id: "baseClock", type: "select", options: ["2.1 ГГц", "2.5 ГГц", "3.2 ГГц", "3.4 ГГц"] },
        { id: "boostClock", type: "select", options: ["4.4 ГГц", "5.2 ГГц", "5.4 ГГц", "5.6 ГГц"] },
        { id: "graphics", type: "select", options: ["Есть", "Нет"] },
        { id: "memoryType", type: "select", options: ["DDR4, DDR5"] },
        { id: "tdp", type: "select", options: ["65 Вт", "125 Вт", "219 Вт"] },
        { id: "series", type: "select", options: ["Core i5", "Core i7", "Core i9"] },
        { id: "manufacturer", type: "select", options: ["Intel", "AMD"] }
      ],
      gpu: [
        { id: "gpuBrand", type: "select", options: ["NVIDIA", "AMD"] },
        { id: "series", type: "select", options: ["GTX 16", "RTX 30", "RTX 50", "RX 7000"] },
        { id: "vram", type: "select", options: ["6 ГБ", "8 ГБ", "10 ГБ", "12 ГБ", "16 ГБ"] },
        { id: "connectors", type: "select", options: ["HDMI", "DisplayPort", "DVI"] },
        { id: "tdp", type: "select", options: ["125 Вт", "165 Вт", "250 Вт", "280 Вт", "320 Вт"] },
        { id: "manufacturer", type: "select", options: ["Gigabyte", "ASRock"] }
      ],
      power: [
        { id: "manufacturer", type: "select", options: ["Deepcool", "Aerocool"] },
        { id: "power", type: "select", options: ["500 Вт", "650 Вт", "750 Вт"] },
        { id: "certification", type: "select", options: ["Нет", "Bronze", "Gold"] }
      ],
    };

    const globalFilters = [
      {
        id: "price",
        label: "Цена",
        type: "range",
        name: "price",
        min: 0,
        max: 1000000,
        step: 1000
      }
    ];

    const categories = document.querySelectorAll('.list__item');

    categories.forEach(item => {
      item.addEventListener('click', () => {
        const selectedCategory = item.dataset.id;

        categories.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        filtersTitle.textContent = selectedCategory === "all"
          ? "(все категории)"
          : `(${item.textContent.trim()})`;

        filtersContent.innerHTML = "";

        globalFilters.forEach(filter => {
          const wrapper = document.createElement('div');
          const label = document.createElement('label');
          label.textContent = filter.label;

          if (filter.type === "range") {
            const rangeContainer = document.createElement('div');
            rangeContainer.classList.add('range-container');

            const rangeMin = document.createElement('input');
            rangeMin.type = 'range';
            rangeMin.min = filter.min;
            rangeMin.max = filter.max;
            rangeMin.step = filter.step;
            rangeMin.value = filter.min;
            rangeMin.id = 'price-range-min';

            const rangeMax = document.createElement('input');
            rangeMax.type = 'range';
            rangeMax.min = filter.min;
            rangeMax.max = filter.max;
            rangeMax.step = filter.step;
            rangeMax.value = filter.max;
            rangeMax.id = 'price-range-max';

            const rangeDisplay = document.createElement('div');
            rangeDisplay.classList.add('range-values');
            rangeDisplay.textContent = `от ${rangeMin.value} ₸ до ${rangeMax.value} ₸`;

            rangeMin.addEventListener('input', () => {
              if (+rangeMin.value > +rangeMax.value) rangeMin.value = rangeMax.value;
              rangeDisplay.textContent = `от ${rangeMin.value} ₸ до ${rangeMax.value} ₸`;
              applyFilters();
            });

            rangeMax.addEventListener('input', () => {
              if (+rangeMax.value < +rangeMin.value) rangeMax.value = rangeMin.value;
              rangeDisplay.textContent = `от ${rangeMin.value} ₸ до ${rangeMax.value} ₸`;
              applyFilters();
            });

            const sliderGroup = document.createElement('div');
            sliderGroup.style.display = 'flex';
            sliderGroup.style.flexDirection = 'column';
            sliderGroup.style.gap = '10px';
            sliderGroup.appendChild(rangeMin);
            sliderGroup.appendChild(rangeMax);

            rangeContainer.appendChild(rangeDisplay);
            rangeContainer.appendChild(sliderGroup);
            wrapper.appendChild(label);
            wrapper.appendChild(rangeContainer);
          }

          filtersContent.appendChild(wrapper);
        });

        const filters = filtersData[selectedCategory];
        if (filters) {
          const collapsibleContainer = document.createElement('div');
          collapsibleContainer.classList.add('collapsible-filters');
          collapsibleContainer.style.display = 'none';

          filters.forEach(filter => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('filter-item');

            const label = document.createElement('label');
            label.textContent = labels[filter.id] || filter.id;

            const select = document.createElement('select');
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '—';
            select.appendChild(defaultOption);

            filter.options.forEach(option => {
              const opt = document.createElement('option');
              opt.value = option;
              opt.textContent = option;
              select.appendChild(opt);
            });

            select.addEventListener("change", applyFilters);

            wrapper.appendChild(label);
            wrapper.appendChild(select);
            collapsibleContainer.appendChild(wrapper);
          });

          const toggleButton = document.createElement('button');
          toggleButton.textContent = 'Развернуть фильтры ▾';
          toggleButton.className = 'toggle-filters-btn';
          toggleButton.addEventListener('click', () => {
            const isHidden = collapsibleContainer.style.display === 'none';
            collapsibleContainer.style.display = isHidden ? 'block' : 'none';
            toggleButton.textContent = isHidden ? 'Скрыть фильтры ▴' : 'Развернуть фильтры ▾';
          });

          filtersContent.appendChild(toggleButton);
          filtersContent.appendChild(collapsibleContainer);
        }

        applyFilters();
      });
    });

    function applyFilters() {
      const activeCategory = document.querySelector('.list__item.active')?.dataset.id || 'all';
      const items = document.querySelectorAll('.blocks__item');
      const selects = document.querySelectorAll('.filters-content select');

      const minPrice = parseInt(document.getElementById('price-range-min')?.value || 0);
      const maxPrice = parseInt(document.getElementById('price-range-max')?.value || Infinity);

      const activeFilters = {};
      selects.forEach(select => {
        const label = select.previousSibling?.textContent?.trim().toLowerCase();
        const id = Object.keys(labels).find(key => labels[key].toLowerCase() === label) || label;
        if (id) activeFilters[id] = select.value;
      });

      items.forEach(item => {
        const priceText = item.querySelector('.card__price--discount .price-value')?.textContent ||
                          item.querySelector('.card__price--common .price-value')?.textContent || '0';
        const numericPrice = parseInt(priceText.replace(/[^\d]/g, '')) || 0;

        if (numericPrice < minPrice || numericPrice > maxPrice) {
          item.style.display = 'none';
          return;
        }

        if (activeCategory !== 'all' && !item.classList.contains(activeCategory)) {
          item.style.display = 'none';
          return;
        }

        let visible = true;
        for (const [id, value] of Object.entries(activeFilters)) {
          if (value === '') continue;
          const attrName = convertToAttr(id);
          const itemAttr = item.dataset[attrName];
          if (itemAttr !== value) {
            visible = false;
            break;
          }
        }

        item.style.display = visible ? 'block' : 'none';
      });
    }

    function convertToAttr(label) {
      return label.toLowerCase().replace(/\s+/g, '-');
    }

    // Обработка параметра ?category=... при заходе в каталог
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromURL = urlParams.get('category');
    if (categoryFromURL) {
      const targetCategory = document.querySelector(`.list__item[data-id="${categoryFromURL}"]`);
      targetCategory?.click();
    } else {
      document.querySelector('.list__item[data-id="all"]')?.click();
    }
  }

  // --- Бургер-меню ---
  document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('menu-toggle').checked = false;
    });
  });

  // --- Плавная прокрутка (исключаем .card__title) ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.classList.contains('card__title')) return; // Пропускаем .card__title
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // --- Обратная связь (главная страница) ---
  const token = '7741799681:AAF5Flgim2zMDNenNvgfeCmm7CTSZLG8T4A';
  const chatId = 718531554;

  const nameInput = document.getElementById('user-name');
  const phoneInput = document.getElementById('user-phone');
  const submitButton = document.getElementById('submit-request');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');

  if (submitButton) {
    submitButton.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!name || !phone) {
        showSuccessModal("Пожалуйста, заполните все поля");
        return;
      }

      const message = `📝 Новая заявка с сайта:\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          nameInput.value = '';
          phoneInput.value = '';
          modal.style.display = 'flex';
        } else {
          alert('Ошибка при отправке!');
          console.error(data);
        }
      })
      .catch(err => {
        alert('Ошибка соединения с Telegram');
        console.error(err);
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // --- Услуги (выбор) ---
  const serviceModal = document.getElementById('service-modal');
  const modalTitle = document.getElementById('modal-service-name');
  const modalPrice = document.getElementById('modal-price');
  const nameInput2 = document.getElementById('client-name');
  const phoneInput2 = document.getElementById('client-phone');
  const dateInput = document.getElementById('client-date');
  const closeModal = document.getElementById('close-service-modal');
  const sendServiceBtn = document.getElementById('submit-service-order');

  const servicesList = [
    { name: "Установка ОС", price: "3 000 – 5 000 ₸" },
    { name: "Ремонт ноутбука", price: "4 000 – 15 000 ₸" },
    { name: "Интернет и сети", price: "3 000 – 6 000 ₸" },
    { name: "Восстановление данных", price: "6 000 – 20 000 ₸" },
    { name: "Апгрейд компьютера", price: "3 500 – 7 000 ₸ + комплектующие" },
    { name: "Ремонт компьютеров", price: "4 500 – 10 000 ₸" },
  ];

  let currentService = 0;

  function updateServiceModal(index) {
    const service = servicesList[index];
    modalTitle.textContent = service.name;
    modalPrice.textContent = service.price;
  }

  document.querySelectorAll('.service-card .btn-main').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      currentService = i;
      updateServiceModal(i);
      serviceModal.classList.add('show');
    });
  });

  document.getElementById('prev-service')?.addEventListener('click', () => {
    currentService = (currentService - 1 + servicesList.length) % servicesList.length;
    updateServiceModal(currentService);
  });

  document.getElementById('next-service')?.addEventListener('click', () => {
    currentService = (currentService + 1) % servicesList.length;
    updateServiceModal(currentService);
  });

  closeModal?.addEventListener('click', () => {
    serviceModal.classList.remove('show');
  });

  sendServiceBtn?.addEventListener('click', () => {
    const name = nameInput2.value.trim();
    const phone = phoneInput2.value.trim();
    const date = dateInput.value;

    if (!name || !phone || !date) {
      showSuccessModal("Пожалуйста, заполните все поля");
      return;
    }

    const message = `🛠️ Заказ услуги:\n📌 ${servicesList[currentService].name}\n💵 ${servicesList[currentService].price}\n👤 Имя: ${name}\n📞 Тел: ${phone}\n📅 Дата: ${date}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    }).then(res => res.json())
      .then(data => {
        if (data.ok) {
          serviceModal.classList.remove('show');
          nameInput2.value = '';
          phoneInput2.value = '';
          dateInput.value = '';
          showSuccessModal("Заявка на услугу отправлена!");
        } else {
          alert("Ошибка при отправке");
        }
      })
      .catch(err => {
        alert("Ошибка соединения с Telegram");
        console.error(err);
      });
  });

  function showSuccessModal(text) {
    const modal = document.getElementById('modal');
    const modalText = modal.querySelector('.modal__content p');
    modalText.textContent = text;
    modal.style.display = 'flex';
  }

  // --- Корзина (модальное окно) ---
  function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');

    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      const price = parseInt(item.discount.replace(/[^\d]/g, '')) || parseInt(item.regular.replace(/[^\d]/g, '')) || 0;
      const quantity = item.quantity || 1;
      total += price * quantity;
      count += quantity;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <span>${item.title}</span>
        <div class="quantity-controls">
          <button data-index="${index}" class="quantity-minus">-</button>
          <span>${quantity}</span>
          <button data-index="${index}" class="quantity-plus">+</button>
        </div>
        <span>${(price * quantity).toLocaleString()} ₸</span>
        <button data-index="${index}" class="btn-main cart-remove">Удалить</button>
      `;
      cartItems.appendChild(div);
    });

    cartTotal.textContent = `${total.toLocaleString()} ₸`;
    cartCount.textContent = count;
  }

  function clearForm() {
    document.getElementById('cart-name').value = '';
    document.getElementById('cart-phone').value = '';
    document.getElementById('cart-address').value = '';
    document.getElementById('cart-date').value = '';
    document.getElementById('cart-payment').value = '';
  }

  document.querySelectorAll('.card__btn, .add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.blocks__item') || btn.closest('.product-page');
      if (!card) return;

      const product = {
        title: card.querySelector('#product-title, .card__title')?.textContent.trim(),
        image: card.querySelector('#product-img, img')?.getAttribute('src'),
        discount: card.querySelector('#price-discount, .card__price--discount .price-value')?.textContent || '',
        regular: card.querySelector('#price-regular, .card__price--common .price-value')?.textContent || '',
        quantity: 1
      };

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.title === product.title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
  });

  const cartModal = document.getElementById('cart-modal');
  const cartToggle = document.querySelector('.cart-toggle');
  const cartClose = document.getElementById('cart-close');

  if (cartToggle) {
    cartToggle.addEventListener('click', () => {
      cartModal.style.display = 'flex';
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        const errorModal = document.getElementById('order-error-modal');
        const errorMessage = document.getElementById('order-error-message');
        if (errorModal && errorMessage) {
          errorMessage.textContent = 'Товара в корзине нет';
          errorModal.style.display = 'flex';
        }
      } else {
        updateCart();
      }
    });
  }

  if (cartClose) {
    cartClose.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-remove')) {
      const index = e.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
    if (e.target.classList.contains('quantity-plus')) {
      const index = e.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart[index].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
    if (e.target.classList.contains('quantity-minus')) {
      const index = e.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      }
    }
  });

  document.getElementById('cart-checkout')?.addEventListener('click', () => {
    const name = document.getElementById('cart-name')?.value.trim();
    const phone = document.getElementById('cart-phone')?.value.trim();
    const address = document.getElementById('cart-address')?.value.trim();
    const date = document.getElementById('cart-date')?.value;
    const payment = document.getElementById('cart-payment')?.value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = document.getElementById('cart-total')?.textContent.replace(/[^\d]/g, '');

    if (!name || !phone || !address || !date || !payment || cart.length === 0) {
      const errorModal = document.getElementById('order-error-modal');
      const errorMessage = document.getElementById('order-error-message');
      if (errorModal && errorMessage) {
        errorMessage.textContent = 'Пожалуйста, заполните все поля и добавьте товары в корзину';
        errorModal.style.display = 'flex';
      }
      return;
    }

    const itemsList = cart.map(item => `${item.title} (x${item.quantity}) - ${(parseInt(item.discount.replace(/[^\d]/g, '')) || parseInt(item.regular.replace(/[^\d]/g, '')) * item.quantity).toLocaleString()} ₸`).join('\n');
    const message = `🛒 Заказ из корзины:\n\n${itemsList}\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🏠 Адрес: ${address}\n📅 Дата: ${date}\n💳 Способ оплаты: ${payment}\n💰 Итого: ${total} ₸`;

    const token = '7741799681:AAF5Flgim2zMDNenNvgfeCmm7CTSZLG8T4A'; // Твой токен
    const chatId = 718531554; // Твой chatId

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        const successModal = document.getElementById('order-success-modal');
        if (successModal) successModal.style.display = 'flex';
        localStorage.removeItem('cart'); // Очищаем корзину
        clearForm(); // Очищаем поля формы
        updateCart();
        cartModal.style.display = 'none'; // Закрываем окно корзины
      } else {
        alert('Ошибка при отправке заказа');
        console.error(data);
      }
    })
    .catch(err => {
      alert('Ошибка соединения с Telegram');
      console.error(err);
    });
  });

  const orderErrorClose = document.getElementById('order-error-close');
  if (orderErrorClose) {
    orderErrorClose.addEventListener('click', () => {
      const errorModal = document.getElementById('order-error-modal');
      if (errorModal) errorModal.style.display = 'none';
    });
  }

  const orderSuccessClose = document.getElementById('order-success-close');
  if (orderSuccessClose) {
    orderSuccessClose.addEventListener('click', () => {
      const successModal = document.getElementById('order-success-modal');
      if (successModal) successModal.style.display = 'none';
    });
  }

  // // Проверка локального сервера
  // const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
  // const localServerModal = document.getElementById('local-server-modal');
  // const localServerClose = document.getElementById('local-server-close');
  // const localServerOk = document.getElementById('local-server-ok');

  // if (isLocal && localServerModal) {
  //   localServerModal.style.display = 'flex';
  // }

  // if (localServerClose) {
  //   localServerClose.addEventListener('click', () => {
  //     if (localServerModal) localServerModal.style.display = 'none';
  //   });
  // }

  // if (localServerOk) {
  //   localServerOk.addEventListener('click', () => {
  //     if (localServerModal) localServerModal.style.display = 'none';
  //   });
  // }

  // --- Переход на product.html ---
  document.querySelectorAll('.card__title').forEach(title => {
    title.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Clicked on title:', title.textContent);

      const card = title.closest('.blocks__item');
      if (!card) {
        console.error('Parent .blocks__item not found');
        return;
      }

      const product = {
        title: title.textContent.trim(),
        image: card.querySelector('img')?.getAttribute('src'),
        discount: card.querySelector('.card__price--discount .price-value')?.textContent || '',
        regular: card.querySelector('.card__price--common .price-value')?.textContent || '',
        attributes: { ...card.dataset }
      };

      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'product.html';
    });
  });

  // --- Отображение товара на product.html ---
  if (window.location.href.includes('product.html')) {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!product) {
      console.error('No product data in localStorage');
      return;
    }

    document.getElementById('product-img').src = product.image;
    document.getElementById('product-img').alt = product.title;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('price-discount').textContent = product.discount;
    document.getElementById('price-regular').textContent = product.regular;

    const breadcrumb = document.getElementById('breadcrumb-title');
    if (breadcrumb) {
      breadcrumb.textContent = product.title;
    }

    const attrList = document.getElementById('product-attributes');
    attrList.innerHTML = '';
    for (let key in product.attributes) {
      const li = document.createElement('li');
      li.textContent = `${labels[key] || key}: ${product.attributes[key]}`;
      attrList.appendChild(li);
    }
  }
});

// Инициализация Яндекс.Карты
ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    center: [50.026382, 82.730104], 
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark(
    [50.026382, 82.730104], 
    {
      balloonContent: 'ул. Багдат Шаяхметов, 17'
    },
    {
      preset: 'islands#orangeIcon', 
      iconColor: '#ff6600'          
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.geoObjects.add(myPlacemark);
  myPlacemark.balloon.open();
});