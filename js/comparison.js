/* ========================================
   COMPARISON PAGE — Data Model & Interactivity
======================================== */

(function () {
    'use strict';

    // ---- BRAND ORDER ----
    var BRANDS = ['Hawaa EDGE', 'Levoit', 'Philips', 'MI', 'Coway', 'Honeywell'];
    var BRAND_KEYS = ['hawaa', 'levoit', 'philips', 'mi', 'coway', 'honeywell'];

    // ---- COMPARISON DATA ----
    // Each row: { attr, best (index), values: [{ specs, outcome }] }
    var CATEGORIES = [
        {
            name: 'Cleaning Performance',
            rows: [
                {
                    attr: 'CADR (PM2.5)',
                    best: 0,
                    values: [
                        { specs: '250 m³/hr', outcome: 'Cleans 300 sq ft in ~12 min' },
                        { specs: '240 m³/hr', outcome: 'Cleans 300 sq ft in ~13 min' },
                        { specs: '270 m³/hr', outcome: 'Cleans 300 sq ft in ~11 min' },
                        { specs: '220 m³/hr', outcome: 'Cleans 300 sq ft in ~14 min' },
                        { specs: '303 m³/hr', outcome: 'Cleans 300 sq ft in ~10 min' },
                        { specs: '250 m³/hr', outcome: 'Cleans 300 sq ft in ~12 min' }
                    ]
                },
                {
                    attr: 'Room coverage',
                    best: -1,
                    values: [
                        { specs: 'Up to 450 sq ft', outcome: 'Covers large bedrooms + living rooms' },
                        { specs: 'Up to 400 sq ft', outcome: 'Covers most bedrooms' },
                        { specs: 'Up to 480 sq ft', outcome: 'Covers large rooms' },
                        { specs: 'Up to 400 sq ft', outcome: 'Covers most bedrooms' },
                        { specs: 'Up to 528 sq ft', outcome: 'Covers very large rooms' },
                        { specs: 'Up to 465 sq ft', outcome: 'Covers large rooms' }
                    ]
                },
                {
                    attr: 'Cleaning speed feel',
                    best: 0,
                    values: [
                        { specs: '<12 min for 300 sq ft', outcome: 'Noticeably fresher air within minutes' },
                        { specs: '~15 min for 300 sq ft', outcome: 'Takes a bit longer to feel the difference' },
                        { specs: '<12 min for 300 sq ft', outcome: 'Fast, but louder at high speed' },
                        { specs: '~16 min for 300 sq ft', outcome: 'Slower in real-world dusty rooms' },
                        { specs: '<10 min for 300 sq ft', outcome: 'Very fast but at a higher price' },
                        { specs: '~13 min for 300 sq ft', outcome: 'Decent speed for the price' }
                    ]
                }
            ]
        },
        {
            name: 'Noise vs Airflow',
            rows: [
                {
                    attr: 'Sleep mode noise',
                    best: 0,
                    values: [
                        { specs: '24 dB', outcome: 'Quieter than a whisper' },
                        { specs: '26 dB', outcome: 'Very quiet, barely audible' },
                        { specs: '29 dB', outcome: 'Noticeable in very quiet rooms' },
                        { specs: '30 dB', outcome: 'Faint hum, audible at night' },
                        { specs: '22 dB', outcome: 'Near-silent operation' },
                        { specs: '28 dB', outcome: 'Quiet, slight fan hum' }
                    ]
                },
                {
                    attr: 'Max speed noise',
                    best: 0,
                    values: [
                        { specs: '50 dB', outcome: 'Conversational level — not harsh' },
                        { specs: '52 dB', outcome: 'Noticeable but manageable' },
                        { specs: '56 dB', outcome: 'Can interrupt conversation' },
                        { specs: '58 dB', outcome: 'Quite loud on turbo' },
                        { specs: '49 dB', outcome: 'Impressive for the CADR' },
                        { specs: '55 dB', outcome: 'Loud on high, needs a separate room' }
                    ]
                },
                {
                    attr: 'Fan speed levels',
                    best: -1,
                    values: [
                        { specs: '4 speeds + auto', outcome: 'Enough range for day & night' },
                        { specs: '3 speeds + auto', outcome: 'Fewer manual options' },
                        { specs: '3 speeds + auto', outcome: 'Fewer manual options' },
                        { specs: '3 speeds + auto', outcome: 'Basic speed control' },
                        { specs: '4 speeds + auto', outcome: 'Good range for all conditions' },
                        { specs: '3 speeds + auto', outcome: 'Basic speed control' }
                    ]
                }
            ]
        },
        {
            name: 'Filtration & Filter Life',
            rows: [
                {
                    attr: 'Filter type',
                    best: 0,
                    values: [
                        { specs: 'H13 HEPA 3-in-1', outcome: 'Pre-filter + HEPA + carbon in one unit' },
                        { specs: 'H13 HEPA 3-in-1', outcome: 'Pre-filter + HEPA + carbon in one unit' },
                        { specs: 'HEPA + NanoProtect', outcome: 'Proprietary multi-layer system' },
                        { specs: 'H13 HEPA 3-in-1', outcome: 'Standard combo filter' },
                        { specs: 'HEPA + carbon', outcome: 'Separate HEPA and carbon layers' },
                        { specs: 'H13 HEPA 3-in-1', outcome: 'Standard combo filter' }
                    ]
                },
                {
                    attr: 'Filter life',
                    best: 0,
                    values: [
                        { specs: '~12 months', outcome: 'Replace about once a year' },
                        { specs: '6–8 months', outcome: 'Replacement every season or two' },
                        { specs: '~12 months', outcome: 'Replace about once a year' },
                        { specs: '6–8 months', outcome: 'Needs frequent checks in dusty areas' },
                        { specs: '~12 months', outcome: 'Replace about once a year' },
                        { specs: '8–10 months', outcome: 'Varies with pollution level' }
                    ]
                },
                {
                    attr: 'Filter replacement cost',
                    best: 0,
                    values: [
                        { specs: '~₹2,000 (sub: less)', outcome: '~₹165/mo, cheaper with subscription' },
                        { specs: '~₹2,500', outcome: '~₹350/mo effective cost' },
                        { specs: '~₹3,500', outcome: '~₹290/mo effective cost' },
                        { specs: '~₹2,200', outcome: '~₹310/mo effective cost' },
                        { specs: '~₹4,000', outcome: '~₹330/mo effective cost' },
                        { specs: '~₹2,800', outcome: '~₹310/mo effective cost' }
                    ]
                }
            ]
        },
        {
            name: 'Sensors & Auto Mode',
            rows: [
                {
                    attr: 'Sensor type',
                    best: 0,
                    values: [
                        { specs: 'Laser PM2.5', outcome: 'Reacts to smoke & cooking in seconds' },
                        { specs: 'Infrared dust', outcome: 'Slower response to fine particles' },
                        { specs: 'Laser PM2.5', outcome: 'Good response to particle changes' },
                        { specs: 'Infrared dust', outcome: 'Misses some fine particle spikes' },
                        { specs: 'Laser PM2.5', outcome: 'Fast and accurate readings' },
                        { specs: 'Infrared dust', outcome: 'Adequate for general use' }
                    ]
                },
                {
                    attr: 'Real-time AQI display',
                    best: 0,
                    values: [
                        { specs: 'Yes — PM2.5 number', outcome: 'See exact pollution level on device' },
                        { specs: 'LED color ring', outcome: 'Color hint, no exact number' },
                        { specs: 'Yes — numeric + color', outcome: 'Clear numeric readout' },
                        { specs: 'LED color ring', outcome: 'Color hint, no exact number' },
                        { specs: 'Yes — numeric + color', outcome: 'Clear numeric readout' },
                        { specs: 'LED color ring', outcome: 'Color hint, no exact number' }
                    ]
                },
                {
                    attr: 'Auto mode accuracy',
                    best: 0,
                    values: [
                        { specs: 'High — laser-based', outcome: 'Adjusts reliably to cooking, incense, dust' },
                        { specs: 'Moderate', outcome: 'May miss mild pollution spikes' },
                        { specs: 'High', outcome: 'Responds well to most changes' },
                        { specs: 'Moderate', outcome: 'Slow to ramp up on mild spikes' },
                        { specs: 'High', outcome: 'Responds well to most changes' },
                        { specs: 'Moderate', outcome: 'Adequate for steady pollution' }
                    ]
                },
                {
                    attr: 'Smart connectivity',
                    best: 0,
                    values: [
                        { specs: 'WiFi + Alexa + Google', outcome: 'Voice control & app monitoring' },
                        { specs: 'WiFi + Alexa + Google', outcome: 'Voice control & app monitoring' },
                        { specs: 'WiFi + app', outcome: 'App control, limited voice' },
                        { specs: 'WiFi + Alexa + Google', outcome: 'Voice control & app monitoring' },
                        { specs: 'WiFi + app', outcome: 'App only, basic controls' },
                        { specs: 'No WiFi', outcome: 'No remote control or monitoring' }
                    ]
                }
            ]
        },
        {
            name: 'Ownership Cost',
            rows: [
                {
                    attr: 'Purchase price',
                    best: 0,
                    values: [
                        { specs: 'From ₹5,999', outcome: 'Premium features at mid-range price' },
                        { specs: '₹7,000–10,000', outcome: 'Mid-range pricing' },
                        { specs: '₹10,000–15,000', outcome: 'Higher upfront investment' },
                        { specs: '₹5,000–8,000', outcome: 'Budget-friendly entry point' },
                        { specs: '₹18,000–25,000', outcome: 'Premium price point' },
                        { specs: '₹8,000–12,000', outcome: 'Mid-to-high pricing' }
                    ]
                },
                {
                    attr: 'Subscription option',
                    best: 0,
                    values: [
                        { specs: 'Yes — auto filter delivery', outcome: 'Never forget a filter change' },
                        { specs: 'No', outcome: 'Manual reorder each time' },
                        { specs: 'No', outcome: 'Manual reorder each time' },
                        { specs: 'No', outcome: 'Manual reorder each time' },
                        { specs: 'No', outcome: 'Manual reorder each time' },
                        { specs: 'No', outcome: 'Manual reorder each time' }
                    ]
                },
                {
                    attr: 'Energy use',
                    best: -1,
                    values: [
                        { specs: '45W max', outcome: '~₹120/mo at 12hr daily use' },
                        { specs: '40W max', outcome: '~₹105/mo at 12hr daily use' },
                        { specs: '50W max', outcome: '~₹135/mo at 12hr daily use' },
                        { specs: '38W max', outcome: '~₹100/mo at 12hr daily use' },
                        { specs: '46W max', outcome: '~₹125/mo at 12hr daily use' },
                        { specs: '55W max', outcome: '~₹150/mo at 12hr daily use' }
                    ]
                },
                {
                    attr: '2-year total cost',
                    best: 0,
                    values: [
                        { specs: '~₹10,500', outcome: 'Lowest total cost with subscription' },
                        { specs: '~₹14,500', outcome: 'Frequent filter costs add up' },
                        { specs: '~₹19,000', outcome: 'High upfront + moderate filter cost' },
                        { specs: '~₹11,500', outcome: 'Low upfront but more filter changes' },
                        { specs: '~₹30,000', outcome: 'Premium price + premium filters' },
                        { specs: '~₹16,000', outcome: 'Mid-range total ownership' }
                    ]
                }
            ]
        },
        {
            name: 'Warranty & Support',
            rows: [
                {
                    attr: 'Warranty period',
                    best: -1,
                    values: [
                        { specs: '1 year', outcome: '1 year full coverage' },
                        { specs: '2 years', outcome: '2 years coverage' },
                        { specs: '2 years', outcome: '2 years coverage' },
                        { specs: '1 year', outcome: '1 year full coverage' },
                        { specs: '3 years', outcome: 'Industry-leading warranty' },
                        { specs: '1 year', outcome: '1 year full coverage' }
                    ]
                },
                {
                    attr: 'Support type',
                    best: 0,
                    values: [
                        { specs: 'Direct brand support', outcome: 'Talk directly to Hawaa — no middlemen' },
                        { specs: 'Amazon/3rd party', outcome: 'Support via marketplace seller' },
                        { specs: 'Authorized service centers', outcome: 'Service center network, may need visits' },
                        { specs: 'Authorized service centers', outcome: 'Service center network, limited cities' },
                        { specs: 'Authorized service centers', outcome: 'Service center network, metro cities' },
                        { specs: 'Authorized service centers', outcome: 'Service center network, limited reach' }
                    ]
                },
                {
                    attr: 'PAN India coverage',
                    best: 0,
                    values: [
                        { specs: 'Yes', outcome: 'Support across India, no pin-code limits' },
                        { specs: 'Via Amazon', outcome: 'Depends on marketplace policy' },
                        { specs: 'Metro cities', outcome: 'Service centers in major cities only' },
                        { specs: 'Metro cities', outcome: 'Service centers in major cities only' },
                        { specs: 'Limited', outcome: 'Select cities with service presence' },
                        { specs: 'Limited', outcome: 'Select cities with service presence' }
                    ]
                }
            ]
        }
    ];

    // ---- SVG TEMPLATES ----
    var SVG_YES = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
    var SVG_NO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    // ---- STATE ----
    var showDiffOnly = false;
    var showOutcomes = false;

    // ---- DOM REFS ----
    var stickyBar = document.getElementById('cmp-sticky-bar');
    var progressBar = document.getElementById('cmp-progress');
    var progressFill = document.getElementById('cmp-progress-fill');
    var toggleDiff = document.getElementById('toggle-diff');
    var toggleView = document.getElementById('toggle-view');
    var backTopBtn = document.getElementById('cmp-back-top');

    // ---- RENDER TABLES ----
    function renderTables() {
        var tableEls = document.querySelectorAll('.cmp-table');
        tableEls.forEach(function (el) {
            var catIdx = parseInt(el.getAttribute('data-category-index'), 10);
            var cat = CATEGORIES[catIdx];
            if (!cat) return;
            el.innerHTML = buildCategoryTable(cat);
        });
        applyDiffFilter();
    }

    function buildCategoryTable(cat) {
        var html = '';

        // Swipe cue (mobile)
        html += '<div class="cmp-swipe-cue"><span>Swipe to compare</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></div>';

        // Mobile brand selector
        html += '<div class="cmp-mobile-selector">';
        BRANDS.forEach(function (b, i) {
            html += '<button class="cmp-mobile-selector-btn' + (i === 0 ? ' active' : '') + '" data-scroll-to="' + i + '">' + b + '</button>';
        });
        html += '</div>';

        // Desktop header
        html += '<div class="cmp-table-header">';
        html += '<div class="cmp-table-header-cell">Attribute</div>';
        BRANDS.forEach(function (b, i) {
            html += '<div class="cmp-table-header-cell' + (i === 0 ? ' is-hawaa' : '') + '">' + b + '</div>';
        });
        html += '</div>';

        // Rows
        cat.rows.forEach(function (row) {
            var allSame = row.values.every(function (v) {
                return v.specs === row.values[0].specs;
            });

            html += '<div class="cmp-table-row' + (allSame ? ' all-same' : '') + '">';
            html += '<div class="cmp-row-attr">' + row.attr + '</div>';
            html += '<div class="cmp-row-cells">';

            row.values.forEach(function (v, i) {
                var isHawaa = i === 0;
                var isBest = row.best === i;
                var cls = 'cmp-row-cell';
                if (isHawaa) cls += ' is-hawaa';
                if (isBest) cls += ' is-best';

                var displayVal = showOutcomes ? v.outcome : v.specs;

                // Yes/No rendering
                var cellContent;
                if (v.specs === 'Yes' && !showOutcomes) {
                    cellContent = '<span class="cmp-cell-yes">' + SVG_YES + ' Yes</span>';
                } else if (v.specs === 'No' && !showOutcomes) {
                    cellContent = '<span class="cmp-cell-no">' + SVG_NO + ' No</span>';
                } else {
                    cellContent = displayVal;
                }

                html += '<div class="' + cls + '">';
                html += '<span class="cmp-cell-brand">' + BRANDS[i] + '</span>';
                html += '<span class="cmp-cell-value">' + cellContent + '</span>';
                html += '</div>';
            });

            html += '</div>'; // cells
            html += '</div>'; // row
        });

        return html;
    }

    // ---- DIFF FILTER ----
    function applyDiffFilter() {
        var rows = document.querySelectorAll('.cmp-table-row');
        rows.forEach(function (row) {
            if (showDiffOnly && row.classList.contains('all-same')) {
                row.classList.add('diff-hidden');
            } else {
                row.classList.remove('diff-hidden');
            }
        });
    }

    // ---- MOBILE BRAND SELECTOR CLICK ----
    function initMobileSelectors() {
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('.cmp-mobile-selector-btn');
            if (!btn) return;
            var idx = parseInt(btn.getAttribute('data-scroll-to'), 10);
            var container = btn.closest('.cmp-table');
            if (!container) return;

            // Highlight active
            container.querySelectorAll('.cmp-mobile-selector-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            // Scroll the row cells
            container.querySelectorAll('.cmp-row-cells').forEach(function (cells) {
                var target = cells.children[idx];
                if (target) {
                    cells.scrollTo({ left: target.offsetLeft - cells.offsetLeft, behavior: 'smooth' });
                }
            });
        });
    }

    // ---- STICKY BAR VISIBILITY ----
    function updateStickyBar() {
        var compSection = document.getElementById('comparison');
        if (!compSection) return;
        var rect = compSection.getBoundingClientRect();
        var shouldShow = rect.top <= 80;
        stickyBar.classList.toggle('visible', shouldShow);
    }

    // ---- SCROLL PROGRESS ----
    function updateScrollProgress() {
        var cats = document.querySelectorAll('.cmp-category');
        if (!cats.length) return;

        var catSections = Array.from(cats);
        var firstTop = catSections[0].getBoundingClientRect().top + window.scrollY;
        var lastBottom = catSections[catSections.length - 1].getBoundingClientRect().bottom + window.scrollY;
        var totalHeight = lastBottom - firstTop;
        var scrolled = window.scrollY + window.innerHeight * 0.4 - firstTop;
        var progress = Math.max(0, Math.min(1, scrolled / totalHeight));

        if (progressFill) {
            progressFill.style.width = (progress * 100) + '%';
        }

        // Show/hide progress bar
        var inRange = catSections[0].getBoundingClientRect().top <= 200;
        progressBar.classList.toggle('visible', inRange);

        // Highlight steps
        var steps = document.querySelectorAll('.cmp-progress-step');
        var activeIdx = 0;

        catSections.forEach(function (sec, i) {
            var r = sec.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.4) {
                activeIdx = i;
            }
        });

        steps.forEach(function (step, i) {
            step.classList.remove('active', 'done');
            if (i === activeIdx) step.classList.add('active');
            else if (i < activeIdx) step.classList.add('done');
        });
    }

    // ---- PROGRESS STEP CLICK ----
    function initProgressClicks() {
        document.querySelectorAll('.cmp-progress-step').forEach(function (step) {
            step.addEventListener('click', function () {
                var target = document.getElementById(step.getAttribute('data-target'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---- BRAND CHIP CLICK (sticky bar — scroll to highlight on mobile) ----
    function initBrandChips() {
        document.querySelectorAll('.cmp-brand-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                var brand = chip.getAttribute('data-brand');
                var idx = BRAND_KEYS.indexOf(brand);
                if (idx < 0) return;

                // Highlight chip
                document.querySelectorAll('.cmp-brand-chip').forEach(function (c) {
                    c.classList.remove('active');
                });
                chip.classList.add('active');

                // On mobile, scroll all row-cell containers to that brand
                if (window.innerWidth < 768) {
                    document.querySelectorAll('.cmp-row-cells').forEach(function (cells) {
                        var target = cells.children[idx];
                        if (target) {
                            cells.scrollTo({ left: target.offsetLeft - cells.offsetLeft, behavior: 'smooth' });
                        }
                    });
                    // Also update mobile selectors
                    document.querySelectorAll('.cmp-mobile-selector-btn').forEach(function (b) {
                        b.classList.toggle('active', parseInt(b.getAttribute('data-scroll-to'), 10) === idx);
                    });
                }
            });
        });
    }

    // ---- TOGGLE HANDLERS ----
    function initToggles() {
        if (toggleDiff) {
            toggleDiff.addEventListener('change', function () {
                showDiffOnly = this.checked;
                applyDiffFilter();
            });
        }

        if (toggleView) {
            toggleView.addEventListener('change', function () {
                showOutcomes = this.checked;
                renderTables();
                initMobileSelectors();
            });
        }
    }

    // ---- BACK TO TOP ----
    function initBackTop() {
        if (backTopBtn) {
            backTopBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // ---- SWIPE EDGE DETECTION ----
    function initSwipeEdge() {
        document.querySelectorAll('.cmp-row-cells').forEach(function (cells) {
            cells.addEventListener('scroll', function () {
                var wrap = cells.closest('.cmp-table-wrap');
                if (!wrap) return;
                var atEnd = cells.scrollLeft + cells.clientWidth >= cells.scrollWidth - 8;
                wrap.classList.toggle('scrolled-end', atEnd);
            });
        });
    }

    // ---- SCROLL LISTENER ----
    var scrollTicking = false;
    function onScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateStickyBar();
                updateScrollProgress();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    // ---- INIT ----
    function init() {
        renderTables();
        initMobileSelectors();
        initToggles();
        initProgressClicks();
        initBrandChips();
        initBackTop();
        initSwipeEdge();

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
