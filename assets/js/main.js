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


document.addEventListener("DOMContentLoaded", function () {

  // === Swiper Config ===
  const amazingSwiperUnique = new Swiper(".amazingSwiperUnique", {
    slidesPerView: 3,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-nav.next",
      prevEl: ".swiper-nav.prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  });

  // === Countdown Timer ===
  const endTime = new Date().getTime() + 6 * 60 * 60 * 1000;

  function updateTimer() {
    const now = new Date().getTime();
    const diff = endTime - now;

    if (diff <= 0) {
      document.querySelector(".timer-content").innerHTML = "پیشنهاد به پایان رسید";
      clearInterval(timerInterval);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    document.querySelector(".timer-content").innerHTML = `
      <div class="time">${hours.toString().padStart(2,"0")} <br> ساعت</div>
      <span>:</span>
      <div class="time">${mins.toString().padStart(2,"0")} <br> دقیقه</div>
      <span>:</span>
      <div class="time">${secs.toString().padStart(2,"0")} <br> ثانیه</div>
    `;
  }

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

});
