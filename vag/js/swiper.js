
const swiper = new Swiper(".intro-swiper", {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  effect: "coverflow",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },

  // ↓效果很怪！
  // effect: "fade",
  // spaceBetween: 30,
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },

})