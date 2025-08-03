// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach((el, index) => {
    // Add staggered animation delay
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Enhanced page loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize page
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Premium hover effects for interactive elements
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    // Add subtle parallax effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add mouse move parallax effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
    });
});

// Enhanced testimonial animations
const testimonials = document.querySelectorAll('.testimonial');
testimonials.forEach((testimonial, index) => {
    testimonial.addEventListener('mouseenter', () => {
        testimonial.style.transform = 'translateY(-8px) scale(1.01)';
    });
    
    testimonial.addEventListener('mouseleave', () => {
        testimonial.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Premium Interactive Hero Background
class InteractiveHeroBackground {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isVisible = true;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.createFloatingShapes();
        this.createTechIcons();
        this.bindEvents();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 12000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.1,
                color: `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1})`
            });
        }
    }
    
    createFloatingShapes() {
        const shapesContainer = document.getElementById('floatingShapes');
        if (!shapesContainer) return;
        
        const shapeTypes = ['circle', 'square', 'triangle'];
        const shapeCount = 12;
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            const size = Math.random() * 30 + 15;
            
            shape.className = `shape ${shapeType}`;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            shape.style.animationDelay = `${Math.random() * 8}s`;
            shape.style.animationDuration = `${Math.random() * 6 + 8}s`;
            
            shapesContainer.appendChild(shape);
        }
    }
    
    createTechIcons() {
        const iconsContainer = document.getElementById('techIcons');
        if (!iconsContainer) return;
        
        const techSymbols = ['⚡', '⚙️', '🌐', '☁️', '🔒', '🚀', '💻'];
        const iconCount = 8;
        
        for (let i = 0; i < iconCount; i++) {
            const icon = document.createElement('div');
            icon.className = 'tech-icon';
            icon.textContent = techSymbols[Math.floor(Math.random() * techSymbols.length)];
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;
            icon.style.animationDelay = `${Math.random() * 12}s`;
            icon.style.animationDuration = `${Math.random() * 8 + 10}s`;
            
            iconsContainer.appendChild(icon);
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        
        if (this.canvas) {
            this.canvas.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = 0;
                this.mouse.y = 0;
            });
        }
        
        // Pause animation when not visible for performance
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
    }
    
    updateParticles() {
        if (!this.isVisible) return;
        
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120 && distance > 0) {
                const force = (120 - distance) / 120;
                particle.vx += (dx / distance) * force * 0.008;
                particle.vy += (dy / distance) * force * 0.008;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -0.8;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -0.8;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Add some randomness
            particle.vx += (Math.random() - 0.5) * 0.005;
            particle.vy += (Math.random() - 0.5) * 0.005;
            
            // Limit velocity
            particle.vx = Math.max(-1.5, Math.min(1.5, particle.vx));
            particle.vy = Math.max(-1.5, Math.min(1.5, particle.vy));
        });
    }
    
    drawParticles() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
            this.ctx.shadowBlur = 6;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    animate() {
        if (!this.isVisible) {
            this.animationId = requestAnimationFrame(() => this.animate());
            return;
        }
        
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize premium interactive background
let interactiveBackground;
window.addEventListener('load', () => {
    interactiveBackground = new InteractiveHeroBackground();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (interactiveBackground) {
        interactiveBackground.destroy();
    }
});

// Enhanced interaction tracking
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email contact initiated');
        // Analytics integration point
    });
});

const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log(`Social link clicked: ${link.href}`);
        // Analytics integration point
    });
});

// Add premium loading class
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
});
