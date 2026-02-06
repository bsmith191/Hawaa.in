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

navMobile.querySelectorAll('a').forEach(link => {
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
// Generic Slider Dot Tracker
// ========================================
function initSliderDots(sliderId, dotsId, gap) {
    const slider = document.getElementById(sliderId);
    const dots = document.querySelectorAll('#' + dotsId + ' .dot');
    if (!slider || dots.length === 0) return;

    function update() {
        const card = slider.querySelector(':scope > *');
        if (!card) return;
        const cardWidth = card.offsetWidth + (gap || 16);
        const activeIndex = Math.round(slider.scrollLeft / cardWidth);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    slider.addEventListener('scroll', update);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            const card = slider.querySelector(':scope > *');
            if (!card) return;
            const cardWidth = card.offsetWidth + (gap || 16);
            slider.scrollTo({ left: slideIndex * cardWidth, behavior: 'smooth' });
        });
    });

    update();
}

// Init all slider dots
initSliderDots('pdp-decor-slider', 'pdp-decor-dots', 16);
initSliderDots('pdp-perf-slider', 'pdp-perf-dots', 0);
initSliderDots('pdp-gesture-slider', 'pdp-gesture-dots', 16);
initSliderDots('pdp-smart-slider', 'pdp-smart-dots', 16);

// ========================================
// Decor Lightbox (Expanded View)
// ========================================
const lightbox = document.getElementById('pdp-decor-lightbox');
const lightboxSlider = document.getElementById('pdp-lightbox-slider');
const lightboxClose = document.getElementById('pdp-lightbox-close');
const lightboxDots = document.querySelectorAll('#pdp-lightbox-dots .dot');

document.querySelectorAll('.pdp-decor-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.expandDecor) - 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        const imgWidth = lightboxSlider.querySelector('.pdp-lightbox-img').offsetWidth;
        lightboxSlider.scrollTo({ left: index * imgWidth, behavior: 'instant' });
        updateLightboxDots();
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) closeLightbox(); });

function updateLightboxDots() {
    if (!lightboxSlider || lightboxDots.length === 0) return;
    const activeIndex = Math.round(lightboxSlider.scrollLeft / lightboxSlider.offsetWidth);
    lightboxDots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
}

if (lightboxSlider) lightboxSlider.addEventListener('scroll', updateLightboxDots);

lightboxDots.forEach(dot => {
    dot.addEventListener('click', () => {
        lightboxSlider.scrollTo({ left: parseInt(dot.dataset.slide) * lightboxSlider.offsetWidth, behavior: 'smooth' });
    });
});

// ========================================
// Filter System - Apple-style text swap
// ========================================
const filterDots = document.querySelectorAll('#pdp-filter-dots .dot');
const filterCards = document.querySelectorAll('.pdp-filter-text-card');

function setActiveFilter(index) {
    filterCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    filterDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

filterDots.forEach(dot => {
    dot.addEventListener('click', () => {
        setActiveFilter(parseInt(dot.dataset.slide));
    });
});

// Auto-cycle filter text on swipe area
const filterViewer = document.getElementById('pdp-filter-viewer');
if (filterViewer) {
    let filterTouchStartX = 0;
    let filterCurrentIndex = 0;

    filterViewer.addEventListener('touchstart', (e) => {
        filterTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    filterViewer.addEventListener('touchend', (e) => {
        const diff = filterTouchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && filterCurrentIndex < filterCards.length - 1) {
                filterCurrentIndex++;
            } else if (diff < 0 && filterCurrentIndex > 0) {
                filterCurrentIndex--;
            }
            setActiveFilter(filterCurrentIndex);
        }
    }, { passive: true });
}

// ========================================
// Footer Collapsible Sections (Mobile)
// ========================================
document.querySelectorAll('[data-footer-section]').forEach(section => {
    const headerBtn = section.querySelector('.footer-links-header');
    if (headerBtn) {
        headerBtn.addEventListener('click', () => {
            const isOpen = section.classList.contains('open');
            document.querySelectorAll('[data-footer-section]').forEach(s => s.classList.remove('open'));
            if (!isOpen) section.classList.add('open');
        });
    }
});
