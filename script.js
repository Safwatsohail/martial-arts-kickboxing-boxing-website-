// Alpha Academy Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

window.addEventListener("load", () => {
    const loader = document.getElementById("alpha-loader-wrapper");

    setTimeout(() => {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 2000);
});

function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupPhilosophyQuotes();
    setupScrollToTop();
    setupGSAPAnimations();
}

// Navigation Setup
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navHamburger = document.getElementById('navHamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navHamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navHamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navHamburger.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function setupScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroBackground = document.querySelector('.hero-bg-img');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Animations Setup
function setupAnimations() {
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    const wellbeingCards = document.querySelectorAll('.wellbeing-card');
    wellbeingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });

    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        }, 100);
    });
}

// Philosophy Quotes
function setupPhilosophyQuotes() {
    const quotes = document.querySelectorAll('.philosophy-quote');
    let currentQuote = 0;

    if (quotes.length > 1) {
        setInterval(() => {
            quotes[currentQuote].classList.remove('active');
            currentQuote = (currentQuote + 1) % quotes.length;
            quotes[currentQuote].classList.add('active');
        }, 4000);
    }
}

// Scroll to Top
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// GSAP Animations
function setupGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.hero-title', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo('.hero-cta', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 1, ease: 'back.out(1.7)' }
    );

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    gsap.utils.toArray('.stat-number').forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        gsap.fromTo(stat,
            { textContent: 0 },
            {
                textContent: finalValue,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%'
                }
            }
        );
    });

    gsap.fromTo('.program-card',
        { opacity: 0, y: 50, scale: 0.8 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.programs-grid',
                start: 'top 80%'
            }
        }
    );

    gsap.fromTo('.benefit-item',
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.coaching-benefits',
                start: 'top 80%'
            }
        }
    );

    gsap.fromTo('.value-item',
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.philosophy-values',
                start: 'top 80%'
            }
        }
    );

    gsap.fromTo('.wellbeing-card',
        { opacity: 0, y: 100 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.wellbeing-grid',
                start: 'top 80%'
            }
        }
    );

    gsap.fromTo('.contact-item',
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%'
            }
        }
    );

    gsap.to('.logo-img, .footer-logo-img, .logo-icon, .footer-logo-icon', {
        scale: 1.1,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });

    gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });

    gsap.to('.glow-btn', {
        boxShadow: '0 0 40px rgba(220, 38, 38, 0.8)',
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });

    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@1.4.10/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

window.addEventListener('load', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
});

console.log('%c🥋 Alpha Academy Dubai - Be Better Than Yourself', 'color: #dc2626; font-size: 16px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #10b981; font-size: 12px;');

document.querySelectorAll('.card-btn').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = '#contact';
    });
});

const today = new Date().getDay();
const ths = document.querySelectorAll("thead th");
if (today >= 1 && today <= 5) {
    ths[today].style.backgroundColor = "#ff0000";
    ths[today].style.color = "#fff";
}
function showToast(message, type = "success") {
    const toast = document.getElementById("toastNotification");
    const toastText = document.getElementById("toastMessage");
  
    toastText.textContent = message;
    toast.classList.remove("show", "error");
  
    if (type === "error") {
      toast.classList.add("error");
    }
  
    toast.classList.add("show");
  
    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
  