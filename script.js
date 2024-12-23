document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    // Parallax effect for multiple elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Depth Parallax
        document.querySelectorAll('[data-depth]').forEach(element => {
            const depth = element.dataset.depth || 0.5;
            const moveY = -(scrolled * depth);
            element.style.transform = `translate3d(0, ${moveY}px, 0)`;
        });

        // Perspective Parallax
        document.querySelectorAll('.parallax-perspective').forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerPoint = rect.top + rect.height / 2;
            const screenCenter = windowHeight / 2;
            const rotateX = (centerPoint - screenCenter) * 0.1;
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg)`;
        });

        // Zoom Parallax
        document.querySelectorAll('.parallax-zoom').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const distance = (windowHeight - rect.top) / windowHeight;
                const scale = 1 + (distance * 0.5);
                element.style.transform = `scale(${scale})`;
            }
        });

        // Stagger Parallax
        document.querySelectorAll('.stagger-group').forEach(group => {
            const elements = group.children;
            Array.from(elements).forEach((el, index) => {
                const delay = index * 0.1;
                const speed = el.dataset.speed || 0.2;
                el.style.transform = `translateY(${scrolled * speed}px)`;
                el.style.transitionDelay = `${delay}s`;
            });
        });

        // Reveal Parallax
        document.querySelectorAll('.parallax-reveal').forEach(element => {
            const rect = element.getBoundingClientRect();
            const revealPoint = windowHeight * 0.75;
            
            if (rect.top < revealPoint) {
                const distance = (revealPoint - rect.top) / revealPoint;
                element.style.clipPath = `circle(${distance * 100}% at center)`;
            }
        });

        // Tilt Parallax
        document.querySelectorAll('.parallax-tilt').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });

        // Wave Parallax
        document.querySelectorAll('.parallax-wave').forEach(element => {
            const amplitude = element.dataset.amplitude || 20;
            const frequency = element.dataset.frequency || 0.02;
            const phase = scrolled * frequency;
            const y = Math.sin(phase) * amplitude;
            element.style.transform = `translateY(${y}px)`;
        });

        // Blur Parallax
        document.querySelectorAll('.parallax-blur').forEach(element => {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(windowHeight / 2 - rect.top);
            const blur = Math.min(distance * 0.05, 10);
            element.style.filter = `blur(${blur}px)`;
        });

        // Color Shift Parallax
        document.querySelectorAll('.parallax-color').forEach(element => {
            const hue = (scrolled * 0.1) % 360;
            element.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
        });
    });

    // Intersection Observer for fade-in effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all sections and parallax elements
    sections.forEach(section => {
        observer.observe(section);
    });

    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        document.querySelectorAll('.mouse-parallax').forEach(element => {
            const depth = element.dataset.depth || 0.1;
            const moveX = (windowWidth/2 - mouseX) * depth;
            const moveY = (windowHeight/2 - mouseY) * depth;
            element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });

    // Enable normal scrolling
    document.body.style.overflow = 'auto';
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optional: Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / 1000, 1);
                    const ease = easeOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + (distance * ease));
                    
                    if (timeElapsed < 1000) {
                        requestAnimationFrame(animation);
                    }
                }

                function easeOutCubic(t) {
                    return 1 - Math.pow(1 - t, 3);
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
    }

    // Theme switch handler
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    document.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.documentElement.style.setProperty('--scroll-percent', `${scrollPercent}%`);
    });

    // Get all card wrappers
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    
    // Initial position for cards
    cardWrappers.forEach((wrapper, index) => {
        if (index > 0) {
            wrapper.style.marginTop = '-90vh';
        }
    });

    // Handle scroll animations
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        cardWrappers.forEach((wrapper, index) => {
            const rect = wrapper.getBoundingClientRect();
            const scrollProgress = (scrollPosition - rect.top) / windowHeight;

            if (scrollProgress > 0 && scrollProgress < 1) {
                wrapper.style.transform = `translateY(${scrollProgress * 100}px)`;
                wrapper.style.opacity = 1;
            } else {
                wrapper.style.opacity = 0.3;
            }
        });
    });
});
