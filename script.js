function setLanguage(language) {

    const elements = document.querySelectorAll("[data-fr][data-ar]");

    elements.forEach(function(element) {

        if (language === "ar") {
            element.textContent = element.getAttribute("data-ar");
        } else {
            element.textContent = element.getAttribute("data-fr");
        }

    });

    if (language === "ar") {
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.lang = "fr";
        document.documentElement.dir = "ltr";
    }
}


function toggleMenu() {

    const nav = document.querySelector("nav");
    const menuButton = document.querySelector(".menu-toggle");

    nav.classList.toggle("menu-open");

    if (nav.classList.contains("menu-open")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }

}


document.querySelectorAll("nav a").forEach(function(link) {

    link.addEventListener("click", function() {

        const nav = document.querySelector("nav");
        const menuButton = document.querySelector(".menu-toggle");

        nav.classList.remove("menu-open");
        menuButton.textContent = "☰";

    });

});
/* ================================
   HERO SLIDER
================================ */

const slides = document.querySelectorAll(".hero-slide");
const nextButton = document.querySelector(".slider-next");
const prevButton = document.querySelector(".slider-prev");
const dots = document.querySelectorAll(".slider-dot");

let currentSlide = 0;
let sliderTimer;


/* عرض الصورة */
function showSlide(index) {

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove("active");
    }

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}


/* الصورة التالية */
function nextSlide() {
    showSlide(currentSlide + 1);
}


/* الصورة السابقة */
function previousSlide() {
    showSlide(currentSlide - 1);
}


/* التشغيل التلقائي */
function startSlider() {

    sliderTimer = setInterval(() => {
        nextSlide();
    }, 4000);

}


/* إعادة تشغيل المؤقت */
function resetSlider() {

    clearInterval(sliderTimer);
    startSlider();

}


/* سهم اليمين */
if (nextButton) {

    nextButton.addEventListener("click", function() {

        nextSlide();
        resetSlider();

    });

}


/* سهم اليسار */
if (prevButton) {

    prevButton.addEventListener("click", function() {

        previousSlide();
        resetSlider();

    });

}


/* الضغط على النقاط */
dots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showSlide(index);
        resetSlider();

    });

});


/* تشغيل السلايدر */
startSlider();