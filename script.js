var mainSwiper = new Swiper(".mySwiper", {
    pagination: { el: ".swiper-pagination" },
    autoplay: { delay: 3000, disableOnInteraction: false },
    grabCursor: true
});

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

const galleryImages = Array.from(document.querySelectorAll('.swiper-slide img, .produk-grid img'));
let fullscreenSwiper;

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        const wrapper = document.getElementById('fullscreenWrapper');
        wrapper.innerHTML = "";
        galleryImages.forEach(g => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img src="${g.src}" alt="">`;
            wrapper.appendChild(slide);
        });
        document.getElementById('fullscreen').style.display = 'flex';
        fullscreenSwiper = new Swiper(".fullscreenSwiper", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            initialSlide: index
        });
    });
});

function backToProduk() {
    document.getElementById('fullscreen').style.display = 'none';
    scrollToSection('produk');
}