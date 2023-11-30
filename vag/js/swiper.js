new Swiper(".intro-swiper", {
  grabCursor: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 2
  },

  loop: true,
  loopAdditionalSlides: 1,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  slidesPerView: 1,
})

new Swiper("#va .swiper, #design .swiper", {
  grabCursor: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // loop: true,
  // loopAdditionalSlides: 1,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  slidesPerView: 1,
  spaceBetween: 10,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1200: {
      slidesPerView: 2,
    },
  },
});
