// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Process Timeline Steps
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const processContents = document.querySelectorAll('.process-content');
    
    timelineSteps.forEach(step => {
        step.addEventListener('click', function() {
            // Remove active class from all steps and contents
            timelineSteps.forEach(s => s.classList.remove('active'));
            processContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked step
            this.classList.add('active');
            
            // Show corresponding content
            const contentId = `${this.dataset.step}-content`;
            document.getElementById(contentId).classList.add('active');
        });
    });
    
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.control-indicators .indicator');
    const prevButton = document.querySelector('.control-prev');
    const nextButton = document.querySelector('.control-next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        // Show testimonial at index
        testimonialCards[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Next button click
    nextButton.addEventListener('click', function() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= testimonialCards.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    });
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialCards.length - 1;
        }
        showTestimonial(prevIndex);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= testimonialCards.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }, 5000);
    
    // Sticky Navigation
    const nav = document.querySelector('nav');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show nav on scroll direction
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 300) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollPosition = currentScrollPosition;
    });
    
    // Form Submissions
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    
    
    
    
    // Animation on Scroll
    const animatedElements = document.querySelectorAll('.feature-card, .admin-step, .identity-step, .feature');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                elementBottomPosition >= windowTopPosition && 
                elementTopPosition <= windowBottomPosition
            ) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check on page load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
});