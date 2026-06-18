// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const sections = document.querySelectorAll('.page-section');
    const navItems = document.querySelectorAll('.nav-link');
    const brand = document.querySelector('.brand');
    const faqItems = document.querySelectorAll('.accordion-item');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });

    // Multi-page Active Nav Link Logic
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    navItems.forEach(item => {
        item.classList.remove('active');
        const linkHref = item.getAttribute('href');
        if (linkHref === pageName || (pageName === '' && linkHref === 'index.html')) {
            item.classList.add('active');
        }
    });

    // FAQ Accordion Logic
    faqItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close all other open accordions
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current accordion
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
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
            // Simple visual feedback
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
