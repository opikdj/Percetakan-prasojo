// Slideshow otomatis
let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}
showSlides();

// Toggle mobile menu
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

// Tutup menu saat klik link di mobile
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetID = link.getAttribute("href").substring(1);
    document.getElementById(targetID)?.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 768) {
      document.querySelector(".nav-links").classList.remove("show");
    }
  });
});

// LIGHTBOX
const productImages = document.querySelectorAll(".product-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let currentImgIndex = 0;

productImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentImgIndex = index;
    showLightbox();
  });
});

function showLightbox() {
  lightboxImg.src = productImages[currentImgIndex].src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function changeLightbox(n) {
  currentImgIndex += n;
  if (currentImgIndex < 0) currentImgIndex = productImages.length - 1;
  if (currentImgIndex >= productImages.length) currentImgIndex = 0;
  showLightbox();
}

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// Swipe untuk lightbox (lebih tidak sensitif)
let startX = 0, endX = 0;
const swipeThreshold = 80; // minimal jarak geser agar gambar berganti

lightboxImg.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  endX = startX;
});

lightboxImg.addEventListener("touchmove", e => {
  endX = e.touches[0].clientX;
});

lightboxImg.addEventListener("touchend", () => {
  let swipeDistance = endX - startX;
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) changeLightbox(-1);
    else changeLightbox(1);
  }
  startX = endX = 0;
});

// Tutup lightbox dengan ESC
document.addEventListener('keydown', e => {
  if (e.key === "Escape") closeLightbox();
});