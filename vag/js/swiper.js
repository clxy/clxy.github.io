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

new Swiper("#va .swiper", {
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

var supportSwiper = new Swiper(".support-swiper", {
  autoHeight: false,
  initialSlide: 1,
  // loop: true,
  // loopAdditionalSlides: 1,
  // speed: 1000,
  // autoplay: {
  //   delay: 4000,
  //   disableOnInteraction: false,
  // },
  slidesPerView: 5,
  spaceBetween: 10,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // breakpoints: {
  //   768: {
  //     initialSlide: 1,
  //     slidesPerView: 8,
  //   },
  //   1200: {
  //     initialSlide: 3,
  //     slidesPerView: 10,
  //   },
  // },
});