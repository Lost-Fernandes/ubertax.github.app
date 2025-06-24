
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigator: {
        nexEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
  });

let header = document.getElementById('header')
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        header.style.background = '#191919' 
    } else {
        header.style.background = 'transparent'

    }
})

window.onload = function() {
    setTimeout(function() {
        document.querySelector('.PopUpZap2').className = 'PopUpZap';
    }, 5000); // 5000 milissegundos equivalem a 5 segundos
  };