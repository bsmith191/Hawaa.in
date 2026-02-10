/* ========================================
   COMPARISON PAGE — Data Model & Interactivity
======================================== */

(function () {
    'use strict';

    // ---- BRAND ORDER (matching provided comparison table) ----
    var BRANDS = ['Hawaa Edge', 'Dyson', 'Coway', 'Xiaomi'];
    var BRAND_KEYS = ['hawaa', 'dyson', 'coway', 'xiaomi'];
    var BRAND_COUNT = BRANDS.length;

    // ---- COMPARISON DATA ----
    // Each row: { attr, best (brand index, -1 = no best), values: [{ specs, outcome }] }
    var CATEGORIES = [
        {
            name: 'Cleaning Performance',
            rows: [
                {
                    attr: 'CADR Rating',
                    best: 0,
                    values: [
                        { specs: '410 m³/h', outcome: 'Cleans a large room in under 10 min' },
                        { specs: '370 m³/h', outcome: 'Good speed for medium rooms' },
                        { specs: '370 m³/h', outcome: 'Good speed for medium rooms' },
                        { specs: '400 m³/h', outcome: 'Fast cleaning for most rooms' }
                    ]
                },
                {
                    attr: 'Room coverage',
                    best: 0,
                    values: [
                        { specs: 'Up to 500 sq ft', outcome: 'Covers large living rooms easily' },
                        { specs: 'Up to 400 sq ft', outcome: 'Best for medium-sized rooms' },
                        { specs: 'Up to 430 sq ft', outcome: 'Covers most bedrooms and halls' },
                        { specs: 'Up to 480 sq ft', outcome: 'Covers large rooms' }
                    ]
                }
            ]
        },
        {
            name: 'Noise & Comfort',
            rows: [
                {
                    attr: 'Noise level',
                    best: 0,
                    values: [
                        { specs: '24 dB (sleep mode)', outcome: 'Quieter than a whisper — sleep-friendly' },
                        { specs: '42 dB', outcome: 'Noticeable hum, may disturb light sleepers' },
                        { specs: '42 dB', outcome: 'Noticeable hum, may disturb light sleepers' },
                        { specs: '40 dB', outcome: 'Faint fan sound, acceptable for most' }
                    ]
                },
                {
                    attr: 'Fan speed modes',
                    best: -1,
                    values: [
                        { specs: '4 speeds + auto', outcome: 'Flexible control for day & night' },
                        { specs: '10-speed airflow', outcome: 'Very granular speed control' },
                        { specs: '3 speeds + auto', outcome: 'Standard speed options' },
                        { specs: '3 speeds + auto', outcome: 'Standard speed options' }
                    ]
                }
            ]
        },
        {
            name: 'Filtration & Filter Life',
            rows: [
                {
                    attr: 'Filter type',
                    best: -1,
                    values: [
                        { specs: 'H13 HEPA 3-in-1', outcome: 'Pre-filter + HEPA + carbon in one unit' },
                        { specs: 'HEPA + carbon', outcome: 'Sealed filtration system' },
                        { specs: 'HEPA + carbon', outcome: 'Multi-stage filtration' },
                        { specs: 'H13 HEPA 3-in-1', outcome: 'Standard combo filter' }
                    ]
                },
                {
                    attr: 'Filter replacement cost',
                    best: 0,
                    values: [
                        { specs: '₹1,499', outcome: 'Very affordable replacements' },
                        { specs: '₹5,490', outcome: 'Expensive — adds up over time' },
                        { specs: '₹5,400', outcome: 'Expensive — adds up over time' },
                        { specs: '₹3,200', outcome: 'Moderate replacement cost' }
                    ]
                },
                {
                    attr: 'Filter life',
                    best: -1,
                    values: [
                        { specs: '~12 months', outcome: 'Replace about once a year' },
                        { specs: '~12 months', outcome: 'Replace about once a year' },
                        { specs: '~12 months', outcome: 'Replace about once a year' },
                        { specs: '6–12 months', outcome: 'Varies with pollution level' }
                    ]
                }
            ]
        },
        {
            name: 'Smart Features',
            rows: [
                {
                    attr: 'Smart features',
                    best: 0,
                    values: [
                        { specs: 'Gesture + voice control', outcome: 'Wave to control — no app needed' },
                        { specs: 'App + voice control', outcome: 'App control with Alexa/Google' },
                        { specs: 'None', outcome: 'No smart features available' },
                        { specs: 'App + voice control', outcome: 'App control with Alexa/Google' }
                    ]
                },
                {
                    attr: 'Real-time AQI display',
                    best: -1,
                    values: [
                        { specs: 'Yes — PM2.5 numeric', outcome: 'See exact pollution level on device' },
                        { specs: 'Yes — LCD display', outcome: 'Real-time air quality readout' },
                        { specs: 'LED color indicator', outcome: 'Color hint, no exact number' },
                        { specs: 'Yes — OLED display', outcome: 'Real-time readout with graphs' }
                    ]
                },
                {
                    attr: 'Auto mode',
                    best: -1,
                    values: [
                        { specs: 'Yes — laser sensor', outcome: 'Reacts to cooking smoke in seconds' },
                        { specs: 'Yes — sensor-based', outcome: 'Auto adjusts based on air quality' },
                        { specs: 'Yes — sensor-based', outcome: 'Auto adjusts based on air quality' },
                        { specs: 'Yes — sensor-based', outcome: 'Auto adjusts based on air quality' }
                    ]
                }
            ]
        },
        {
            name: 'Price & Value',
            rows: [
                {
                    attr: 'Price',
                    best: 0,
                    values: [
                        { specs: 'Best Value', outcome: 'Best performance per rupee spent' },
                        { specs: '₹41,900', outcome: 'Premium price — 7x more expensive' },
                        { specs: '₹28,900', outcome: 'High-end pricing' },
                        { specs: '₹11,499', outcome: 'Budget-friendly entry point' }
                    ]
                },
                {
                    attr: 'Subscription option',
                    best: 0,
                    values: [
                        { specs: 'Yes — auto filter delivery', outcome: 'Never forget a filter change' },
                        { specs: 'No', outcome: 'Manual reorder each time' },
                        { specs: 'No', outcome: 'Manual reorder each time' },
                        { specs: 'No', outcome: 'Manual reorder each time' }
                    ]
                }
            ]
        },
        {
            name: 'Warranty & Support',
            rows: [
                {
                    attr: 'Warranty coverage',
                    best: 0,
                    values: [
                        { specs: '2 years', outcome: '2 years of full coverage' },
                        { specs: '1 year', outcome: '1 year standard warranty' },
                        { specs: '1 year', outcome: '1 year standard warranty' },
                        { specs: '2 years', outcome: '2 years coverage' }
                    ]
                },
                {
                    attr: 'Support type',
                    best: 0,
                    values: [
                        { specs: 'Direct brand support', outcome: 'Talk directly to Hawaa — no middlemen' },
                        { specs: 'Service centers', outcome: 'Limited authorized service locations' },
                        { specs: 'Service centers', outcome: 'Service centers in select cities' },
                        { specs: 'Service centers', outcome: 'Service centers in metro cities' }
                    ]
                },
                {
                    attr: 'PAN India service',
                    best: 0,
                    values: [
                        { specs: 'Yes', outcome: 'Support across India, no pin-code limits' },
                        { specs: 'Limited', outcome: 'Major cities only' },
                        { specs: 'Limited', outcome: 'Select cities with service presence' },
                        { specs: 'Yes', outcome: 'Wide service network via Xiaomi stores' }
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
    var progressBar = document.getElementById('cmp-progress');
    var progressFill = document.getElementById('cmp-progress-fill');
    var toggleDiff = document.getElementById('toggle-diff');
    var toggleView = document.getElementById('toggle-view');

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

        // Mobile: swipe cue
        html += '<div class="cmp-swipe-cue"><span>Swipe to compare</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></div>';

        // Desktop header row
        html += '<div class="cmp-table-header">';
        html += '<div class="cmp-table-header-cell"></div>';
        BRANDS.forEach(function (b, i) {
            html += '<div class="cmp-table-header-cell' + (i === 0 ? ' is-hawaa' : '') + '">' + b + '</div>';
        });
        html += '</div>';

        // Data rows
        cat.rows.forEach(function (row) {
            var allSame = row.values.every(function (v) {
                return v.specs === row.values[0].specs;
            });

            html += '<div class="cmp-table-row' + (allSame ? ' all-same' : '') + '">';

            // Attribute label (sticky left on mobile + desktop)
            html += '<div class="cmp-row-attr">' + row.attr + '</div>';

            // Hawaa cell (sticky on mobile)
            var hawaaVal = row.values[0];
            var hawaaBest = row.best === 0;
            var hawaaDisplay = showOutcomes ? hawaaVal.outcome : hawaaVal.specs;
            var hawaaCellContent = formatCellContent(hawaaVal, hawaaDisplay);
            html += '<div class="cmp-row-cell is-hawaa' + (hawaaBest ? ' is-best' : '') + '">';
            html += '<span class="cmp-cell-brand">' + BRANDS[0] + '</span>';
            html += '<span class="cmp-cell-value">' + hawaaCellContent + '</span>';
            html += '</div>';

            // Other brand cells (scrollable on mobile)
            html += '<div class="cmp-row-scroll">';
            for (var i = 1; i < BRAND_COUNT; i++) {
                var v = row.values[i];
                var isBest = row.best === i;
                var displayVal = showOutcomes ? v.outcome : v.specs;
                var cellContent = formatCellContent(v, displayVal);

                html += '<div class="cmp-row-cell' + (isBest ? ' is-best' : '') + '">';
                html += '<span class="cmp-cell-brand">' + BRANDS[i] + '</span>';
                html += '<span class="cmp-cell-value">' + cellContent + '</span>';
                html += '</div>';
            }
            html += '</div>'; // scroll

            html += '</div>'; // row
        });

        return html;
    }

    function formatCellContent(v, displayVal) {
        if (v.specs === 'Yes' && !showOutcomes) {
            return '<span class="cmp-cell-yes">' + SVG_YES + ' Yes</span>';
        } else if (v.specs === 'No' && !showOutcomes) {
            return '<span class="cmp-cell-no">' + SVG_NO + ' No</span>';
        } else if (v.specs === 'None' && !showOutcomes) {
            return '<span class="cmp-cell-no">' + SVG_NO + ' None</span>';
        }
        return displayVal;
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

    // ---- SCROLL PROGRESS ----
    function updateScrollProgress() {
        var cats = document.querySelectorAll('.cmp-category');
        if (!cats.length || !progressBar) return;

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
        var pastEnd = catSections[catSections.length - 1].getBoundingClientRect().bottom < 0;
        progressBar.classList.toggle('visible', inRange && !pastEnd);

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
            });
        }
    }

    // ---- MOBILE SWIPE EDGE DETECTION ----
    function initSwipeEdge() {
        document.addEventListener('scroll', function (e) {
            var el = e.target;
            if (!el.classList || !el.classList.contains('cmp-row-scroll')) return;
            var wrap = el.closest('.cmp-table-wrap');
            if (!wrap) return;
            var atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
            wrap.classList.toggle('scrolled-end', atEnd);
        }, true);
    }

    // ---- HEADER SCROLL CLASS (for this page — always apply .scrolled) ----
    function updateHeader() {
        var header = document.getElementById('header');
        if (!header) return;
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        }
    }

    // ---- SCROLL LISTENER ----
    var scrollTicking = false;
    function onScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateScrollProgress();
                updateHeader();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    // ---- INIT ----
    function init() {
        renderTables();
        initToggles();
        initProgressClicks();
        initSwipeEdge();

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        // Force header to scrolled state on this page (dark hero)
        var header = document.getElementById('header');
        if (header) header.classList.add('scrolled');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
