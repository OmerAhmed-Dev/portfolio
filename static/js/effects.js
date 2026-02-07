/**
 * Cyberpunk Portfolio - JavaScript Effects
 */

// ========================================
// NAVIGATION
// ========================================

function toggleNav() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close nav when clicking a link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    });
});

// ========================================
// TYPING EFFECT
// ========================================

class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init TypeWriter on role text if exists
document.addEventListener('DOMContentLoaded', () => {
    const roleElement = document.querySelector('.role-text.typewriter');
    if (roleElement) {
        const words = [
            'Security Researcher',
            'CTF Player',
            'Penetration Tester',
            'Bug Bounty Hunter',
            'Developer'
        ];
        new TypeWriter(roleElement, words, 2000);
    }
});

// ========================================
// GLITCH EFFECT ENHANCEMENT
// ========================================

const glitchElements = document.querySelectorAll('.glitch');

glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = null;
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.post-card, .project-card, .tech-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInObserver.observe(el);
});

// Add visible styles
const style = document.createElement('style');
style.textContent = `
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========================================
// SKILL BAR ANIMATION
// ========================================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skills-grid').forEach(el => {
    skillObserver.observe(el);
});

// ========================================
// TERMINAL TYPING EFFECT
// ========================================

function typeTerminal() {
    const terminal = document.querySelector('.terminal-body');
    if (!terminal) return;

    const lines = terminal.querySelectorAll('p');
    let delay = 0;

    lines.forEach((line, index) => {
        const originalHTML = line.innerHTML;
        line.innerHTML = '';
        line.style.visibility = 'visible';

        setTimeout(() => {
            let i = 0;
            const text = originalHTML.replace(/<[^>]*>/g, '');
            const tags = originalHTML.match(/<[^>]*>/g) || [];

            function typeChar() {
                if (i < text.length) {
                    // Reconstruct with tags
                    let result = '';
                    let textIndex = 0;
                    let tagIndex = 0;
                    let inTag = false;

                    for (let j = 0; j < originalHTML.length && textIndex <= i; j++) {
                        if (originalHTML[j] === '<') {
                            inTag = true;
                            const tagEnd = originalHTML.indexOf('>', j);
                            result += originalHTML.substring(j, tagEnd + 1);
                            j = tagEnd;
                            inTag = false;
                        } else {
                            if (textIndex <= i) {
                                result += originalHTML[j];
                                textIndex++;
                            }
                        }
                    }

                    line.innerHTML = result;
                    i++;
                    setTimeout(typeChar, 30);
                }
            }

            typeChar();
        }, delay);

        delay += 800;
    });
}

// Run terminal effect after page load
window.addEventListener('load', () => {
    setTimeout(typeTerminal, 500);
});

// ========================================
// SMOOTH SCROLL
// ========================================

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

// ========================================
// HEADER SCROLL EFFECT
// ========================================

let lastScroll = 0;
const header = document.querySelector('.cyber-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
    }

    lastScroll = currentScroll;
});

// ========================================
// FILTER TAGS (for blog/projects)
// ========================================

const filterTags = document.querySelectorAll('.tag-filter');
const filterableItems = document.querySelectorAll('[data-category]');

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Update active state
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const filter = tag.dataset.filter;

        filterableItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else if (item.dataset.category.includes(filter)) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// CONTACT FORM ENHANCEMENT
// ========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        button.innerHTML = '<span>TRANSMITTING...</span>';
        button.disabled = true;

        // Re-enable after submission (Formspree will handle redirect)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
    });

    // Input focus effects
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ========================================
// RANDOM GLITCH EFFECT
// ========================================

function randomGlitch() {
    const elements = document.querySelectorAll('.hero-title .glitch, .page-title.glitch');

    elements.forEach(el => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                el.style.animation = 'glitch-random 0.3s ease';
                setTimeout(() => {
                    el.style.animation = '';
                }, 300);
            }
        }, 2000);
    });
}

// Add random glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch-random {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

randomGlitch();

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄', 'color: #00ffff');
console.log('%c █                                     █', 'color: #00ffff');
console.log('%c █  ACCESS GRANTED                     █', 'color: #00ff00');
console.log('%c █  Welcome to my digital domain       █', 'color: #00ffff');
console.log('%c █                                     █', 'color: #00ffff');
console.log('%c █  Looking for vulnerabilities?       █', 'color: #ff00ff');
console.log('%c █  I appreciate the curiosity! 🔐     █', 'color: #ff00ff');
console.log('%c █                                     █', 'color: #00ffff');
console.log('%c ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀', 'color: #00ffff');
