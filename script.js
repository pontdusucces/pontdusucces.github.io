
/* =========================================
   LANGUAGE SWITCHER
========================================= */

function setLanguage(language) {
    const selectedLanguage = language === "ar" ? "ar" : "fr";
    localStorage.setItem("siteLanguage", selectedLanguage);
    document.querySelectorAll("[data-fr][data-ar]").forEach(function (element) {
        const translatedText = element.getAttribute(
            selectedLanguage === "ar" ? "data-ar" : "data-fr"
        );

        if (translatedText !== null && element.children.length === 0) {
            element.textContent = translatedText;
        }
    });

    document.documentElement.lang = selectedLanguage;
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
const isFormationPage = window.location.pathname
    .toLowerCase()
    .endsWith("formation-insertion.html");

if (isFormationPage) {
    document.title = language === "ar"
        ? "التكوين والإدماج | جمعية جسر النجاح"
        : "Formation & Insertion | Association Pont du Succès";
} else {
    document.title = language === "ar"
        ? "جمعية جسر النجاح | تطوان"
        : "Association Pont du Succès | Tétouan";
}
    updateActualiteMoreButtons();
}


/* =========================================
   ACTUALITES - TRADUCTION DES BOUTONS
========================================= */


function updateActualiteMoreButtons() {
    const language = document.documentElement.lang || "fr";
    const moreText = language === "ar" ? "اقرأ المزيد" : "Lire la suite";

    document.querySelectorAll(
        ".actualite-more-btn, .e2c-more-btn, .partenariat-more-btn, .oim-more-btn"
    ).forEach(function (button) {
        button.textContent = moreText;
    });
}



/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {
    const nav = document.querySelector("nav");
    const menuButton = document.querySelector(".menu-toggle");

    if (!nav || !menuButton) return;

    nav.classList.toggle("menu-open");

    menuButton.textContent =
        nav.classList.contains("menu-open") ? "✕" : "☰";
}

document.querySelectorAll("nav a").forEach(function (link) {
    link.addEventListener("click", function () {
        const nav = document.querySelector("nav");
        const menuButton = document.querySelector(".menu-toggle");

        if (nav) nav.classList.remove("menu-open");
        if (menuButton) menuButton.textContent = "☰";
    });
});


/* =========================================
   HERO SLIDER
========================================= */

const slides = document.querySelectorAll(".hero-slide");
const nextButton = document.querySelector(".slider-next");
const prevButton = document.querySelector(".slider-prev");
const sliderDots = document.querySelectorAll(".slider-dot");

let currentSlide = 0;
let sliderTimer = null;

function showSlide(index) {
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove("active");

    if (sliderDots[currentSlide]) {
        sliderDots[currentSlide].classList.remove("active");
    }

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (sliderDots[currentSlide]) {
        sliderDots[currentSlide].classList.add("active");
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function startSlider() {
    if (slides.length <= 1) return;

    clearInterval(sliderTimer);

    sliderTimer = setInterval(function () {
        nextSlide();
    }, 4000);
}

function resetSlider() {
    startSlider();
}

if (nextButton) {
    nextButton.addEventListener("click", function () {
        nextSlide();
        resetSlider();
    });
}

if (prevButton) {
    prevButton.addEventListener("click", function () {
        previousSlide();
        resetSlider();
    });
}

sliderDots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        showSlide(index);
        resetSlider();
    });
});

startSlider();


/* =========================================
   ACTUALITE 1 - CENTRE TABOULA
========================================= */

const taboulaModal = document.getElementById("taboula-modal");
const taboulaImage = document.getElementById("taboula-gallery-image");

const taboulaImages = [
    "images/actualite-taboula-1.jpeg",
    "images/actualite-taboula-2.jpeg",
    "images/actualite-taboula-3.jpeg",
    "images/actualite-taboula-4.jpeg",
    "images/actualite-taboula-5.jpeg",
    "images/actualite-taboula-6.jpeg"
];

let taboulaCurrentImage = 0;


/* Ouvrir la fenêtre Taboula */

document.querySelectorAll(".actualite-more-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        if (!taboulaModal) return;

        taboulaModal.classList.add("active");
        taboulaModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        taboulaCurrentImage = 0;
        showTaboulaImage();
    });
});


/* Afficher les images Taboula */

function showTaboulaImage() {
    if (!taboulaImage) return;

    taboulaImage.src = taboulaImages[taboulaCurrentImage];

    const dotsContainer = document.querySelector(".taboula-gallery-dots");

    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    taboulaImages.forEach(function (image, index) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "taboula-dot";

        if (index === taboulaCurrentImage) {
            dot.classList.add("active");
        }

        dot.setAttribute("aria-label", "Image " + (index + 1));

        dot.addEventListener("click", function () {
            taboulaCurrentImage = index;
            showTaboulaImage();
        });

        dotsContainer.appendChild(dot);
    });
}


/* Image suivante Taboula */

const taboulaNext = document.querySelector(".taboula-next");

if (taboulaNext) {
    taboulaNext.addEventListener("click", function () {
        taboulaCurrentImage =
            (taboulaCurrentImage + 1) % taboulaImages.length;

        showTaboulaImage();
    });
}


/* Image précédente Taboula */

const taboulaPrev = document.querySelector(".taboula-prev");

if (taboulaPrev) {
    taboulaPrev.addEventListener("click", function () {
        taboulaCurrentImage =
            (taboulaCurrentImage - 1 + taboulaImages.length) %
            taboulaImages.length;

        showTaboulaImage();
    });
}


/* Fermer la fenêtre Taboula */

function closeTaboulaModal() {
    if (!taboulaModal) return;

    taboulaModal.classList.remove("active");
    taboulaModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

if (taboulaModal) {
    const closeTaboulaButton =
        taboulaModal.querySelector(".actualite-modal-close");

    if (closeTaboulaButton) {
        closeTaboulaButton.addEventListener("click", closeTaboulaModal);
    }

    taboulaModal.addEventListener("click", function (event) {
        if (event.target === taboulaModal) {
            closeTaboulaModal();
        }
    });
}


/* =========================================
   ACTUALITE 2 - FORMATION E2C_NG
========================================= */

const e2cModal = document.getElementById("e2c-modal");
const e2cImage = document.getElementById("e2c-gallery-image");

const e2cImages = [
    "images/formation-e2c-1.jfif",
    "images/formation-e2c-2.jfif",
    "images/formation-e2c-3.jfif",
    "images/formation-e2c-4.jfif"
];

let e2cCurrentImage = 0;


/* Ouvrir la fenêtre E2C */

document.querySelectorAll(".e2c-more-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        if (!e2cModal) return;

        e2cModal.classList.add("active");
        e2cModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        e2cCurrentImage = 0;
        showE2CImage();
    });
});


/* Afficher les images E2C */

function showE2CImage() {
    if (!e2cImage) return;

    e2cImage.src = e2cImages[e2cCurrentImage];

    const dotsContainer = document.querySelector(".e2c-gallery-dots");

    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    e2cImages.forEach(function (image, index) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "taboula-dot";

        if (index === e2cCurrentImage) {
            dot.classList.add("active");
        }

        dot.setAttribute("aria-label", "Image " + (index + 1));

        dot.addEventListener("click", function () {
            e2cCurrentImage = index;
            showE2CImage();
        });

        dotsContainer.appendChild(dot);
    });
}


/* Image suivante E2C */

const e2cNext = document.querySelector(".e2c-next");

if (e2cNext) {
    e2cNext.addEventListener("click", function () {
        e2cCurrentImage =
            (e2cCurrentImage + 1) % e2cImages.length;

        showE2CImage();
    });
}


/* Image précédente E2C */

const e2cPrev = document.querySelector(".e2c-prev");

if (e2cPrev) {
    e2cPrev.addEventListener("click", function () {
        e2cCurrentImage =
            (e2cCurrentImage - 1 + e2cImages.length) %
            e2cImages.length;

        showE2CImage();
    });
}


/* Fermer la fenêtre E2C */

function closeE2CModal() {
    if (!e2cModal) return;

    e2cModal.classList.remove("active");
    e2cModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

if (e2cModal) {
    const e2cCloseButton =
        e2cModal.querySelector(".actualite-modal-close");

    if (e2cCloseButton) {
        e2cCloseButton.addEventListener("click", closeE2CModal);
    }

    e2cModal.addEventListener("click", function (event) {
        if (event.target === e2cModal) {
            closeE2CModal();
        }
    });
}


/* =========================================
   FERMER LES FENETRES AVEC ESCAPE
========================================= */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeTaboulaModal();
        closeE2CModal();
        closePartenariatModal();
        closeOimModal();
    }

});


/* =========================================
   ACTUALITE 3 - PARTENARIAT
========================================= */

const partenariatModal = document.getElementById("partenariat-modal");
const partenariatImage = document.getElementById("partenariat-gallery-image");

const partenariatImages = [
    "images/partenariat-cooperation-1.jpeg",
    "images/partenariat-cooperation-2.jpeg",
    "images/partenariat-cooperation-3.jpeg",
    "images/partenariat-cooperation-4.jpeg",
    "images/partenariat-cooperation-5.jpeg",
    "images/partenariat-cooperation-6.jpeg"
];
let partenariatCurrentImage = 0;

// Ouvrir la fenêtre partenariat
document.querySelectorAll(".partenariat-more-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        if (!partenariatModal) return;

        partenariatModal.classList.add("active");
        partenariatModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        partenariatCurrentImage = 0;
        showPartenariatImage();
    });
});

// Afficher les images
function showPartenariatImage() {
    if (!partenariatImage) return;

    partenariatImage.src = partenariatImages[partenariatCurrentImage];

    const dotsContainer = document.querySelector(".partenariat-gallery-dots");
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    partenariatImages.forEach(function (image, index) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "taboula-dot";

        if (index === partenariatCurrentImage) {
            dot.classList.add("active");
        }

        dot.setAttribute("aria-label", "Image " + (index + 1));

        dot.addEventListener("click", function () {
            partenariatCurrentImage = index;
            showPartenariatImage();
        });

        dotsContainer.appendChild(dot);
    });
}

// Image suivante
const partenariatNext = document.querySelector(".partenariat-next");

if (partenariatNext) {
    partenariatNext.addEventListener("click", function () {
        partenariatCurrentImage =
            (partenariatCurrentImage + 1) % partenariatImages.length;

        showPartenariatImage();
    });
}

// Image précédente
const partenariatPrev = document.querySelector(".partenariat-prev");

if (partenariatPrev) {
    partenariatPrev.addEventListener("click", function () {
        partenariatCurrentImage =
            (partenariatCurrentImage - 1 + partenariatImages.length) %
            partenariatImages.length;

        showPartenariatImage();
    });
}

// Fermer la fenêtre partenariat
function closePartenariatModal() {
    if (!partenariatModal) return;

    partenariatModal.classList.remove("active");
    partenariatModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (partenariatModal) {
    const partenariatCloseButton =
        partenariatModal.querySelector(".actualite-modal-close");

    if (partenariatCloseButton) {
        partenariatCloseButton.addEventListener("click", closePartenariatModal);
    }

    partenariatModal.addEventListener("click", function (event) {
        if (event.target === partenariatModal) {
            closePartenariatModal();
        }
    });
}


/* =========================================
   ACTUALITE 4 - VISITE OIM
========================================= */

const oimModal = document.getElementById("oim-modal");
const oimImage = document.getElementById("oim-gallery-image");

const oimImages = [
    "images/oim-visite-1.jpeg",
    "images/oim-visite-2.jpeg",
    "images/oim-visite-3.jpeg"
];

let oimCurrentImage = 0;

// Ouvrir la fenêtre OIM
document.querySelectorAll(".oim-more-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        if (!oimModal) return;

        oimModal.classList.add("active");
        oimModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        oimCurrentImage = 0;
        showOimImage();
    });
});

// Afficher les images
function showOimImage() {
    if (!oimImage) return;

    oimImage.src = oimImages[oimCurrentImage];

    const dotsContainer =
        document.querySelector(".oim-gallery-dots");

    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    oimImages.forEach(function (image, index) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "taboula-dot";

        if (index === oimCurrentImage) {
            dot.classList.add("active");
        }

        dot.setAttribute("aria-label", "Image " + (index + 1));

        dot.addEventListener("click", function () {
            oimCurrentImage = index;
            showOimImage();
        });

        dotsContainer.appendChild(dot);
    });
}

// Image suivante
const oimNext = document.querySelector(".oim-next");

if (oimNext) {
    oimNext.addEventListener("click", function () {
        oimCurrentImage =
            (oimCurrentImage + 1) % oimImages.length;

        showOimImage();
    });
}

// Image précédente
const oimPrev = document.querySelector(".oim-prev");

if (oimPrev) {
    oimPrev.addEventListener("click", function () {
        oimCurrentImage =
            (oimCurrentImage - 1 + oimImages.length) %
            oimImages.length;

        showOimImage();
    });
}

// Fermer la fenêtre OIM
function closeOimModal() {
    if (!oimModal) return;

    oimModal.classList.remove("active");
    oimModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (oimModal) {
    const oimCloseButton =
        oimModal.querySelector(".actualite-modal-close");

    if (oimCloseButton) {
        oimCloseButton.addEventListener("click", closeOimModal);
    }

    oimModal.addEventListener("click", function (event) {
        if (event.target === oimModal) {
            closeOimModal();
        }
    });
}


/* =========================================
   INITIALISATION
========================================= */

// Restaurer la dernière langue choisie
const savedLanguage = localStorage.getItem("siteLanguage") || "fr";
setLanguage(savedLanguage);


/* =========================================
   ACTUALITES - NEWS MARQUEE
========================================= */

const newsContainer = document.querySelector(
    "#actualites .actualites-container"
);

if (newsContainer && !newsContainer.dataset.marqueeReady) {

    const originalCards = Array.from(newsContainer.children)
        .filter(card => card.classList.contains("actualite-card"));

    if (originalCards.length > 1) {

        // تكرار البطاقات لضمان استمرار الحركة
        originalCards.forEach(function (card) {
            const clone = card.cloneNode(true);
            clone.dataset.newsClone = "true";
            newsContainer.appendChild(clone);
        });

        newsContainer.dataset.marqueeReady = "true";
        newsContainer.classList.add("actualites-track");

        // إنشاء إطار الشريط المتحرك
        const marquee = document.createElement("div");
        marquee.className = "actualites-marquee";

        newsContainer.parentNode.insertBefore(
            marquee,
            newsContainer
        );

        marquee.appendChild(newsContainer);

        // تشغيل أزرار البطاقات المكررة
        newsContainer.addEventListener("click", function (event) {

            const button = event.target.closest("button");

            if (!button || !button.closest("[data-news-clone='true']")) {
                return;
            }

            let modal = null;
            let showImages = null;

            if (button.classList.contains("actualite-more-btn")) {
                modal = taboulaModal;
                showImages = function () {
                    taboulaCurrentImage = 0;
                    showTaboulaImage();
                };
            } else if (button.classList.contains("e2c-more-btn")) {
                modal = e2cModal;
                showImages = function () {
                    e2cCurrentImage = 0;
                    showE2CImage();
                };
            } else if (button.classList.contains("partenariat-more-btn")) {
                modal = partenariatModal;
                showImages = function () {
                    partenariatCurrentImage = 0;
                    showPartenariatImage();
                };
            } else if (button.classList.contains("oim-more-btn")) {
                modal = oimModal;
                showImages = function () {
                    oimCurrentImage = 0;
                    showOimImage();
                };
            }

            if (modal) {
                modal.classList.add("active");
                modal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
                if (showImages) showImages();
            }
        });
    }
}
