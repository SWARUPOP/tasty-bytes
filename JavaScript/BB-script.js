// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");  // Check if the script is running properly

    const nav = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (!nav || !hamburger) {
        console.error("Elements not found");
        return;  // Exit if elements are not found
    }

    // Toggle the menu on hamburger click
    hamburger.addEventListener('click', () => {
        console.log("Hamburger clicked");  // Check if the click is detected
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Add staggered animation delay for each menu item
        const navItems = document.querySelectorAll('.nav-links li');
        navItems.forEach((item, index) => {
            item.style.animation = nav.classList.contains('active')
                ? `fadeIn 0.5s ease forwards ${index * 0.1}s`
                : 'none';
        });
    });

    // Close menu when clicking outside of it (optional UX improvement)
    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            console.log("Clicked outside the menu");
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Subtle incoming scroll-reveal animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll('.product-row h2, .product-card, .footer');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('is-visible');
                el.addEventListener('transitionend', () => {
                    el.style.transitionDelay = '';
                }, { once: true });
                obs.unobserve(el);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -24px 0px'
        });

        document.querySelectorAll('.product-row').forEach((row) => {
            const cards = row.querySelectorAll('.product-card');
            cards.forEach((card, idx) => {
                card.style.transitionDelay = `${(idx % 4) * 70}ms`;
            });
        });

        revealTargets.forEach((el) => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }
});
