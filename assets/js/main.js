// === Hero Slider ===
const heroSwiper = new Swiper(".hero-swiper", {
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

// === وقتی صفحه کاملاً لود شد ===
document.addEventListener("DOMContentLoaded", function () {

  // === Amazing Slider ===
  const amazingSwiperUnique = new Swiper(".amazingSwiperUnique", {
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

  // === Countdown Timer ===
  const endTime = new Date().getTime() + 6 * 60 * 60 * 1000;

  function updateTimer() {
    const now = new Date().getTime();
    const diff = endTime - now;

    const timerEl = document.querySelector(".timer-content");
    if (!timerEl) return;

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

  // === Product Slider ===
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 25,
    loop: false,
    speed: 700,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.3 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  });

(function () {
  const buttons = document.querySelectorAll(".bm-filter-btn");
  const cards = Array.from(document.querySelectorAll(".bm-product-card"));

  function showFilteredCards(category) {
    let filtered = category
      ? cards.filter((card) => card.getAttribute("data-cat") === category)
      : cards;

    cards.forEach((card) => (card.parentElement.style.display = "none"));

    filtered.slice(0, 4).forEach((card) => {
      card.parentElement.style.display = "";
    });
  }

  showFilteredCards();

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      buttons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-filter");
      showFilteredCards(category);
    });
  });
})();
});
