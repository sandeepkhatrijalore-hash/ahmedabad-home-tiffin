// Safer script with null-checks so pages without certain sections don't break the whole JS.
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mobileNav.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Menu Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (tabButtons.length && menuItems.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                menuItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Testimonial Slider (guarded)
    const testimonialContainer = document.getElementById('testimonialContainer');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    if (testimonialContainer) {
        let currentSlide = 0;
        const totalSlides = testimonialContainer.children.length || 0;

        const updateSlider = () => {
            testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (totalSlides === 0) return;
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (totalSlides === 0) return;
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlider();
            });
        }

        // Auto-slide (only if >1 slides)
        if (totalSlides > 1) {
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 5000);
        }
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }

    // Smooth scrolling for navigation links (only in-page anchors)
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.startsWith('#!')) return; // ignore placeholders
            const targetElement = document.querySelector(href);
            if (!targetElement) return; // if anchor target not present on this page
            e.preventDefault();

            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission (guarded)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name') ? document.getElementById('name').value : '';
            const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
            const area = document.getElementById('area') ? document.getElementById('area').value : '';

            const message = `New Tiffin Inquiry:%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AArea: ${encodeURIComponent(area)}`;

            window.open(`https://wa.me/919999999999?text=${message}`, '_blank');

            contactForm.reset();
            alert('Thank you! We will contact you shortly via WhatsApp.');
        });
    }

    // Sticky header on scroll (safe)
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Highlight active section in navigation (safe)
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
            if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();

    // Hover effect for area items (safe)
    const areaItems = document.querySelectorAll('.area-item');
    areaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});