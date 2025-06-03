document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('catalog.html')) {
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
});

// бургер меню
document.querySelectorAll('.header__nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu-toggle').checked = false;
  });
});