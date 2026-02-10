document.addEventListener('DOMContentLoaded', function() {

    // Elements
    var segWarranty = document.getElementById('seg-warranty');
    var segReturn = document.getElementById('seg-return');
    var indicator = document.getElementById('segment-indicator');
    var form = document.getElementById('support-form');
    var submitBtn = document.getElementById('support-submit');
    var successEl = document.getElementById('support-success');
    var anotherBtn = document.getElementById('support-another');
    var orderInput = document.getElementById('order-number');
    var contactInput = document.getElementById('contact-info');
    var stepTexts = document.querySelectorAll('.support-step-text');

    var currentType = 'warranty';

    // Segmented control
    function setSegment(type) {
        currentType = type;

        if (type === 'warranty') {
            segWarranty.classList.add('active');
            segReturn.classList.remove('active');
            indicator.classList.remove('right');
            submitBtn.textContent = 'Request warranty support';
        } else {
            segReturn.classList.add('active');
            segWarranty.classList.remove('active');
            indicator.classList.add('right');
            submitBtn.textContent = 'Request return / replacement';
        }

        // Update step texts
        for (var i = 0; i < stepTexts.length; i++) {
            var el = stepTexts[i];
            if (type === 'warranty') {
                el.textContent = el.getAttribute('data-warranty');
            } else {
                el.textContent = el.getAttribute('data-return');
            }
        }
    }

    segWarranty.addEventListener('click', function() {
        setSegment('warranty');
    });

    segReturn.addEventListener('click', function() {
        setSegment('return');
    });

    // Form validation and submit
    function clearErrors() {
        orderInput.classList.remove('error');
        contactInput.classList.remove('error');
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        var orderVal = orderInput.value.trim();
        var contactVal = contactInput.value.trim();
        var hasError = false;

        if (!orderVal) {
            orderInput.classList.add('error');
            hasError = true;
        }

        if (!contactVal) {
            contactInput.classList.add('error');
            hasError = true;
        }

        if (hasError) return;

        // Disable button during "submission"
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Simulate submission delay
        setTimeout(function() {
            form.style.display = 'none';
            document.querySelector('.support-segment').style.display = 'none';
            successEl.classList.remove('hidden');
            submitBtn.disabled = false;
        }, 800);
    });

    // "Submit another request" button
    anotherBtn.addEventListener('click', function() {
        successEl.classList.add('hidden');
        form.style.display = '';
        document.querySelector('.support-segment').style.display = '';
        orderInput.value = '';
        contactInput.value = '';
        clearErrors();
        setSegment('warranty');
    });

    // Remove error on input focus
    orderInput.addEventListener('focus', function() {
        orderInput.classList.remove('error');
    });

    contactInput.addEventListener('focus', function() {
        contactInput.classList.remove('error');
    });

    // Footer mobile collapsible sections
    var sections = document.querySelectorAll('[data-footer-section]');
    for (var s = 0; s < sections.length; s++) {
        (function(section) {
            var header = section.querySelector('.footer-links-header');
            if (header) {
                header.addEventListener('click', function() {
                    if (window.innerWidth < 768) {
                        var isActive = section.classList.contains('active');
                        for (var k = 0; k < sections.length; k++) {
                            sections[k].classList.remove('active');
                        }
                        if (!isActive) section.classList.add('active');
                    }
                });
            }
        })(sections[s]);
    }

});
