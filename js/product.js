// ========================================
// Product Page - Header Scroll & Sticky Buy Bar
// ========================================
const header = document.getElementById('header');
const stickyBuyBar = document.getElementById('sticky-buy-bar');
const pdpHero = document.querySelector('.pdp-hero');

function handleScroll() {
    const heroHeight = pdpHero ? pdpHero.offsetHeight : window.innerHeight;
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (scrollY > heroHeight - 100) {
        header.classList.add('hidden');
        stickyBuyBar.classList.add('visible');
    } else {
        header.classList.remove('hidden');
        stickyBuyBar.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);

// ========================================
// Mobile Menu Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
});

const mobileLinks = navMobile.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// Scroll Hint Button
// ========================================
const scrollHint = document.querySelector('.pdp-scroll-hint');
if (scrollHint) {
    scrollHint.addEventListener('click', () => {
        const nextSection = document.querySelector('.pdp-decor-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ========================================
// Decor Slider - Dots & Scroll Tracking
// ========================================
const decorSlider = document.getElementById('pdp-decor-slider');
const decorDots = document.querySelectorAll('#pdp-decor-dots .dot');

function updateDecorDots() {
    if (!decorSlider || decorDots.length === 0) return;
    const scrollLeft = decorSlider.scrollLeft;
    const cardWidth = decorSlider.querySelector('.pdp-decor-card').offsetWidth + 16;
    const activeIndex = Math.round(scrollLeft / cardWidth);
    decorDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

if (decorSlider) {
    decorSlider.addEventListener('scroll', updateDecorDots);
}

decorDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide);
        const cardWidth = decorSlider.querySelector('.pdp-decor-card').offsetWidth + 16;
        decorSlider.scrollTo({ left: slideIndex * cardWidth, behavior: 'smooth' });
    });
});

// ========================================
// Decor Lightbox (Expanded View)
// ========================================
const lightbox = document.getElementById('pdp-decor-lightbox');
const lightboxSlider = document.getElementById('pdp-lightbox-slider');
const lightboxClose = document.getElementById('pdp-lightbox-close');
const lightboxDots = document.querySelectorAll('#pdp-lightbox-dots .dot');

// Open lightbox
document.querySelectorAll('.pdp-decor-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.expandDecor) - 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Scroll to correct image
        const imgWidth = lightboxSlider.querySelector('.pdp-lightbox-img').offsetWidth;
        lightboxSlider.scrollTo({ left: index * imgWidth, behavior: 'instant' });
        updateLightboxDots();
    });
});

// Close lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close on background click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Lightbox scroll tracking
function updateLightboxDots() {
    if (!lightboxSlider || lightboxDots.length === 0) return;
    const scrollLeft = lightboxSlider.scrollLeft;
    const imgWidth = lightboxSlider.offsetWidth;
    const activeIndex = Math.round(scrollLeft / imgWidth);
    lightboxDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

if (lightboxSlider) {
    lightboxSlider.addEventListener('scroll', updateLightboxDots);
}

lightboxDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide);
        const imgWidth = lightboxSlider.offsetWidth;
        lightboxSlider.scrollTo({ left: slideIndex * imgWidth, behavior: 'smooth' });
    });
});

// ========================================
// Product Gallery - Thumbnail Switcher
// ========================================
const galleryMainImg = document.getElementById('pdp-gallery-main-img');
const galleryThumbs = document.querySelectorAll('.pdp-gallery-thumb');

galleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.view;
        if (galleryMainImg && newSrc) {
            galleryMainImg.style.opacity = '0';
            setTimeout(() => {
                galleryMainImg.src = newSrc;
                galleryMainImg.style.opacity = '1';
            }, 200);
        }
        galleryThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

// ========================================
// Footer Collapsible Sections (Mobile)
// ========================================
const footerSections = document.querySelectorAll('[data-footer-section]');

footerSections.forEach(section => {
    const headerBtn = section.querySelector('.footer-links-header');
    if (headerBtn) {
        headerBtn.addEventListener('click', () => {
            const isOpen = section.classList.contains('open');
            // Close all others
            footerSections.forEach(s => s.classList.remove('open'));
            if (!isOpen) {
                section.classList.add('open');
            }
        });
    }
});
