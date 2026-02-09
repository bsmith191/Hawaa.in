// ========================================
// Buy Page - Veloretti-inspired Redesign
// ========================================

(function() {
    'use strict';

    // ========================================
    // STATE
    // ========================================
    var currentStep = 1;
    var purchaseType = 'onetime'; // 'onetime' or 'subscribe'
    var hasSubscription = false;
    var filterInterval = 5; // 5 or 6 months

    var PRICES = {
        onetime: 5999,
        subscribe: 5499
    };

    // ========================================
    // DOM ELEMENTS
    // ========================================

    // Carousel
    var carouselTrack = document.getElementById('buy-carousel-track');
    var carouselIndex = document.getElementById('buy-carousel-index');
    var carouselSlides = carouselTrack ? carouselTrack.children : [];
    var currentSlide = 0;
    var totalSlides = carouselSlides.length;

    // Steps
    var stepBtns = document.querySelectorAll('.buy-step');
    var stepContents = document.querySelectorAll('.buy-step-content');

    // Variant cards (Step 1)
    var btnOnetime = document.getElementById('btn-onetime');
    var btnSubscribe = document.getElementById('btn-subscribe');

    // Price displays
    var priceDisplay = document.getElementById('buy-price');
    var stickyPrice = document.getElementById('buy-sticky-price');

    // Subscription toggle (Step 2)
    var subNoneBtn = document.getElementById('sub-none');
    var subPlanBtn = document.getElementById('sub-plan');
    var filterPlans = document.getElementById('buy-filter-plans');
    var filter5 = document.getElementById('filter-5');
    var filter6 = document.getElementById('filter-6');
    var subInfoPrice = document.getElementById('buy-sub-info-price');
    var subSavingsRow = document.getElementById('buy-sub-savings-row');
    var subInfoTotal = document.getElementById('buy-sub-info-total');

    // Sticky bar
    var stickyBottom = document.getElementById('buy-sticky-bottom');
    var stickyBtn = document.getElementById('buy-sticky-btn');
    var stickyBackBtn = document.getElementById('buy-sticky-back');

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

    // Pincode
    var pincodeInput = document.getElementById('buy-pincode');
    var pincodeBtn = document.getElementById('buy-pincode-btn');
    var deliveryResult = document.getElementById('buy-delivery-result');

    // ========================================
    // UTILITY
    // ========================================
    function formatPrice(amount) {
        return '\u20B9' + amount.toLocaleString('en-IN');
    }

    // ========================================
    // IMAGE CAROUSEL
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
    if (carouselTrack) {
        var startX = 0;
        var startY = 0;
        var isDragging = false;
        var isHorizontalSwipe = null;

        carouselTrack.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            isHorizontalSwipe = null;
        }, { passive: true });

        carouselTrack.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            var diffX = e.touches[0].clientX - startX;
            var diffY = e.touches[0].clientY - startY;

            // Determine swipe direction on first significant move
            if (isHorizontalSwipe === null && (Math.abs(diffX) > 5 || Math.abs(diffY) > 5)) {
                isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
            }

            if (isHorizontalSwipe) {
                e.preventDefault();
            }
        }, { passive: false });

        carouselTrack.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            var endX = e.changedTouches[0].clientX;
            var diff = startX - endX;

            if (isHorizontalSwipe && Math.abs(diff) > 40) {
                if (diff > 0) {
                    goToSlide(currentSlide + 1);
                } else {
                    goToSlide(currentSlide - 1);
                }
            }
        }, { passive: true });
    }

    // ========================================
    // STEP NAVIGATION
    // ========================================
    function goToStep(step) {
        if (step < 1 || step > 3) return;
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

        // Update sticky bar buttons
        updateStickyBar();

        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Step button clicks
    stepBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var step = parseInt(this.getAttribute('data-step'));
            goToStep(step);
        });
    });

    function updateStickyBar() {
        // Show/hide back button
        if (stickyBackBtn) {
            stickyBackBtn.style.display = currentStep > 1 ? '' : 'none';
        }

        // Update CTA text
        if (stickyBtn) {
            if (currentStep === 3) {
                stickyBtn.textContent = purchaseType === 'subscribe' ? 'Subscribe' : 'Add to Cart';
            } else {
                stickyBtn.textContent = 'Next step';
            }
        }
    }

    // Sticky bar button handlers
    if (stickyBtn) {
        stickyBtn.addEventListener('click', function() {
            if (currentStep < 3) {
                goToStep(currentStep + 1);
            } else {
                // Final action - Add to Cart / Subscribe
                stickyBtn.textContent = 'Added!';
                stickyBtn.style.background = '#059669';
                setTimeout(function() {
                    stickyBtn.textContent = purchaseType === 'subscribe' ? 'Subscribe' : 'Add to Cart';
                    stickyBtn.style.background = '';
                }, 1500);
            }
        });
    }

    if (stickyBackBtn) {
        stickyBackBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    }

    // ========================================
    // VARIANT SELECTION (Step 1)
    // ========================================
    function selectVariant(type) {
        purchaseType = type;

        if (btnOnetime) btnOnetime.classList.toggle('active', type === 'onetime');
        if (btnSubscribe) btnSubscribe.classList.toggle('active', type === 'subscribe');

        // If subscribe is selected, auto-set subscription plan
        if (type === 'subscribe') {
            hasSubscription = true;
            if (subPlanBtn) subPlanBtn.classList.add('active');
            if (subNoneBtn) subNoneBtn.classList.remove('active');
        } else {
            hasSubscription = false;
            if (subNoneBtn) subNoneBtn.classList.add('active');
            if (subPlanBtn) subPlanBtn.classList.remove('active');
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
    // SUBSCRIPTION (Step 2)
    // ========================================
    function selectSubOption(hasSub) {
        hasSubscription = hasSub;

        if (subNoneBtn) subNoneBtn.classList.toggle('active', !hasSub);
        if (subPlanBtn) subPlanBtn.classList.toggle('active', hasSub);

        // Show/hide filter plans
        if (filterPlans) {
            if (hasSub) {
                filterPlans.classList.add('visible');
            } else {
                filterPlans.classList.remove('visible');
            }
        }

        // Update purchase type to match
        purchaseType = hasSub ? 'subscribe' : 'onetime';
        if (btnOnetime) btnOnetime.classList.toggle('active', !hasSub);
        if (btnSubscribe) btnSubscribe.classList.toggle('active', hasSub);

        updatePrices();
    }

    if (subNoneBtn) {
        subNoneBtn.addEventListener('click', function() { selectSubOption(false); });
    }
    if (subPlanBtn) {
        subPlanBtn.addEventListener('click', function() { selectSubOption(true); });
    }

    // Filter interval selection
    function selectFilterInterval(interval) {
        filterInterval = interval;
        if (filter5) filter5.classList.toggle('active', interval === 5);
        if (filter6) filter6.classList.toggle('active', interval === 6);
        updatePrices();
    }

    if (filter5) {
        filter5.addEventListener('click', function() { selectFilterInterval(5); });
    }
    if (filter6) {
        filter6.addEventListener('click', function() { selectFilterInterval(6); });
    }

    // ========================================
    // PRICE UPDATES
    // ========================================
    function updatePrices() {
        var price = PRICES[purchaseType];
        var priceStr = formatPrice(price);

        // Main price display
        if (priceDisplay) priceDisplay.textContent = priceStr;

        // Sticky price
        if (stickyPrice) stickyPrice.textContent = priceStr;

        // Subscription info (Step 2)
        if (subInfoPrice) subInfoPrice.textContent = formatPrice(PRICES.onetime);
        if (subSavingsRow) {
            subSavingsRow.style.display = purchaseType === 'subscribe' ? '' : 'none';
        }
        if (subInfoTotal) subInfoTotal.textContent = priceStr;

        // Sticky bar CTA text
        updateStickyBar();
    }

    // ========================================
    // DETAILS MODAL
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

        // Update dots
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

    if (detailsOverlay) {
        detailsOverlay.addEventListener('click', function(e) {
            if (e.target === detailsOverlay) closeDetails();
        });
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
    // PINCODE DELIVERY CHECK
    // ========================================
    function checkPincode() {
        if (!pincodeInput) return;
        var pincode = pincodeInput.value.trim();

        if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
            if (deliveryResult) {
                deliveryResult.textContent = 'Please enter a valid 6-digit pincode';
                deliveryResult.className = 'buy-delivery-result error';
            }
            return;
        }

        if (deliveryResult) {
            deliveryResult.textContent = 'Checking...';
            deliveryResult.className = 'buy-delivery-result';
        }

        setTimeout(function() {
            var days = Math.floor(Math.random() * 4) + 3; // 3-6 days
            var date = new Date();
            date.setDate(date.getDate() + days);
            var options = { weekday: 'short', month: 'short', day: 'numeric' };
            var dateStr = date.toLocaleDateString('en-IN', options);

            if (deliveryResult) {
                deliveryResult.textContent = 'Estimated delivery by ' + dateStr + ' \u00B7 Free shipping';
                deliveryResult.className = 'buy-delivery-result success';
            }
        }, 600);
    }

    if (pincodeBtn) {
        pincodeBtn.addEventListener('click', checkPincode);
    }
    if (pincodeInput) {
        pincodeInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') checkPincode();
        });
        pincodeInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }

    // ========================================
    // INITIALIZE
    // ========================================
    updatePrices();
    updateStickyBar();

})();
