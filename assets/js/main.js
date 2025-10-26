// === Hero Slider ===
document.addEventListener("DOMContentLoaded", function () {

  const heroSwiperEl = document.querySelector(".hero-swiper");
  if (heroSwiperEl) {
    new Swiper(".hero-swiper", {
      loop: true,
      effect: "fade",
      speed: 1200,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".hero-section .swiper-pagination",
        clickable: true,
      },
    });
  }

  // === Amazing Slider ===
  const amazingSwiperEl = document.querySelector(".amazingSwiperUnique");
  if (amazingSwiperEl) {
    new Swiper(".amazingSwiperUnique", {
      slidesPerView: 3,
      spaceBetween: 20,
      slidesPerGroup: 1,
      loop: false,
      speed: 800,
      navigation: {
        nextEl: ".swiper-nav.next",
        prevEl: ".swiper-nav.prev",
      },
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
      },
    });
  }

  // === Countdown Timer ===
  const timerEl = document.querySelector(".timer-content");
  if (timerEl) {
    const endTime = new Date().getTime() + 6 * 60 * 60 * 1000;

    function updateTimer() {
      const now = new Date().getTime();
      const diff = endTime - now;

      if (diff <= 0) {
        timerEl.innerHTML = "پیشنهاد به پایان رسید";
        clearInterval(timerInterval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      timerEl.innerHTML = `
        <div class="time">${hours.toString().padStart(2, "0")} <br> ساعت</div>
        <span>:</span>
        <div class="time">${mins.toString().padStart(2, "0")} <br> دقیقه</div>
        <span>:</span>
        <div class="time">${secs.toString().padStart(2, "0")} <br> ثانیه</div>
      `;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
  }

// === Product Slider ===
const productSwiperEl = document.querySelector(".mySwiper");
if (productSwiperEl) {
  new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 25,
    loop: false,
    speed: 700,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 10 },
      500: { slidesPerView: 2, spaceBetween: 15 },
      1000: { slidesPerView: 4, spaceBetween: 25 },
    },
  });
}

// === Product Filter (bm-filter-btn) ===
(function () {
  const buttons = document.querySelectorAll(".bm-filter-btn");
  const cards = Array.from(document.querySelectorAll(".bm-product-card"));
  if (!buttons.length || !cards.length) return;

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width < 500) return 1;
    if (width < 1000) return 2;
    return 4;
  }

  function showFilteredCards(category) {
    const filtered = category
      ? cards.filter((card) => card.getAttribute("data-cat") === category)
      : cards;

    const visibleCount = getVisibleCount();

    cards.forEach((card) => (card.parentElement.style.display = "none"));
    filtered.slice(0, visibleCount).forEach((card) => {
      card.parentElement.style.display = "";
    });
  }

  showFilteredCards();

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      buttons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      showFilteredCards(this.getAttribute("data-filter"));
    });
  });

  window.addEventListener("resize", () => showFilteredCards(document.querySelector(".bm-filter-btn.active")?.getAttribute("data-filter")));
})();


// === Favorite Filter (fav-filter-btn) ===
(function () {
  const favButtons = document.querySelectorAll(".fav-filter-btn");
  const favCards = Array.from(document.querySelectorAll(".fav-card"));
  if (!favButtons.length || !favCards.length) return;

  // تعیین تعداد کارت‌ها بر اساس عرض صفحه
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width < 500) return 1;
    if (width < 1000) return 2;
    return 4;
  }

  function showFavCards(category) {
    const filtered = category
      ? favCards.filter((card) => card.getAttribute("data-cat") === category)
      : favCards;

    const visibleCount = getVisibleCount();

    favCards.forEach((card) => {
      card.parentElement.style.display = "none";
      card.classList.remove("fade-in");
    });

    filtered.slice(0, visibleCount).forEach((card) => {
      card.parentElement.style.display = "";
      setTimeout(() => card.classList.add("fade-in"), 50);
    });
  }

  showFavCards();

  favButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      favButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      showFavCards(this.getAttribute("data-filter"));
    });
  });

  window.addEventListener("resize", () => {
    const activeCategory =
      document.querySelector(".fav-filter-btn.active")?.getAttribute("data-filter");
    showFavCards(activeCategory);
  });
})();

  // === Back to Top Button ===
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });
  }

  // === Main Categories Hover ===
  const mainCategories = document.querySelectorAll(".main-categories li");
  const subCategories = document.querySelectorAll(".sub-category");
  if (mainCategories.length && subCategories.length) {
    mainCategories.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        mainCategories.forEach((li) => li.classList.remove("active"));
        subCategories.forEach((sub) => sub.classList.remove("active"));

        item.classList.add("active");
        const target = document.getElementById(item.dataset.target);
        if (target) target.classList.add("active");
      });
    });
  }
});


const openDrawer = document.getElementById('openDrawer');
const closeDrawer = document.getElementById('closeDrawer');
const mobileDrawer = document.getElementById('mobileDrawer');

openDrawer.addEventListener('click', () => {
  mobileDrawer.classList.add('active');
});

closeDrawer.addEventListener('click', () => {
  mobileDrawer.classList.remove('active');
});

document.querySelectorAll('.has-submenu').forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    const subDrawer = document.getElementById(targetId);
    if(subDrawer){
      subDrawer.classList.add('active');
    }
  });
});

document.querySelectorAll('.back-icon').forEach(back => {
  back.addEventListener('click', () => {
    const parent = back.closest('.mobile-drawer');
    parent.classList.remove('active');
    const backTarget = back.getAttribute('data-back');
    if(backTarget){
      document.getElementById(backTarget).classList.add('active');
    }
  });
});
