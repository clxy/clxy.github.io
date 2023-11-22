
const introSwiper = new Swiper(".intro-swiper", {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 20,
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
  effect: "coverflow",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
})

var newsSwiper = new Swiper(".news-swiper", {
  // loop: true,
  loopAdditionalSlides: 1,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  slidesPerView: 2,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
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