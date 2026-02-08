// ========================================
// Buy Page - Purchase Logic
// ========================================

// State
let purchaseType = 'onetime'; // 'onetime' or 'subscribe'
let filterInterval = 5; // 5 or 6 months

const PRICES = {
    onetime: 5999,
    subscribe: 5499
};

// DOM Elements
const btnOnetime = document.getElementById('btn-onetime');
const btnSubscribe = document.getElementById('btn-subscribe');
const subOptions = document.getElementById('buy-sub-options');
const sub5 = document.getElementById('sub-5');
const sub6 = document.getElementById('sub-6');
const priceDisplay = document.getElementById('buy-price');
const priceNote = document.getElementById('buy-price-note');
const ctaText = document.getElementById('buy-cta-text');
const stickyPrice = document.getElementById('buy-sticky-price');
const stickyLabel = document.getElementById('buy-sticky-label');

// Format price with Indian Rupee
function formatPrice(amount) {
    return '\u20B9' + amount.toLocaleString('en-IN');
}

// Update all price displays
function updateUI() {
    const price = PRICES[purchaseType];
    const priceStr = formatPrice(price);

    priceDisplay.textContent = priceStr;
    stickyPrice.textContent = priceStr;

    if (purchaseType === 'subscribe') {
        priceNote.textContent = 'Inclusive of all taxes \u00B7 Filter every ' + filterInterval + ' months';
        ctaText.textContent = 'Subscribe \u2014 ' + priceStr;
        stickyLabel.textContent = 'Subscribe \u00B7 ' + filterInterval + 'mo filter';
    } else {
        priceNote.textContent = 'Inclusive of all taxes';
        ctaText.textContent = 'Buy Now \u2014 ' + priceStr;
        stickyLabel.textContent = 'One-time';
    }
}

// Purchase type selection
function selectPurchaseType(type) {
    purchaseType = type;

    // Toggle active class on buttons
    btnOnetime.classList.toggle('active', type === 'onetime');
    btnSubscribe.classList.toggle('active', type === 'subscribe');

    // Show/hide subscription options
    if (type === 'subscribe') {
        subOptions.classList.add('visible');
    } else {
        subOptions.classList.remove('visible');
    }

    updateUI();
}

btnOnetime.addEventListener('click', () => selectPurchaseType('onetime'));
btnSubscribe.addEventListener('click', () => selectPurchaseType('subscribe'));

// Filter interval selection
function selectInterval(interval) {
    filterInterval = interval;

    sub5.classList.toggle('active', interval === 5);
    sub6.classList.toggle('active', interval === 6);

    updateUI();
}

sub5.addEventListener('click', () => selectInterval(5));
sub6.addEventListener('click', () => selectInterval(6));

// ========================================
// Pincode Delivery Check
// ========================================
const pincodeInput = document.getElementById('buy-pincode');
const pincodeBtn = document.getElementById('buy-pincode-btn');
const deliveryResult = document.getElementById('buy-delivery-result');

function checkPincode() {
    const pincode = pincodeInput.value.trim();

    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
        deliveryResult.textContent = 'Please enter a valid 6-digit pincode';
        deliveryResult.className = 'buy-delivery-result error';
        return;
    }

    // Simulate delivery check
    deliveryResult.textContent = 'Checking...';
    deliveryResult.className = 'buy-delivery-result';

    setTimeout(() => {
        const days = Math.floor(Math.random() * 4) + 3; // 3-6 days
        const date = new Date();
        date.setDate(date.getDate() + days);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const dateStr = date.toLocaleDateString('en-IN', options);

        deliveryResult.textContent = 'Estimated delivery by ' + dateStr + ' \u00B7 Free shipping';
        deliveryResult.className = 'buy-delivery-result success';
    }, 600);
}

pincodeBtn.addEventListener('click', checkPincode);
pincodeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPincode();
});

// Only allow numeric input
pincodeInput.addEventListener('input', () => {
    pincodeInput.value = pincodeInput.value.replace(/\D/g, '');
});

// ========================================
// Sticky Bottom Bar (Mobile)
// ========================================
const stickyBottom = document.getElementById('buy-sticky-bottom');
const buyCtaBtn = document.getElementById('buy-cta-btn');

function handleStickyBar() {
    if (!buyCtaBtn || !stickyBottom) return;

    const rect = buyCtaBtn.getBoundingClientRect();
    const isOffScreen = rect.bottom < 0 || rect.top > window.innerHeight;

    if (isOffScreen) {
        stickyBottom.classList.add('visible');
    } else {
        stickyBottom.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleStickyBar);
window.addEventListener('resize', handleStickyBar);
document.addEventListener('DOMContentLoaded', handleStickyBar);

// Sticky btn scrolls to purchase section
const stickyBtn = document.getElementById('buy-sticky-btn');
if (stickyBtn) {
    stickyBtn.addEventListener('click', () => {
        buyCtaBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Initialize
updateUI();
