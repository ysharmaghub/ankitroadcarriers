document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple scroll spy to highlight active nav link
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Service card flip buttons
    document.querySelectorAll('.service-card').forEach(card => {
        const readMoreBtn = card.querySelector('.service-read-more');
        const closeBtn = card.querySelector('.service-close');
        if (!readMoreBtn || !closeBtn) return;

        closeBtn.setAttribute('tabindex', '-1');

        readMoreBtn.addEventListener('click', () => {
            card.classList.add('is-flipped');
            readMoreBtn.setAttribute('aria-expanded', 'true');
            readMoreBtn.setAttribute('tabindex', '-1');
            closeBtn.removeAttribute('tabindex');
            closeBtn.focus();
        });

        closeBtn.addEventListener('click', () => {
            card.classList.remove('is-flipped');
            readMoreBtn.setAttribute('aria-expanded', 'false');
            closeBtn.setAttribute('tabindex', '-1');
            readMoreBtn.removeAttribute('tabindex');
            readMoreBtn.focus();
        });

        card.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape' || !card.classList.contains('is-flipped')) return;

            card.classList.remove('is-flipped');
            readMoreBtn.setAttribute('aria-expanded', 'false');
            closeBtn.setAttribute('tabindex', '-1');
            readMoreBtn.removeAttribute('tabindex');
            readMoreBtn.focus();
        });
    });

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact map switching
    const contactMap = document.getElementById('contactMap');
    const mapWrapper = document.querySelector('.map-wrapper');
    const officeMapLinks = document.querySelectorAll('.office-map-link');
    if (contactMap && mapWrapper && officeMapLinks.length) {
        const scrollMapIntoViewOnMobile = () => {
            if (!window.matchMedia('(max-width: 1024px)').matches) return;

            window.setTimeout(() => {
                const headerOffset = 80;
                const mapPosition = mapWrapper.getBoundingClientRect().top + window.scrollY - headerOffset;

                window.scrollTo({
                    top: mapPosition,
                    behavior: 'smooth'
                });
            }, 180);
        };

        officeMapLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const nextSrc = link.dataset.mapSrc;
                if (!nextSrc) return;

                e.preventDefault();

                officeMapLinks.forEach(item => item.classList.toggle('is-active', item === link));
                scrollMapIntoViewOnMobile();
                if (contactMap.getAttribute('src') === nextSrc) return;

                mapWrapper.classList.add('is-changing');
                window.setTimeout(() => {
                    contactMap.setAttribute('src', nextSrc);
                }, 160);
            });
        });

        contactMap.addEventListener('load', () => {
            mapWrapper.classList.remove('is-changing');
        });
    }

    // Shrinking Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navWrap = document.getElementById('navWrap');
    if (navToggle && navWrap) {
        navToggle.addEventListener('click', () => {
            const open = navWrap.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', open);
            navToggle.setAttribute('aria-expanded', String(open));
        });
        navWrap.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navWrap.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3-Panel Carousel
    const carouselImages = [
        'truck/2.png',
        'truck/4.png',
        'truck/20190910_102830.jpg',
        'truck/1.png',
        'truck/2022-11-11.jpg',
        'truck/3.png'
    ];
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper && carouselImages.length) {
        let currentIndex = 0;
        const total = carouselImages.length;
        const prevSlide = carouselWrapper.querySelector('.carousel-slide--prev img');
        const activeSlide = carouselWrapper.querySelector('.carousel-slide--active img');
        const nextSlide = carouselWrapper.querySelector('.carousel-slide--next img');
        const prevBtn = carouselWrapper.querySelector('.carousel-btn--prev');
        const nextBtn = carouselWrapper.querySelector('.carousel-btn--next');
        const prevPanel = carouselWrapper.querySelector('.carousel-slide--prev');
        const nextPanel = carouselWrapper.querySelector('.carousel-slide--next');

        function getIndex(offset) {
            return (currentIndex + offset + total) % total;
        }

        const allSlides = carouselWrapper.querySelectorAll('.carousel-slide');

        function updateCarousel() {
            // Add transition class
            allSlides.forEach(s => s.classList.add('is-transitioning'));

            setTimeout(() => {
                prevSlide.src = carouselImages[getIndex(1)];
                activeSlide.src = carouselImages[currentIndex];
                nextSlide.src = carouselImages[getIndex(-1)];

                // Remove transition class to reveal
                requestAnimationFrame(() => {
                    allSlides.forEach(s => s.classList.remove('is-transitioning'));
                });
            }, 800);
        }

        function goNext() {
            currentIndex = getIndex(-1);
            updateCarousel();
        }

        function goPrev() {
            currentIndex = getIndex(1);
            updateCarousel();
        }

        // Auto-play every 5 seconds
        let autoPlay = setInterval(goNext, 5000);

        function resetAutoPlay() {
            clearInterval(autoPlay);
            autoPlay = setInterval(goNext, 5000);
        }

        nextBtn.addEventListener('click', () => { goNext(); resetAutoPlay(); });
        prevBtn.addEventListener('click', () => { goPrev(); resetAutoPlay(); });
        nextPanel.addEventListener('click', () => { goPrev(); resetAutoPlay(); });
        prevPanel.addEventListener('click', () => { goNext(); resetAutoPlay(); });

        carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
        carouselWrapper.addEventListener('mouseleave', () => {
            autoPlay = setInterval(goNext, 5000);
        });

        // Touch swipe support
        let touchStartX = 0;
        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoPlay);
        }, { passive: true });
        carouselWrapper.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? goNext() : goPrev();
            }
            autoPlay = setInterval(goNext, 5000);
        }, { passive: true });

        // Initial load (no animation)
        prevSlide.src = carouselImages[getIndex(1)];
        activeSlide.src = carouselImages[currentIndex];
        nextSlide.src = carouselImages[getIndex(-1)];
    }
});
