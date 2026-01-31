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
// Hero Video - Autoplay and Fallback
// ========================================
const heroVideo = document.getElementById('hero-video');
const heroResting = document.getElementById('hero-resting');

if (heroVideo) {
    const playVideo = () => {
        heroVideo.play().then(() => {
            heroVideo.classList.remove('hidden');
        }).catch((error) => {
            console.log('Video autoplay prevented:', error);
            heroVideo.classList.add('hidden');
            heroResting.classList.add('visible');
        });
    };

    if (heroVideo.readyState >= 3) {
        playVideo();
    } else {
        heroVideo.addEventListener('canplay', playVideo, { once: true });
    }

    heroVideo.addEventListener('ended', () => {
        heroVideo.classList.add('hidden');
        heroResting.classList.add('visible');
    });

    heroVideo.addEventListener('error', () => {
        heroVideo.classList.add('hidden');
        heroResting.classList.add('visible');
    });

    setTimeout(() => {
        if (heroVideo.readyState === 0) {
            heroVideo.classList.add('hidden');
            heroResting.classList.add('visible');
        }
    }, 3000);
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
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

// ========================================
// AQI CHECKER FUNCTIONALITY
// ========================================

// Indian Cities with approximate AQI data (simulated)
const indianCities = [
    { name: 'Delhi', aqi: 185 },
    { name: 'Mumbai', aqi: 120 },
    { name: 'Bangalore', aqi: 85 },
    { name: 'Chennai', aqi: 95 },
    { name: 'Kolkata', aqi: 145 },
    { name: 'Hyderabad', aqi: 90 },
    { name: 'Pune', aqi: 110 },
    { name: 'Ahmedabad', aqi: 135 },
    { name: 'Jaipur', aqi: 155 },
    { name: 'Lucknow', aqi: 175 },
    { name: 'Kanpur', aqi: 195 },
    { name: 'Nagpur', aqi: 100 },
    { name: 'Indore', aqi: 105 },
    { name: 'Bhopal', aqi: 115 },
    { name: 'Patna', aqi: 180 },
    { name: 'Vadodara', aqi: 125 },
    { name: 'Ghaziabad', aqi: 190 },
    { name: 'Ludhiana', aqi: 160 },
    { name: 'Agra', aqi: 170 },
    { name: 'Nashik', aqi: 88 },
    { name: 'Faridabad', aqi: 185 },
    { name: 'Meerut', aqi: 165 },
    { name: 'Rajkot', aqi: 95 },
    { name: 'Varanasi', aqi: 175 },
    { name: 'Srinagar', aqi: 65 },
    { name: 'Chandigarh', aqi: 110 },
    { name: 'Coimbatore', aqi: 70 },
    { name: 'Guwahati', aqi: 130 },
    { name: 'Noida', aqi: 188 },
    { name: 'Gurugram', aqi: 182 }
];

// DOM Elements
const cityInput = document.getElementById('city-input');
const citySuggestions = document.getElementById('city-suggestions');
const checkAqiBtn = document.getElementById('check-aqi-btn');
const modal = document.getElementById('aqi-modal');
const modalClose = document.getElementById('modal-close');
const modalCity = document.getElementById('modal-city');
const modalAqi = document.getElementById('modal-aqi');
const cardSlider = document.getElementById('card-slider');
const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');
const sliderDots = document.getElementById('slider-dots');

let selectedCity = null;
let currentSlide = 0;

// City Input - Auto Suggest
cityInput.addEventListener('input', function() {
    const value = this.value.toLowerCase().trim();

    if (value.length < 2) {
        citySuggestions.classList.remove('active');
        return;
    }

    const matches = indianCities.filter(city =>
        city.name.toLowerCase().includes(value)
    ).slice(0, 6);

    if (matches.length > 0) {
        citySuggestions.innerHTML = matches.map(city =>
            `<div class="city-suggestion" data-city="${city.name}" data-aqi="${city.aqi}">${city.name}</div>`
        ).join('');
        citySuggestions.classList.add('active');
    } else {
        citySuggestions.classList.remove('active');
    }
});

// City Suggestion Click
citySuggestions.addEventListener('click', function(e) {
    if (e.target.classList.contains('city-suggestion')) {
        const cityName = e.target.dataset.city;
        const cityAqi = parseInt(e.target.dataset.aqi);
        cityInput.value = cityName;
        selectedCity = { name: cityName, aqi: cityAqi };
        citySuggestions.classList.remove('active');
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.aqi-input-wrapper')) {
        citySuggestions.classList.remove('active');
    }
});

// Check AQI Button
checkAqiBtn.addEventListener('click', function() {
    let city = selectedCity;

    // If no city selected, try to find exact match
    if (!city) {
        const inputValue = cityInput.value.trim().toLowerCase();
        const match = indianCities.find(c => c.name.toLowerCase() === inputValue);
        if (match) {
            city = match;
        } else if (inputValue.length > 0) {
            // Generate random AQI for unknown city
            city = { name: cityInput.value.trim(), aqi: Math.floor(Math.random() * 150) + 50 };
        }
    }

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    showAqiResults(city);
});

// Show AQI Results in Modal
function showAqiResults(city) {
    const aqi = city.aqi;

    // Update modal header
    modalCity.textContent = city.name;
    modalAqi.innerHTML = `AQI ${aqi} <span class="aqi-label">(${getAqiLabel(aqi)})</span>`;

    // Calculate and update card values
    updateCigaretteCard(aqi);
    updateLungCard(aqi);
    updatePollutantCard(aqi);
    updateChildCard(aqi);

    // Reset slider
    currentSlide = 0;
    updateSlider();

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Get AQI Label
function getAqiLabel(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Card 1: Cigarette Equivalent
function updateCigaretteCard(aqi) {
    let cigarettes;
    if (aqi <= 25) cigarettes = 0;
    else if (aqi <= 50) cigarettes = 0.5;
    else if (aqi <= 75) cigarettes = 1.5;
    else if (aqi <= 100) cigarettes = 2.5;
    else if (aqi <= 150) cigarettes = 4;
    else if (aqi <= 200) cigarettes = 6;
    else cigarettes = 8;

    const monthly = Math.round(cigarettes * 30);

    document.getElementById('cigarette-value').textContent =
        cigarettes === 0 ? '0 cigarettes/day' : `~${cigarettes} cigarettes/day`;
    document.getElementById('cigarette-detail').textContent =
        `≈ ${monthly} cigarettes per month`;
}

// Card 2: Lung Stress Level
function updateLungCard(aqi) {
    let level, detail;

    if (aqi <= 25) {
        level = 'Normal';
        detail = 'Air quality is satisfactory for most individuals';
    } else if (aqi <= 50) {
        level = 'Mild Irritation';
        detail = 'Sensitive individuals may experience slight discomfort';
    } else if (aqi <= 75) {
        level = 'Noticeable Stress';
        detail = 'May cause breathing discomfort during prolonged exposure';
    } else if (aqi <= 100) {
        level = 'Reduced Efficiency';
        detail = 'Oxygen efficiency decreases, fatigue may increase';
    } else if (aqi <= 150) {
        level = 'Inflammation Risk';
        detail = 'Risk of airway inflammation with extended exposure';
    } else if (aqi <= 200) {
        level = 'High Lung Strain';
        detail = 'Long exposure increases fatigue & breathlessness';
    } else {
        level = 'Severe Stress';
        detail = 'Serious respiratory effects likely with any exposure';
    }

    document.getElementById('lung-value').textContent = level;
    document.getElementById('lung-detail').textContent = detail;
}

// Card 3: Pollutant Intake
function updatePollutantCard(aqi) {
    let intake;

    if (aqi <= 25) intake = 175;
    else if (aqi <= 50) intake = 250;
    else if (aqi <= 75) intake = 375;
    else if (aqi <= 100) intake = 525;
    else if (aqi <= 150) intake = 725;
    else if (aqi <= 200) intake = 975;
    else intake = 1200;

    document.getElementById('pollutant-value').textContent = `~${intake} µg/day`;
    document.getElementById('pollutant-detail').textContent =
        'Particles inhaled in 24 hours of normal breathing';
}

// Card 4: Child Exposure
function updateChildCard(aqi) {
    let severity;

    if (aqi <= 50) severity = 'Minimal concern for children';
    else if (aqi <= 100) severity = 'Limit prolonged outdoor activities';
    else if (aqi <= 150) severity = 'Serious concern - reduce outdoor time';
    else severity = 'Avoid outdoor exposure for children';

    document.getElementById('child-value').textContent = '1.9× higher exposure';
    document.getElementById('child-detail').textContent = severity;
}

// Close Modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Card Slider Navigation
sliderPrev.addEventListener('click', function() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

sliderNext.addEventListener('click', function() {
    if (currentSlide < 3) {
        currentSlide++;
        updateSlider();
    }
});

function updateSlider() {
    const cards = cardSlider.querySelectorAll('.impact-card');
    const cardWidth = cards[0].offsetWidth + 12; // card width + gap
    cardSlider.scrollLeft = currentSlide * cardWidth;

    // Update dots
    const dots = sliderDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Dot navigation
sliderDots.addEventListener('click', function(e) {
    if (e.target.classList.contains('dot')) {
        const dots = Array.from(sliderDots.querySelectorAll('.dot'));
        currentSlide = dots.indexOf(e.target);
        updateSlider();
    }
});

// Touch swipe support for slider
let touchStartX = 0;
let touchEndX = 0;

cardSlider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

cardSlider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < 3) {
            // Swipe left - next
            currentSlide++;
            updateSlider();
        } else if (diff < 0 && currentSlide > 0) {
            // Swipe right - prev
            currentSlide--;
            updateSlider();
        }
    }
}

// Update dots on scroll
cardSlider.addEventListener('scroll', function() {
    const cards = cardSlider.querySelectorAll('.impact-card');
    const cardWidth = cards[0].offsetWidth + 12;
    const newSlide = Math.round(cardSlider.scrollLeft / cardWidth);

    if (newSlide !== currentSlide) {
        currentSlide = newSlide;
        const dots = sliderDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
});
