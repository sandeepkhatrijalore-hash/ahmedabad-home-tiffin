document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileNav = document.getElementById('mobileNav');
            
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
            
            // Menu Tabs
            const tabButtons = document.querySelectorAll('.tab-btn');
            const menuItems = document.querySelectorAll('.menu-item');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const category = button.getAttribute('data-category');
                    
                    // Show/hide menu items based on category
                    menuItems.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // Testimonial Slider
            const testimonialContainer = document.getElementById('testimonialContainer');
            const prevBtn = document.getElementById('prevTestimonial');
            const nextBtn = document.getElementById('nextTestimonial');
            let currentSlide = 0;
            const totalSlides = testimonialContainer.children.length;
            
            function updateSlider() {
                testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            });
            
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlider();
            });
            
            // Auto-slide testimonials
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 5000);
            
            // FAQ Accordion
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const faqItem = question.parentElement;
                    faqItem.classList.toggle('active');
                });
            });
            
            // Smooth scrolling for navigation links
            const navLinks = document.querySelectorAll('a[href^="#"]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Calculate header height for offset
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Contact Form Submission
            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const area = document.getElementById('area').value;
                
                // Create WhatsApp message
                const message = `New Tiffin Inquiry:%0A%0AName: ${name}%0APhone: ${phone}%0AArea: ${area}`;
                
                // Redirect to WhatsApp
                window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
                
                // Reset form
                contactForm.reset();
                
                // Show success message
                alert('Thank you! We will contact you shortly via WhatsApp.');
            });
            
            // Sticky header on scroll
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                } else {
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }
            });
            
            // Highlight active section in navigation
            function highlightActiveSection() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    if (scrollY >= (sectionTop - headerHeight - 100)) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', highlightActiveSection);
            highlightActiveSection(); // Initial call
            
            // Add hover effect to area items
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