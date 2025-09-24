// ===============================================
// COSMIC PORTFOLIO - CINEMATIC ANIMATIONS
// GSAP + Anime.js + Interactive Elements
// ===============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global variables
let cosmicParticles = [];
let musicToggle = false;
let ambientMusic;
let customCursor;
let typewriterRoles = ['Web Developer', 'UI/UX Designer', 'AI-ML Engineer', 'Creative Coder', 'Digital Innovator'];
let currentRoleIndex = 0;
let typewriterInterval;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeUniverse();
    initCustomCursor();
    createCosmicParticles();
    setupNavigation();
    initHeroAnimations();
    initContinuousTypewriter();
    initScrollAnimations();
    setupInteractiveElements();
    setupMusicToggle();
});

// ===============================================
// UNIVERSE INITIALIZATION
// ===============================================

function initializeUniverse() {
    // Set initial states for all animated elements
    gsap.set('.cosmic-greeting', { opacity: 0, y: 30 });
    gsap.set('.cosmic-title', { opacity: 0, y: 50 });
    gsap.set('.cosmic-subtitle', { opacity: 0, y: 30 });
    gsap.set('.cosmic-description', { opacity: 0, y: 30 });
    gsap.set('.cosmic-cta', { opacity: 0, scale: 0.8 });
    gsap.set('.hero-visual', { opacity: 0, x: 100 });
    gsap.set('.story-chapter', { opacity: 0, y: 50 });
    gsap.set('.power-card', { opacity: 0, y: 50, scale: 0.9 });
    gsap.set('.project-planet', { opacity: 0, scale: 0.8 });
    gsap.set('.milestone-star', { opacity: 0, scale: 0.8 });

    console.log('🌌 Universe initialized');
}

// ===============================================
// CUSTOM CURSOR SYSTEM
// ===============================================

function initCustomCursor() {
    customCursor = document.querySelector('.custom-cursor');
    
    if (!customCursor) {
        console.warn('Custom cursor element not found');
        return;
    }
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        gsap.to(customCursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    
    // Interactive elements hover effect
    const interactiveElements = document.querySelectorAll('a, button, .power-card, .project-planet, .milestone-star, .nav-link, .cta-button, .transmission-button, .footer-link, .social-star');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
            
            // Trigger ripple effect with enhanced timing
            anime({
                targets: '.cursor-ripple',
                scale: [0, 1.5],
                opacity: [0.8, 0],
                duration: 600,
                easing: 'easeOutQuart'
            });
            
            // Add subtle haptic feedback simulation
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
        
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
        });
    });
    
    console.log('🎯 Custom cursor initialized');
}

// ===============================================
// CONTINUOUS TYPEWRITER EFFECT
// ===============================================

function initContinuousTypewriter() {
    const typewriterElement = document.getElementById('typewriterRole');
    
    if (!typewriterElement) {
        console.warn('Typewriter element not found');
        return;
    }
    
    function typewriterCycle() {
        const currentRole = typewriterRoles[currentRoleIndex];
        
        // Enhanced fade out with scale effect
        gsap.to(typewriterElement, {
            opacity: 0,
            y: -10,
            scale: 0.95,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
                // Clear text and start typing new role
                typewriterElement.textContent = '';
                gsap.set(typewriterElement, { opacity: 1, y: 0, scale: 1 });
                
                // Enhanced typewriter effect with random delays
                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    if (charIndex < currentRole.length) {
                        typewriterElement.textContent += currentRole.charAt(charIndex);
                        charIndex++;
                        
                        // Add subtle character animation
                        gsap.fromTo(typewriterElement, 
                            { scale: 0.98 },
                            { scale: 1, duration: 0.1, ease: 'power2.out' }
                        );
                    } else {
                        clearInterval(typingInterval);
                        
                        // Enhanced completion effect
                        gsap.to(typewriterElement, {
                            textShadow: '0 0 25px #00FF88, 0 0 35px #00FF88',
                            duration: 0.6,
                            ease: 'power2.out',
                            yoyo: true,
                            repeat: 1
                        });
                        
                        // Move to next role after delay
                        setTimeout(() => {
                            currentRoleIndex = (currentRoleIndex + 1) % typewriterRoles.length;
                            typewriterCycle();
                        }, 2500);
                    }
                }, 60 + Math.random() * 40); // Random typing speed for more natural feel
            }
        });
    }
    
    // Start the cycle after a delay
    setTimeout(() => {
        typewriterCycle();
    }, 3000);
    
    console.log('⌨️ Enhanced continuous typewriter initialized');
}

// ===============================================
// COSMIC PARTICLES SYSTEM
// ===============================================

function createCosmicParticles() {
    const particleContainer = document.getElementById('cosmicParticles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';

        particleContainer.appendChild(particle);
        cosmicParticles.push(particle);

        // Add floating animation with GSAP
        gsap.to(particle, {
            y: '-=50',
            x: '+=30',
            duration: 3 + Math.random() * 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 2
        });
    }

    console.log('✨ Cosmic particles created:', particleCount);
}

// ===============================================
// HERO SECTION ANIMATIONS
// ===============================================

function initHeroAnimations() {
    // Create the main hero timeline
    const heroTl = gsap.timeline({ delay: 0.5 });

    heroTl
        .to('.cosmic-greeting', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.cosmic-title', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.cosmic-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .to('.cosmic-description', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.cosmic-cta', {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.2')
        .to('.hero-visual', {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.8');

    // Typewriter effect for the main title
    setTimeout(() => {
        const titleHighlight = document.querySelector('.title-highlight');
        typewriterEffect(titleHighlight, titleHighlight.textContent, 80);
    }, 2000);

    // Floating elements animations
    gsap.to('.cosmic-orb', {
        y: -30,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
    });

    gsap.to('.geometric-shape', {
        rotation: 360,
        duration: 6,
        ease: 'none',
        repeat: -1,
        stagger: 0.3
    });

    // Avatar glow animation
    gsap.to('.avatar-glow', {
        scale: 1.2,
        opacity: 0.6,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });

    console.log('🚀 Hero animations initialized');
}

// ===============================================
// SCROLL TRIGGER ANIMATIONS
// ===============================================

function initScrollAnimations() {
    // About section timeline
    ScrollTrigger.batch('.story-chapter', {
        onEnter: (elements) => {
            elements.forEach((chapter, index) => {
                const isEven = index % 2 === 0;

                gsap.fromTo(chapter, {
                    opacity: 0,
                    x: isEven ? -100 : 100,
                    y: 50
                }, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    delay: index * 0.2
                });

                // Marker glow effect
                const marker = chapter.querySelector('.chapter-marker');
                gsap.to(marker, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'back.out(1.7)',
                    delay: index * 0.2 + 0.5
                });
            });
        },
        start: 'top 80%',
        once: true
    });

    // Skills section animation
    ScrollTrigger.batch('.power-card', {
        onEnter: (elements) => {
            gsap.to(elements, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.1
            });

            // Animate icons with Anime.js
            elements.forEach((card, index) => {
                const icon = card.querySelector('.power-icon');
                anime({
                    targets: icon,
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                    duration: 1000,
                    delay: index * 100 + 500,
                    easing: 'easeOutElastic(1, .8)'
                });
            });
        },
        start: 'top 80%',
        once: true
    });

    // Projects galaxy animation
    ScrollTrigger.batch('.project-planet', {
        onEnter: (elements) => {
            gsap.to(elements, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.7)',
                stagger: 0.2
            });

            // Orbital animation
            // elements.forEach((planet, index) => {
            //     gsap.to(planet, {
            //         rotation: 360,
            //         duration: 10 + index * 2,
            //         ease: 'none',
            //         repeat: -1
            //     });
            // });
        },
        start: 'top 80%',
        once: true
    });

    // Achievements constellation
    ScrollTrigger.batch('.milestone-star', {
        onEnter: (elements) => {
            gsap.to(elements, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.15
            });

            // Twinkling effect
            elements.forEach((star, index) => {
                setTimeout(() => {
                    anime({
                        targets: star,
                        scale: [1, 1.1, 1],
                        duration: 800,
                        easing: 'easeInOutQuad',
                        loop: true
                    });
                }, index * 200);
            });
        },
        start: 'top 80%',
        once: true
    });

    // Education constellation animation
    ScrollTrigger.create({
        trigger: '.knowledge-constellation',
        start: 'top 80%',
        onEnter: () => {
            // Animate constellation path
            const path = document.querySelector('.constellation-path');
            if (path) {
                const pathLength = path.getTotalLength();
                path.style.strokeDasharray = pathLength;
                path.style.strokeDashoffset = pathLength;

                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 2,
                    ease: 'power2.inOut'
                });
            }

            // Animate education nodes
            gsap.utils.toArray('.education-node').forEach((node, index) => {
                gsap.fromTo(node, {
                    opacity: 0,
                    scale: 0
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    delay: index * 0.5 + 1
                });
            });
        },
        once: true
    });

    // Contact section animation
    ScrollTrigger.create({
        trigger: '.transmission-hub',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.contact-info', {
                opacity: 0,
                x: -50
            }, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power2.out'
            });

            gsap.fromTo('.cosmic-form', {
                opacity: 0,
                x: 50
            }, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power2.out',
                delay: 0.3
            });
        },
        once: true
    });

    // Section titles glow effect
    gsap.utils.toArray('.section-title').forEach(title => {
        ScrollTrigger.create({
            trigger: title,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(title, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                });

                // Add typewriter effect
                setTimeout(() => {
                    typewriterEffect(title, title.textContent, 50);
                }, 500);
            },
            once: true
        });
    });

    console.log('📜 Scroll animations initialized');
}

// ===============================================
// INTERACTIVE ELEMENTS
// ===============================================

function setupInteractiveElements() {
    // Enhanced Power card flip and hover effects
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // GSAP hover animation for the card container
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            // Enhanced glow effect
            const glow = card.querySelector('.card-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 0.2,
                    duration: 0.3
                });
            }
            
            // Add micro-interaction to the icon
            const icon = card.querySelector('.power-icon');
            if (icon) {
                anime({
                    targets: icon,
                    scale: [1, 1.1, 1],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
    });
    
    // Legacy power card support (for non-flip cards)
    document.querySelectorAll('.power-card:not(.flip-card)').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.power-icon');
            
            gsap.to(card, {
                y: -10,
                scale: 1.05,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            if (icon) {
                anime({
                    targets: icon,
                    rotate: '1turn',
                    scale: 1.2,
                    duration: 600,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.power-icon');
            
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            if (icon) {
                anime({
                    targets: icon,
                    rotate: 0,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutQuart'
                });
            }
        });
    });

    // Project planet 3D tilt effect
    document.querySelectorAll('.project-planet').forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            gsap.to(planet, {
                rotationY: 15,
                rotationX: 5,
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            });

            // Animate project details
            const details = planet.querySelector('.project-details');
            if (details) {
                anime({
                    targets: details.querySelectorAll('h3, p, .tech-stack, .project-link'),
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 600,
                    delay: anime.stagger(100),
                    easing: 'easeOutQuart'
                });
            }
        });

        planet.addEventListener('mouseleave', () => {
            gsap.to(planet, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // Milestone star ripple effect
    document.querySelectorAll('.milestone-star').forEach(star => {
        star.addEventListener('click', (e) => {
            createRippleEffect(e, star);
            
            // Add achievement unlock animation
            const starCore = star.querySelector('.star-core');
            if (starCore) {
                anime({
                    targets: starCore,
                    rotate: '1turn',
                    scale: [1, 1.3, 1],
                    duration: 800,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
        
        // Add hover effect for milestone stars
        star.addEventListener('mouseenter', () => {
            const starGlow = star.querySelector('.star-glow');
            if (starGlow) {
                gsap.to(starGlow, {
                    opacity: 0.15,
                    duration: 0.3
                });
            }
        });
        
        star.addEventListener('mouseleave', () => {
            const starGlow = star.querySelector('.star-glow');
            if (starGlow) {
                gsap.to(starGlow, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
    });

    // CTA button glow animation
    document.querySelector('.cta-button').addEventListener('mouseenter', () => {
        anime({
            targets: '.cta-button',
            scale: 1.05,
            duration: 300,
            easing: 'easeOutQuart'
        });
    });

    document.querySelector('.cta-button').addEventListener('mouseleave', () => {
        anime({
            targets: '.cta-button',
            scale: 1,
            duration: 300,
            easing: 'easeOutQuart'
        });
    });

    // Contact form interactions
    setupContactForm();
    
    // Footer social icons enhancement
    document.querySelectorAll('.social-star').forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            // Sequential animation for all social stars
            anime({
                targets: '.social-star',
                scale: (el, i) => i === index ? 1.2 : 1.05,
                duration: 300,
                easing: 'easeOutQuart',
                delay: (el, i) => i * 50
            });
        });
        
        star.addEventListener('mouseleave', () => {
            anime({
                targets: '.social-star',
                scale: 1,
                duration: 400,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        
        // Click animation
        star.addEventListener('click', (e) => {
            createRippleEffect(e, star);
            
            anime({
                targets: star,
                rotate: '1turn',
                duration: 600,
                easing: 'easeOutBack(1.7)'
            });
        });
    });

    console.log('⚡ Interactive elements initialized');
}

// ===============================================
// CONTACT FORM SETUP
// ===============================================

function setupContactForm() {
    const formFields = document.querySelectorAll('.form-field input, .form-field textarea');

    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            gsap.to(field, {
                borderColor: '#00FF88',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        field.addEventListener('blur', () => {
            gsap.to(field, {
                borderColor: 'rgba(0, 255, 136, 0.2)',
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Form submission
    const form = document.querySelector('.cosmic-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.transmission-button');

        // Button loading animation
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class=\"fas fa-spinner fa-spin\"></i> Transmitting...';

        // Simulate transmission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class=\"btn-text\">Send Transmission</span>';
            showNotification('Transmission successful! Message received across the cosmos.', 'success');
            form.reset();
        }, 2000);

        // Ripple effect on submit
        createRippleEffect(e, submitBtn);
    });
}

// ===============================================
// NAVIGATION SETUP
// ===============================================

function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Navbar background on scroll
    ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        onUpdate: (self) => {
            const navbar = document.querySelector('.cosmic-nav');
            if (self.direction === 1) {
                gsap.to(navbar, {
                    background: 'rgba(10, 10, 10, 0.95)',
                    backdropFilter: 'blur(20px)',
                    duration: 0.3
                });
            } else {
                gsap.to(navbar, {
                    background: 'rgba(10, 10, 10, 0.3)',
                    backdropFilter: 'blur(20px)',
                    duration: 0.3
                });
            }
        }
    });

    console.log('🧭 Navigation setup complete');
}

// ===============================================
// MUSIC TOGGLE SETUP
// ===============================================

// function setupMusicToggle() {
//     const musicBtn = document.getElementById('musicToggle');
//     const musicIcon = document.getElementById('musicIcon');
//     ambientMusic = document.getElementById('ambientMusic');

//     musicBtn.addEventListener('click', () => {
//         musicToggle = !musicToggle;

//         if (musicToggle) {
//             ambientMusic.play().catch(e => {
//                 console.log('Music play failed:', e);
//                 // Fallback: Create ambient sound effect with Web Audio API
//                 createAmbientSound();
//             });
//             musicIcon.className = 'fas fa-volume-up';

//             // Button animation
//             anime({
//                 targets: musicBtn,
//                 scale: [1, 1.2, 1],
//                 duration: 400,
//                 easing: 'easeOutElastic(1, .8)'
//             });
//         } else {
//             ambientMusic.pause();
//             musicIcon.className = 'fas fa-volume-mute';

//             anime({
//                 targets: musicBtn,
//                 scale: [1, 0.9, 1],
//                 duration: 300,
//                 easing: 'easeOutQuart'
//             });
//         }
//     });

//     console.log('🎵 Music toggle setup complete');
// }
function setupMusicToggle() {
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const ambientMusic = document.getElementById('ambientMusic');

    let isMusicPlaying = false;

    musicBtn.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;

        if (isMusicPlaying) {
            ambientMusic.volume = 0;
            ambientMusic.play().catch(e => {
                console.log('Music play failed:', e);
                // fallback if needed
            });
            // If GSAP is available, fade in
            if (typeof gsap !== "undefined") {
                gsap.to(ambientMusic, { volume: 1, duration: 2, ease: "power2.inOut" });
            } else {
                ambientMusic.volume = 1;
            }
            musicIcon.className = 'fas fa-volume-up';
            anime({
                targets: musicBtn,
                scale: [1, 1.2, 1],
                duration: 400,
                easing: 'easeOutElastic(1, .8)'
            });
        } else {
            // fade out then pause
            if (typeof gsap !== "undefined") {
                gsap.to(ambientMusic, { volume: 0, duration: 1, ease: "power1.inOut", onComplete: () => ambientMusic.pause() });
            } else {
                ambientMusic.pause();
            }
            musicIcon.className = 'fas fa-volume-mute';
            anime({
                targets: musicBtn,
                scale: [1, 0.9, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
    });

    console.log('🎵 Music toggle setup complete');
}

// call the function when DOM is ready
document.addEventListener('DOMContentLoaded', setupMusicToggle);

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 255, 136, 0.3);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 1;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    anime({
        targets: ripple,
        scale: 2,
        opacity: [1, 0],
        duration: 600,
        easing: 'easeOutQuart',
        complete: () => {
            ripple.remove();
        }
    });
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.cosmic-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cosmic-notification';
    notification.innerHTML = `
        <div class=\"notification-content\">
            <span>${message}</span>
            <button class=\"notification-close\">&times;</button>
        </div>
    `;

    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(10, 10, 10, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? '#00FF88' : '#FF6B6B'};
        color: #EAEAEA;
        padding: 1rem 1.5rem;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
    `;

    document.body.appendChild(notification);

    // Animate in
    anime({
        targets: notification,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        anime({
            targets: notification,
            translateX: 100,
            opacity: 0,
            duration: 300,
            easing: 'easeOutQuart',
            complete: () => notification.remove()
        });
    });

    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            anime({
                targets: notification,
                translateX: 100,
                opacity: 0,
                duration: 300,
                easing: 'easeOutQuart',
                complete: () => notification.remove()
            });
        }
    }, 5000);
}

function createAmbientSound() {
    // Fallback ambient sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

        oscillator.start();

        // Fade in/out effect
        setInterval(() => {
            gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 2);
            setTimeout(() => {
                gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 2);
            }, 2000);
        }, 4000);

        console.log('🔊 Ambient sound created');
    } catch (e) {
        console.log('Web Audio API not supported:', e);
    }
}

// ===============================================
// PERFORMANCE OPTIMIZATION
// ===============================================

// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize animations for mobile
if (window.innerWidth < 768) {
    // Reduce particle count on mobile
    cosmicParticles = cosmicParticles.slice(0, 20);

    // Disable some resource-intensive animations
    gsap.globalTimeline.timeScale(0.8);
}

// ===============================================
// EASTER EGGS & SPECIAL EFFECTS
// ===============================================

// Konami code easter egg
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Activate special cosmic mode
            activateCosmicMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateCosmicMode() {
    // Special effects for easter egg
    document.body.style.filter = 'hue-rotate(180deg)';

    // Create supernova effect
    const supernova = document.createElement('div');
    supernova.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #00FF88, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
    `;

    document.body.appendChild(supernova);

    anime({
        targets: supernova,
        scale: [0, 100],
        opacity: [1, 0],
        duration: 2000,
        easing: 'easeOutQuart',
        complete: () => {
            supernova.remove();
            document.body.style.filter = 'none';
        }
    });

    showNotification('🌟 Cosmic Mode Activated! You found the secret!', 'success');
    console.log('🌌 COSMIC MODE ACTIVATED!');
}

console.log('🌌 Cosmic Portfolio fully loaded and operational!');