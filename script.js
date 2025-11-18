// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading');

    // Hide loading screen after 1 second
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);

    // Remove loading screen from DOM after animation completes
    loadingScreen.addEventListener('transitionend', () => {
        if (loadingScreen.classList.contains('hidden')) {
            loadingScreen.remove();
        }
    });
});

// Scroll Animations
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('in-view');
};

const hideScrollElement = (element) => {
    element.classList.remove('in-view');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// Throttle scroll event
let throttleTimer;
const throttle = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

window.addEventListener('scroll', () => {
    throttle(handleScrollAnimation, 250);
});

// Navigation
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    // Check if the click is outside both navToggle (if it exists) and navLinks
    let clickedOutsideNavToggle = navToggle ? !navToggle.contains(e.target) : true;
    // navLinks is expected to exist, but a check doesn't hurt for robustness.
    // If navLinks is null, treat as clicked outside.
    let clickedOutsideNavLinks = navLinks ? !navLinks.contains(e.target) : true;

    if (clickedOutsideNavToggle && clickedOutsideNavLinks) {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (navToggle) { // Only try to access classList if navToggle exists
            navToggle.classList.remove('active');
        }
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) { // navLinks is expected to exist
            navLinks.classList.remove('active');
        }
        if (navToggle) { // Only try to access classList if navToggle exists
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');

tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = tooltipText;
        document.body.appendChild(tooltipElement);

        const rect = tooltip.getBoundingClientRect();
        tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
        tooltipElement.style.left = `${rect.left + (rect.width - tooltipElement.offsetWidth) / 2}px`;
    });

    tooltip.addEventListener('mouseleave', () => {
        const tooltipElement = document.querySelector('.tooltip');
        if (tooltipElement) {
            tooltipElement.remove();
        }
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to apply the theme (visuals and checkbox state)
function applyThemeVisuals(isDark) {
    if (isDark) {
        root.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    } else {
        root.classList.remove('dark-mode');
        if (themeToggle) themeToggle.checked = false;
    }
}

// Function to set the theme and store it in localStorage
function setThemePreference(isDark) {
    applyThemeVisuals(isDark);
    try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
        console.warn('LocalStorage not available for theme saving:', e.message);
    }
}

// Event listener for the manual toggle switch
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        setThemePreference(themeToggle.checked);
    });
}

// Listener for OS theme changes
// This will apply OS preference only if no manual theme has been saved by the user.
prefersDarkScheme.addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) { // Only apply OS preference if no manual theme is saved
        applyThemeVisuals(e.matches);
    }
});

// Initial theme setup on page load
function initializeTheme() {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyThemeVisuals(savedTheme === 'dark');
        } else {
            applyThemeVisuals(prefersDarkScheme.matches); // Default to OS preference if nothing saved
        }
    } catch (e) {
        console.warn('Error initializing theme:', e.message);
        applyThemeVisuals(false); // Default to light theme
    }
}

initializeTheme(); // Set the initial theme when the script loads

// Initialize scroll animations on page load
handleScrollAnimation();

// Floating Action Button functionality
const fabContainer = document.querySelector('.fab-container');
const fabMain = document.querySelector('.fab-main');

if (fabContainer && fabMain) {
    fabMain.addEventListener('click', () => {
        fabContainer.classList.toggle('active');
    });

    // Close FAB menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('active');
        }
    });
}

// Scroll indicator functionality
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        const awardsSection = document.querySelector('#awards');
        if (awardsSection) {
            awardsSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Hide scroll indicator when scrolling
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');

    if (scrollIndicator) {
        if (scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }

    lastScrollTop = scrollTop;
});
