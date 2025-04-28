document.addEventListener('DOMContentLoaded', function() {
    // Intro Overlay Functionality
    const introOverlay = document.getElementById('introOverlay');
    const enterSiteBtn = document.getElementById('enterSiteBtn');
    const siteWrapper = document.querySelector('.site-wrapper');
    
    // Show the site after a short delay if the user doesn't click the button
    const autoEnterTimeout = setTimeout(function() {
        enterSite();
    }, 8000); // 8 seconds auto-enter
    
    // Enter site button click handler
    if (enterSiteBtn) {
        enterSiteBtn.addEventListener('click', function() {
            clearTimeout(autoEnterTimeout); // Clear the auto-enter timeout
            enterSite();
        });
    }
    
    // Function to handle entering the site
    function enterSite() {
        if (introOverlay) {
            introOverlay.classList.add('hidden');
            
            // After the overlay fades out, show the main content
            setTimeout(function() {
                siteWrapper.classList.add('visible');
                
                // Check if there's a hash in the URL and scroll to that section
                if (window.location.hash) {
                    const targetSection = document.querySelector(window.location.hash);
                    if (targetSection) {
                        setTimeout(function() {
                            scrollToSection(targetSection);
                        }, 500);
                    }
                }
            }, 800); // Match this to the overlay transition time
        }
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Change hamburger to X
            if (this.classList.contains('active')) {
                this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
                this.querySelector('span:nth-child(2)').style.opacity = '0';
                this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                this.querySelector('span:nth-child(1)').style.transform = 'none';
                this.querySelector('span:nth-child(2)').style.opacity = '1';
                this.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.menu-toggle')) {
            
            navMenu.classList.remove('active');
            
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                menuToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        }
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for links that point to an ID on the page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && document.querySelector(targetId)) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    
                    if (menuToggle && menuToggle.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        menuToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                        menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                        menuToggle.querySelector('span:nth-child(3)').style.transform = 'none';
                    }
                }
                
                // Scroll to the target section
                const targetSection = document.querySelector(targetId);
                scrollToSection(targetSection);
                
                // Update active state in navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Function to scroll to a section with offset for fixed header
    function scrollToSection(targetElement) {
        if (!targetElement) return;
        
        const headerOffset = 80; // Height of the fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust for header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // Gallery Item Hover Effect Enhancement
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Form Submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter Form Submission (prevent default for demo)
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Scroll Down Button in Hero Section
    const scrollDownBtn = document.querySelector('.scroll-down a');
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                scrollToSection(targetSection);
            }
        });
    }
    
    // Reveal animations on scroll (if you want to add this feature)
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Add reveal class to elements you want to animate
    function setupRevealElements() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionHeader = section.querySelector('.section-header');
            if (sectionHeader) {
                sectionHeader.classList.add('reveal');
            }
            
            const contentElements = section.querySelectorAll('.about-content, .services-grid, .gallery-grid, .testimonials-container, .contact-container');
            contentElements.forEach(element => {
                element.classList.add('reveal');
            });
        });
    }
    
    // Uncomment these lines if you want to implement reveal animations
    // setupRevealElements();
    // window.addEventListener('scroll', revealOnScroll);
    // revealOnScroll(); // Initial check
});
