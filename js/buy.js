// ========================================
// Buy Page - Veloretti-inspired Redesign
// ========================================

(function() {
    'use strict';

    // ========================================
    // STATE
    // ========================================
    var currentStep = 1;
    var totalSteps = 2;
    var purchaseType = 'onetime'; // 'onetime' or 'subscribe'
    var filterInterval = 5; // 5 or 6 months
    var selectedColour = 'Matte Black';

    var PRICES = {
        onetime: 5999,
        subscribe: 5499
    };

    // ========================================
    // DOM ELEMENTS
    // ========================================

    // Carousel
    var carousel = document.getElementById('buy-carousel');
    var carouselTrack = document.getElementById('buy-carousel-track');
    var carouselIndex = document.getElementById('buy-carousel-index');
    var totalSlides = carouselTrack ? carouselTrack.children.length : 0;
    var currentSlide = 0;

    // Steps
    var stepBtns = document.querySelectorAll('.buy-step');
    var stepContents = document.querySelectorAll('.buy-step-content');

    // Variant cards
    var btnOnetime = document.getElementById('btn-onetime');
    var btnSubscribe = document.getElementById('btn-subscribe');

    // Filter plans (now inside purifier step)
    var filterPlans = document.getElementById('buy-filter-plans');
    var filter5 = document.getElementById('filter-5');
    var filter6 = document.getElementById('filter-6');

    // Colour
    var colourSwatches = document.querySelectorAll('.buy-colour-swatch');
    var colourName = document.getElementById('buy-colour-name');

    // Price displays
    var priceDisplay = document.getElementById('buy-price');
    var stickyPrice = document.getElementById('buy-sticky-price');

    // Sticky bar
    var stickyBtn = document.getElementById('buy-sticky-btn');

    // Details modal
    var detailsBtn = document.getElementById('buy-details-btn');
    var detailsOverlay = document.getElementById('buy-details-overlay');
    var detailsClose = document.getElementById('buy-details-close');
    var detailsSlides = document.getElementById('buy-details-slides');
    var detailsPrev = document.getElementById('buy-details-prev');
    var detailsNext = document.getElementById('buy-details-next');
    var detailsDots = document.querySelectorAll('.buy-details-dot');
    var currentDetailSlide = 0;
    var totalDetailSlides = detailsDots.length;

    // Accessory
    var accFilterBtn = document.getElementById('acc-filter-btn');

    // ========================================
    // UTILITY
    // ========================================
    function formatPrice(amount) {
        return '\u20B9' + amount.toLocaleString('en-IN');
    }

    // ========================================
    // IMAGE CAROUSEL (Fixed)
    // ========================================
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        if (carouselTrack) {
            carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        }
        if (carouselIndex) {
            carouselIndex.textContent = (currentSlide + 1) + '/' + totalSlides;
        }
    }

    // Touch/swipe support for carousel
    if (carousel) {
        var touchStartX = 0;
        var touchStartY = 0;
        var touchDiffX = 0;
        var isSwiping = false;
        var swipeDirection = null; // null = undetermined, 'h' = horizontal, 'v' = vertical

        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchDiffX = 0;
            isSwiping = true;
            swipeDirection = null;
            // Remove transition during drag for immediate feedback
            if (carouselTrack) {
                carouselTrack.style.transition = 'none';
            }
        }, { passive: true });

        carousel.addEventListener('touchmove', function(e) {
            if (!isSwiping) return;

            var currentX = e.touches[0].clientX;
            var currentY = e.touches[0].clientY;
            var diffX = currentX - touchStartX;
            var diffY = currentY - touchStartY;

            // Determine direction on first significant movement
            if (swipeDirection === null && (Math.abs(diffX) > 8 || Math.abs(diffY) > 8)) {
                swipeDirection = Math.abs(diffX) > Math.abs(diffY) ? 'h' : 'v';
            }

            if (swipeDirection === 'h') {
                e.preventDefault();
                touchDiffX = diffX;
                // Move track with finger
                var baseOffset = -(currentSlide * 100);
                var dragPercent = (touchDiffX / carousel.offsetWidth) * 100;
                if (carouselTrack) {
                    carouselTrack.style.transform = 'translateX(' + (baseOffset + dragPercent) + '%)';
                }
            }
        }, { passive: false });

        carousel.addEventListener('touchend', function() {
            if (!isSwiping) return;
            isSwiping = false;

            // Restore transition
            if (carouselTrack) {
                carouselTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }

            if (swipeDirection === 'h') {
                var threshold = carousel.offsetWidth * 0.15;
                if (touchDiffX < -threshold) {
                    goToSlide(currentSlide + 1);
                } else if (touchDiffX > threshold) {
                    goToSlide(currentSlide - 1);
                } else {
                    goToSlide(currentSlide); // snap back
                }
            }
        }, { passive: true });
    }

    // ========================================
    // STEP NAVIGATION
    // ========================================
    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;
        currentStep = step;

        // Update step buttons
        stepBtns.forEach(function(btn) {
            var btnStep = parseInt(btn.getAttribute('data-step'));
            btn.classList.remove('active', 'completed');
            if (btnStep === currentStep) {
                btn.classList.add('active');
            } else if (btnStep < currentStep) {
                btn.classList.add('completed');
            }
        });

        // Update step content
        stepContents.forEach(function(content) {
            content.classList.remove('active');
        });
        var activeContent = document.getElementById('step-content-' + currentStep);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Scroll to steps bar
        var stepsBar = document.getElementById('buy-steps');
        if (stepsBar) {
            stepsBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Step button clicks
    stepBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var step = parseInt(this.getAttribute('data-step'));
            goToStep(step);
        });
    });

    // ========================================
    // VARIANT SELECTION
    // ========================================
    function selectVariant(type) {
        purchaseType = type;

        if (btnOnetime) btnOnetime.classList.toggle('active', type === 'onetime');
        if (btnSubscribe) btnSubscribe.classList.toggle('active', type === 'subscribe');

        // Show/hide filter plans
        if (filterPlans) {
            if (type === 'subscribe') {
                filterPlans.classList.add('visible');
            } else {
                filterPlans.classList.remove('visible');
            }
        }

        updatePrices();
    }

    if (btnOnetime) {
        btnOnetime.addEventListener('click', function() { selectVariant('onetime'); });
    }
    if (btnSubscribe) {
        btnSubscribe.addEventListener('click', function() { selectVariant('subscribe'); });
    }

    // ========================================
    // FILTER INTERVAL
    // ========================================
    function selectFilterInterval(interval) {
        filterInterval = interval;
        if (filter5) filter5.classList.toggle('active', interval === 5);
        if (filter6) filter6.classList.toggle('active', interval === 6);
    }

    if (filter5) {
        filter5.addEventListener('click', function() { selectFilterInterval(5); });
    }
    if (filter6) {
        filter6.addEventListener('click', function() { selectFilterInterval(6); });
    }

    // ========================================
    // COLOUR SELECTOR
    // ========================================
    colourSwatches.forEach(function(swatch) {
        swatch.addEventListener('click', function() {
            colourSwatches.forEach(function(s) { s.classList.remove('active'); });
            this.classList.add('active');
            selectedColour = this.getAttribute('data-colour');
            if (colourName) colourName.textContent = selectedColour;
        });
    });

    // ========================================
    // PRICE UPDATES
    // ========================================
    function updatePrices() {
        var price = PRICES[purchaseType];
        var priceStr = formatPrice(price);

        if (priceDisplay) priceDisplay.textContent = priceStr;
        if (stickyPrice) stickyPrice.textContent = priceStr;
    }

    // ========================================
    // STICKY BAR - Always "Add to Cart"
    // ========================================
    if (stickyBtn) {
        stickyBtn.addEventListener('click', function() {
            stickyBtn.textContent = 'Added!';
            stickyBtn.style.background = '#059669';
            setTimeout(function() {
                stickyBtn.textContent = 'Add to Cart';
                stickyBtn.style.background = '';
            }, 1500);
        });
    }

    // ========================================
    // ACCESSORY ADD BUTTON
    // ========================================
    if (accFilterBtn) {
        var accAdded = false;
        accFilterBtn.addEventListener('click', function() {
            accAdded = !accAdded;
            if (accAdded) {
                accFilterBtn.textContent = 'Added';
                accFilterBtn.classList.add('added');
            } else {
                accFilterBtn.textContent = 'Add';
                accFilterBtn.classList.remove('added');
            }
        });
    }

    // ========================================
    // DETAILS MODAL (Full Screen)
    // ========================================
    function openDetails() {
        if (detailsOverlay) {
            detailsOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeDetails() {
        if (detailsOverlay) {
            detailsOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function goToDetailSlide(index) {
        if (index < 0) index = totalDetailSlides - 1;
        if (index >= totalDetailSlides) index = 0;
        currentDetailSlide = index;

        if (detailsSlides) {
            detailsSlides.style.transform = 'translateX(-' + (currentDetailSlide * 100) + '%)';
        }

        detailsDots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentDetailSlide);
        });
    }

    if (detailsBtn) {
        detailsBtn.addEventListener('click', openDetails);
    }

    if (detailsClose) {
        detailsClose.addEventListener('click', closeDetails);
    }

    if (detailsPrev) {
        detailsPrev.addEventListener('click', function() {
            goToDetailSlide(currentDetailSlide - 1);
        });
    }

    if (detailsNext) {
        detailsNext.addEventListener('click', function() {
            goToDetailSlide(currentDetailSlide + 1);
        });
    }

    // Close details on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeDetails();
    });

    // ========================================
    // INITIALIZE
    // ========================================
    updatePrices();

})();
