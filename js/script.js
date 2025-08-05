// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing splash screen...');
    
    // Initialize all functionality
    initSplashScreen();
    initNavigation();
    initGallery();
    initMusicPlayer();
    initContactForm();
    initScrollAnimations();
    initSmoothScrolling();
    
    // Music controls
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let musicStarted = false;
    
    // Set initial volume and show music button
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5;
        backgroundMusic.muted = false;
        
        // Add debugging for audio loading
        backgroundMusic.addEventListener('loadstart', () => {
            console.log('Audio loading started');
        });
        
        backgroundMusic.addEventListener('canplay', () => {
            console.log('Audio can play');
        });
        
        backgroundMusic.addEventListener('error', (e) => {
            console.error('Audio error:', e);
        });
    }
    
    // Show music button immediately but position it properly
    if (musicToggle) {
        musicToggle.style.display = 'flex';
        musicToggle.style.position = 'fixed';
        musicToggle.style.bottom = '20px';
        musicToggle.style.right = '20px';
        musicToggle.style.zIndex = '1000';
    }
    
    // Function to start music
    const startMusic = () => {
        if (!backgroundMusic || !musicToggle) return;
        
        // Show loading state
        musicToggle.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        backgroundMusic.play().then(() => {
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.style.animation = '';
            musicStarted = true;
            console.log('Music started successfully');
        }).catch(e => {
            console.log('Music play failed:', e);
            // Show play button if autoplay fails
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            // Add pulsing animation to indicate user should click
            musicToggle.style.animation = 'pulse 2s infinite';
            musicStarted = false;
        });
    };
    
    // Remove user interaction handlers - we want pure autoplay after splash
    
    // Handle audio loading events
    if (backgroundMusic) {
        backgroundMusic.addEventListener('canplaythrough', () => {
            console.log('Audio loaded and ready to play');
        });
        
        backgroundMusic.addEventListener('loadeddata', () => {
            console.log('Audio data loaded');
        });
    }
    
    // Remove immediate music start - we only want it after splash screen
});

// Splash Screen
function initSplashScreen() {
    console.log('Initializing splash screen...');
    
    const splashScreen = document.getElementById('splash-screen');
    const navbar = document.querySelector('.navbar');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const loadingBar = document.getElementById('loading-bar');
    const inviteBtn = document.getElementById('invite-btn');
    
    // Check if elements exist
    if (!splashScreen) {
        console.error('Splash screen element not found!');
        return;
    }
    
    if (!loadingBar) {
        console.error('Loading bar element not found!');
        return;
    }
    
    if (!inviteBtn) {
        console.error('Invite button element not found!');
        return;
    }
    
    console.log('All splash screen elements found successfully');
    
    // Prepare audio during splash screen
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5;
        backgroundMusic.muted = false;
        backgroundMusic.load(); // Ensure audio is loaded
        console.log('Audio prepared during splash screen');
    }
    
    // Function to start music and hide splash screen
    const startMusicAndProceed = () => {
        if (!backgroundMusic || !musicToggle) return;
        
        console.log('Starting music and proceeding to main site...');
        
        // Show loading state on music button
        musicToggle.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Try to play music
        backgroundMusic.play().then(() => {
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.style.animation = '';
            console.log('Music started successfully!');
            
            // Hide splash screen and show main content
            splashScreen.classList.add('fade-out');
            setTimeout(() => {
                splashScreen.style.display = 'none';
                // Show navigation bar
                navbar.classList.add('visible');
                
                // Ensure music button is visible and properly positioned
                if (musicToggle) {
                    musicToggle.style.display = 'flex';
                    musicToggle.style.position = 'fixed';
                    musicToggle.style.bottom = '20px';
                    musicToggle.style.right = '20px';
                    musicToggle.style.zIndex = '1000';
                }
            }, 500);
            
        }).catch(e => {
            console.log('Music start failed:', e);
            // Still proceed to main site even if music fails
            splashScreen.classList.add('fade-out');
            setTimeout(() => {
                splashScreen.style.display = 'none';
                navbar.classList.add('visible');
                
                if (musicToggle) {
                    musicToggle.style.display = 'flex';
                    musicToggle.style.position = 'fixed';
                    musicToggle.style.bottom = '20px';
                    musicToggle.style.right = '20px';
                    musicToggle.style.zIndex = '1000';
                    musicToggle.classList.remove('playing');
                    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                    musicToggle.style.animation = 'pulse 2s infinite';
                }
            }, 500);
        });
    };
    
    // Handle invite button click
    if (inviteBtn) {
        inviteBtn.addEventListener('click', startMusicAndProceed);
    }
    
    // Show loading bar for 3 seconds, then show invite button
    setTimeout(() => {
        // Hide loading bar
        if (loadingBar) {
            loadingBar.style.opacity = '0';
            setTimeout(() => {
                loadingBar.style.display = 'none';
            }, 500);
        }
        
        // Show invite button
        if (inviteBtn) {
            inviteBtn.style.display = 'flex';
            console.log('Loading complete, invite button shown');
        }
    }, 3000);
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    let lastScrollTop = 0;
    let scrollThreshold = 100;

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Keep navbar always visible with enhanced styling (only after splash screen)
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const splashScreen = document.getElementById('splash-screen');
        
        // Only show navbar if splash screen is hidden
        if (splashScreen && splashScreen.style.display === 'none') {
            // Always keep navbar visible
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            
            // Update background and shadow based on scroll position for better visibility
            if (currentScrollTop > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(44, 44, 44, 0.95), rgba(26, 26, 26, 0.95))';
                navbar.style.boxShadow = '0 4px 40px rgba(0, 0, 0, 0.4)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(44, 44, 44, 0.9), rgba(26, 26, 26, 0.9))';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.3)';
                navbar.style.backdropFilter = 'blur(15px)';
            }
        } else {
            // Hide navbar during splash screen
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-visible');
            navbar.style.opacity = '0';
            navbar.style.visibility = 'hidden';
        }
        
        lastScrollTop = currentScrollTop;
    });
}

// Gallery Lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.dataset.image);

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(images[currentImageIndex]);
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage(images[currentImageIndex]);
    });

    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage(images[currentImageIndex]);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightboxImage(images[currentImageIndex]);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightboxImage(images[currentImageIndex]);
            }
        }
    });

    function openLightbox(imageSrc) {
        lightboxImg.src = `assets/images/${imageSrc}`;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Fade in effect
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    function updateLightboxImage(imageSrc) {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = `assets/images/${imageSrc}`;
            lightboxImg.style.opacity = '1';
        }, 150);
    }
}

// Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    if (!musicToggle || !backgroundMusic) return;

    // Set initial volume and ensure audio is ready
    backgroundMusic.volume = 0.5;
    backgroundMusic.muted = false;

    // Function to toggle music
    const toggleMusic = () => {
        console.log('Music toggle clicked, current state:', backgroundMusic.paused ? 'paused' : 'playing');
        
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.style.animation = '';
                console.log('Music started via toggle');
            }).catch(e => {
                console.log('Toggle play failed:', e);
                isPlaying = false;
                musicToggle.classList.remove('playing');
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                musicToggle.style.animation = 'pulse 2s infinite';
            });
        } else {
            backgroundMusic.pause();
            isPlaying = false;
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.style.animation = '';
            console.log('Music paused via toggle');
        }
    };

    // Remove autoplay setup - we only want music after splash screen

    // Music toggle button click handler
    musicToggle.addEventListener('click', toggleMusic);

    // Handle audio ended (loop)
    backgroundMusic.addEventListener('ended', () => {
        // Since the audio has loop attribute, it should restart automatically
        console.log('Music ended, should loop');
    });

    // Update playing state when audio plays/pauses
    backgroundMusic.addEventListener('play', () => {
        isPlaying = true;
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.style.animation = '';
        console.log('Music play event triggered');
    });

    backgroundMusic.addEventListener('pause', () => {
        isPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        console.log('Music pause event triggered');
    });

    // Handle audio loading
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('Audio can play through');
    });

    backgroundMusic.addEventListener('error', (e) => {
        console.log('Audio error:', e);
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return; // Exit if contact form doesn't exist
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in, .section-header, .about-content, .gallery-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation to images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            img.style.filter = 'grayscale(100%)';
        });
    });
}

// Initialize image loading
initImageLoading();

// Add touch support for mobile gallery
function initTouchSupport() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        let startX = 0;
        let startY = 0;
        
        item.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        item.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = Math.abs(startX - endX);
            const diffY = Math.abs(startY - endY);
            
            // If it's a tap (not a swipe)
            if (diffX < 10 && diffY < 10) {
                item.click();
            }
        });
    });
}

// Initialize touch support
initTouchSupport();

// Add preloader for better performance
window.addEventListener('load', () => {
    // Hide any remaining loading elements
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// Add CSS for notification styles
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 