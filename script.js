// Loading Screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    loading.style.opacity = '0';
    setTimeout(() => {
        loading.style.display = 'none';
    }, 500);
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

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Mobile Menu
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const root = document.documentElement;

const updateTheme = (e) => {
    if (e.matches) {
        root.classList.add('dark-mode');
    } else {
        root.classList.remove('dark-mode');
    }
};

prefersDarkScheme.addListener(updateTheme);
updateTheme(prefersDarkScheme);

// Dropdown Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (navToggle && dropdownMenu) {
    navToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Close dropdown when clicking a link
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
        });
    });
} 