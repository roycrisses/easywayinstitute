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
            const email = document.getElementById('email')?.value ?? '';
            const subject = document.getElementById('subject')?.value ?? '';
            const message = document.getElementById('message')?.value ?? '';

            // Format message for WhatsApp
            const text = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
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
                        card.style.display = 'flex'; // Use flex to maintain layout
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
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
});
