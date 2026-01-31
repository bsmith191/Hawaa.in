// ========================================
// Header Scroll Effect
// ========================================
const header = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ========================================
// Mobile Menu Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileLinks = navMobile.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

// ========================================
// Hero Video - Show Resting Image on End
// ========================================
const heroVideo = document.getElementById('hero-video');
const heroResting = document.getElementById('hero-resting');

if (heroVideo) {
    heroVideo.addEventListener('ended', () => {
        heroVideo.classList.add('hidden');
        heroResting.classList.add('visible');
    });

    // Fallback: If video fails to load, show resting image
    heroVideo.addEventListener('error', () => {
        heroVideo.classList.add('hidden');
        heroResting.classList.add('visible');
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
