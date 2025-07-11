// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.research-card, .project-card, .publication-item, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add hover effects to research cards
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-item h3');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '%';
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target + '%';
                }
            };
            
            updateStat();
        });
    };
    
    // Trigger stats animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Contact form validation (if form is added later)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            if (email && !email.value.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (message && message.value.length < 10) {
                alert('Please enter a message with at least 10 characters');
                return;
            }
            
            // Here you would typically send the form data
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Arrow keys for navigation (optional)
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.tagName === 'SECTION') {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const prevSection = currentSection.previousElementSibling;
            if (prevSection && prevSection.tagName === 'SECTION') {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Helper function to get current section
    function getCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return section;
            }
        }
        
        return sections[0];
    }
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #667eea);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});