    const cards = document.querySelectorAll('.card');
    const filterBtns = document.querySelectorAll('.filters button');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const closeBtn = document.getElementById('closeBtn');

    let currentIndex = 0;

    // ---------------- FILTERING ------------------
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });


    // ---------------- LIGHTBOX ------------------
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = 'flex';
      });
    });

    function showImage() {
      const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
      const img = visibleCards[currentIndex].querySelector('img').src;
      lightboxImg.src = img;
    }

    prevBtn.onclick = () => {
      const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
      currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
      showImage();
    };

    nextBtn.onclick = () => {
      const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
      currentIndex = (currentIndex + 1) % visibleCards.length;
      showImage();
    };

    closeBtn.onclick = () => lightbox.style.display = 'none';


    // ---------------- FILTER EFFECTS ------------------
    const filterType = document.getElementById('filterType');
    const filterRange = document.getElementById('filterRange');

    function applyImageFilter() {
      const type = filterType.value;
      const intensity = filterRange.value / 100;

      let filterValue = 'none';

      if (type === 'grayscale') filterValue = `grayscale(${intensity})`;
      if (type === 'sepia') filterValue = `sepia(${intensity})`;
      if (type === 'contrast') filterValue = `contrast(${1 + intensity * 2})`;

      document.documentElement.style.setProperty('--filter-type', filterValue);
    }

    filterType.addEventListener('change', applyImageFilter);
    filterRange.addEventListener('input', applyImageFilter);