/**
 * CH3SHIR3 Cyberpunk Portfolio - Enhanced JavaScript Effects
 */

// ========================================
// MATRIX RAIN BACKGROUND
// ========================================

class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrix-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            opacity: 0.15;
            pointer-events: none;
        `;
        document.body.prepend(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]!@#$%^&*()';
        this.charArray = this.chars.split('');
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);

        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Vary colors
            if (Math.random() > 0.98) {
                this.ctx.fillStyle = '#ff00ff';
            } else if (Math.random() > 0.96) {
                this.ctx.fillStyle = '#9d00ff';
            } else {
                this.ctx.fillStyle = '#00ffff';
            }

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// LOADING SCREEN / BOOT SEQUENCE
// ========================================

class BootSequence {
    constructor() {
        this.messages = [
            'INITIALIZING SYSTEM...',
            'LOADING KERNEL MODULES...',
            'ESTABLISHING NEURAL LINK...',
            'BYPASSING SECURITY PROTOCOLS...',
            'DECRYPTING DATA STREAMS...',
            'SYNCHRONIZING MATRIX...',
            'ACCESS GRANTED',
            'WELCOME, OPERATIVE'
        ];

        this.loader = document.createElement('div');
        this.loader.id = 'boot-loader';
        this.loader.innerHTML = `
            <div class="boot-container">
                <div class="boot-logo">CH3SHIR3</div>
                <div class="boot-text"></div>
                <div class="boot-progress">
                    <div class="boot-progress-bar"></div>
                </div>
                <div class="boot-status">0%</div>
            </div>
        `;
        document.body.prepend(this.loader);

        this.bootText = this.loader.querySelector('.boot-text');
        this.progressBar = this.loader.querySelector('.boot-progress-bar');
        this.status = this.loader.querySelector('.boot-status');

        this.run();
    }

    async run() {
        for (let i = 0; i < this.messages.length; i++) {
            await this.typeMessage(this.messages[i]);
            const progress = ((i + 1) / this.messages.length) * 100;
            this.progressBar.style.width = `${progress}%`;
            this.status.textContent = `${Math.round(progress)}%`;
            await this.wait(200);
        }

        await this.wait(500);
        this.loader.classList.add('boot-complete');

        await this.wait(800);
        this.loader.remove();
        document.body.classList.add('loaded');
    }

    async typeMessage(message) {
        this.bootText.textContent = '';
        for (let char of message) {
            this.bootText.textContent += char;
            await this.wait(30);
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ========================================
// CUSTOM CURSOR
// ========================================

class NeonCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'neon-cursor';

        this.follower = document.createElement('div');
        this.follower.className = 'neon-cursor-follower';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.follower);

        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;

        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
        });

        // Hide on touch devices
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
            this.follower.style.display = 'none';
        } else {
            document.body.classList.add('custom-cursor');
            this.animate();
        }

        // Hover effects
        document.querySelectorAll('a, button, .cyber-button, .post-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.follower.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.follower.classList.remove('cursor-hover');
            });
        });
    }

    animate() {
        this.followerX += (this.cursorX - this.followerX) * 0.15;
        this.followerY += (this.cursorY - this.followerY) * 0.15;

        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        this.follower.style.transform = `translate(${this.followerX}px, ${this.followerY}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// READING PROGRESS BAR
// ========================================

class ReadingProgress {
    constructor() {
        if (!document.querySelector('.single-post')) return;

        this.progressBar = document.createElement('div');
        this.progressBar.className = 'reading-progress-bar';
        document.body.appendChild(this.progressBar);

        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const article = document.querySelector('.post-content');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        const progress = Math.min(Math.max((scrollTop - articleTop + windowHeight / 2) / articleHeight, 0), 1);
        this.progressBar.style.width = `${progress * 100}%`;
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

class BackToTop {
    constructor() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
            <span>TOP</span>
        `;
        this.button.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(this.button);

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
    }
}

// ========================================
// COPY CODE BUTTON
// ========================================

class CopyCodeButton {
    constructor() {
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';

            const button = document.createElement('button');
            button.className = 'copy-code-btn';
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                <span>COPY</span>
            `;

            button.addEventListener('click', async () => {
                const code = codeBlock.textContent;
                await navigator.clipboard.writeText(code);

                button.classList.add('copied');
                button.querySelector('span').textContent = 'COPIED!';

                setTimeout(() => {
                    button.classList.remove('copied');
                    button.querySelector('span').textContent = 'COPY';
                }, 2000);
            });

            const pre = codeBlock.parentElement;
            pre.parentElement.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            wrapper.appendChild(button);
        });
    }
}

// ========================================
// TABLE OF CONTENTS
// ========================================

class TableOfContents {
    constructor() {
        const article = document.querySelector('.post-content.prose');
        if (!article) return;

        const headings = article.querySelectorAll('h2, h3');
        if (headings.length < 3) return;

        const toc = document.createElement('nav');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h4>// CONTENTS //</h4><ul></ul>';

        const list = toc.querySelector('ul');

        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;

            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase();
            li.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
            list.appendChild(li);
        });

        article.insertBefore(toc, article.firstChild);

        // Highlight active section
        window.addEventListener('scroll', () => {
            let current = '';
            headings.forEach(heading => {
                const top = heading.offsetTop;
                if (window.scrollY >= top - 100) {
                    current = heading.id;
                }
            });

            list.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

class Search {
    constructor() {
        this.searchBtn = document.querySelector('.search-toggle');
        if (!this.searchBtn) this.createSearchButton();

        this.modal = document.createElement('div');
        this.modal.className = 'search-modal';
        this.modal.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <input type="text" class="search-input" placeholder="SEARCH_QUERY..." autofocus>
                    <button class="search-close">&times;</button>
                </div>
                <div class="search-results"></div>
            </div>
        `;
        document.body.appendChild(this.modal);

        this.input = this.modal.querySelector('.search-input');
        this.results = this.modal.querySelector('.search-results');
        this.closeBtn = this.modal.querySelector('.search-close');

        this.posts = [];
        this.loadPosts();

        this.bindEvents();
    }

    createSearchButton() {
        const nav = document.querySelector('.nav-menu');
        if (!nav) return;

        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
            <button class="search-toggle nav-link" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                </svg>
            </button>
        `;
        nav.appendChild(li);
        this.searchBtn = li.querySelector('.search-toggle');
    }

    async loadPosts() {
        try {
            const response = await fetch('/index.json');
            this.posts = await response.json();
        } catch (e) {
            console.log('Search index not available');
        }
    }

    bindEvents() {
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.open());
        }

        this.closeBtn.addEventListener('click', () => this.close());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
        });

        this.input.addEventListener('input', () => this.search());
    }

    open() {
        this.modal.classList.add('active');
        this.input.focus();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        this.input.value = '';
        this.results.innerHTML = '';
        document.body.style.overflow = '';
    }

    search() {
        const query = this.input.value.toLowerCase().trim();

        if (query.length < 2) {
            this.results.innerHTML = '<p class="search-hint">Type at least 2 characters...</p>';
            return;
        }

        const matches = this.posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
        );

        if (matches.length === 0) {
            this.results.innerHTML = '<p class="search-no-results">NO_RESULTS_FOUND</p>';
            return;
        }

        this.results.innerHTML = matches.map(post => `
            <a href="${post.url}" class="search-result">
                <h4>${this.highlight(post.title, query)}</h4>
                <p>${this.getExcerpt(post.content, query)}</p>
                <span class="search-date">${post.date}</span>
            </a>
        `).join('');
    }

    highlight(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getExcerpt(content, query) {
        const index = content.toLowerCase().indexOf(query);
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + 100);
        let excerpt = content.substring(start, end);

        if (start > 0) excerpt = '...' + excerpt;
        if (end < content.length) excerpt += '...';

        return this.highlight(excerpt, query);
    }
}

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
        header.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
    }

    lastScroll = currentScroll;
});

// ========================================
// LAZY LOADING IMAGES
// ========================================

class LazyImages {
    constructor() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ========================================
// GLITCH TEXT EFFECT
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

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄', 'color: #00ffff');
console.log('%c █                                     █', 'color: #00ffff');
console.log('%c █  CH3SHIR3 TERMINAL v1.0             █', 'color: #00ff00');
console.log('%c █  ACCESS GRANTED                     █', 'color: #00ff00');
console.log('%c █                                     █', 'color: #00ffff');
console.log('%c █  Press Ctrl+K to search             █', 'color: #ff00ff');
console.log('%c █                                     █', 'color: #00ffff');
console.log('%c ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀', 'color: #00ffff');

// ========================================
// INITIALIZE ALL EFFECTS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize effects after boot sequence
    const initEffects = () => {
        new MatrixRain();
        new NeonCursor();
        new ReadingProgress();
        new BackToTop();
        new CopyCodeButton();
        new TableOfContents();
        new Search();
        new LazyImages();
        randomGlitch();

        // Observe elements
        document.querySelectorAll('.post-card, .project-card, .tech-item, .skill-category, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            fadeInObserver.observe(el);
        });

        document.querySelectorAll('.skills-grid').forEach(el => {
            skillObserver.observe(el);
        });
    };

    // Check if we should show boot sequence
    const hasSeenBoot = sessionStorage.getItem('bootComplete');

    if (!hasSeenBoot && window.location.pathname === '/') {
        new BootSequence();
        sessionStorage.setItem('bootComplete', 'true');
        setTimeout(initEffects, 4000);
    } else {
        document.body.classList.add('loaded');
        initEffects();
    }
});

// Add fade-in styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);
