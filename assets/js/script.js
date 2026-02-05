(() => {
    const existing = document.getElementById('page-loader');
    if (existing) return;

    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="ew-loader-inner">
            <div class="ew-spinner" aria-label="Loading"></div>
            <div class="ew-loader-bar" aria-hidden="true"></div>
        </div>
    `.trim();

    document.body.appendChild(loader);

    const hide = () => {
        const el = document.getElementById('page-loader');
        if (!el) return;
        el.classList.add('ew-hidden');
        window.setTimeout(() => el.remove(), 500);
    };

    if (document.readyState === 'complete') {
        hide();
    } else {
        window.addEventListener('load', hide, { once: true });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Navbar Scroll Effect (Glassmorphism enhancement)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });
    }

    // WhatsApp Contact Form Integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value ?? '';
            const parentName = document.getElementById('parent_name')?.value ?? '';
            const contact = (document.getElementById('contact')?.value ?? document.getElementById('phone')?.value) ?? '';
            const desiredCourse = document.getElementById('desired_course')?.value ?? '';
            const message = document.getElementById('message')?.value ?? '';

            // Format message for WhatsApp
            const lines = ['*New Inquiry from Website*'];
            if (name) lines.push(`*Name:* ${name}`);
            if (parentName) lines.push(`*Parent\'s Name:* ${parentName}`);
            if (contact) lines.push(`*Contact:* ${contact}`);
            if (desiredCourse) lines.push(`*Desired Course / Query:* ${desiredCourse}`);
            if (message) lines.push(`*Message:* ${message}`);

            const text = encodeURIComponent(lines.join('\n'));
            const phoneNumber = '9779767463434';

            // Open WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        });
    }
    // Course Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    if (filterButtons.length > 0 && courseCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white', 'shadow-md');
                    btn.classList.add('bg-light', 'text-text', 'hover:bg-gray-200');
                });

                // Add active class to clicked button
                button.classList.remove('bg-light', 'text-text', 'hover:bg-gray-200');
                button.classList.add('bg-primary', 'text-white', 'shadow-md');

                const filterValue = button.getAttribute('data-filter');

                courseCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = '';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); // Wait for transition
                    }
                });
            });
        });
    }

    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const animateCounter = (el) => {
            const target = Number(el.dataset.target ?? '0');
            const suffix = el.dataset.suffix ?? '';
            const durationMs = 1500;

            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / durationMs, 1);
                const value = Math.round(target * progress);
                el.textContent = `${value}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        };

        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                if (el.dataset.animated === 'true') {
                    observer.unobserve(el);
                    return;
                }
                el.dataset.animated = 'true';
                animateCounter(el);
                observer.unobserve(el);
            });
        }, { threshold: 0.4 });

        counters.forEach(el => io.observe(el));
    }
});
