// Wait for DOM before initializing — script is deferred so this runs after parse
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons (loaded via deferred script)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const faqItems = document.querySelectorAll('.accordion-item');

    // Sticky Navbar — use passive listener to avoid blocking scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Hamburger Menu Toggle with ARIA support
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Multi-page Active Nav Link Logic
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    navItems.forEach(item => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
        const linkHref = item.getAttribute('href');
        if (linkHref === pageName || (pageName === '' && linkHref === 'index.html') || (pageName === 'index.html' && linkHref === 'index.html')) {
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
        }
    });

    // FAQ Accordion Logic with ARIA support
    faqItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
            // Close all other open accordions
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherHeader = otherItem.querySelector('.accordion-header');
                    if (otherContent) otherContent.style.maxHeight = null;
                    if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current accordion
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            const isExpanded = item.classList.contains('active');
            header.setAttribute('aria-expanded', isExpanded);

            if (isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Contact Form Submission (Prevent Default)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Message Sent!';
            btn.style.backgroundColor = '#4CAF50';
            btn.style.color = '#fff';
            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);
        });
    }
});
