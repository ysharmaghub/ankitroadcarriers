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
    const siteFooter = document.querySelector('.site-footer');

    if (backToTopBtn) {
        const updateBackToTopButton = () => {
            backToTopBtn.classList.toggle('show', window.scrollY > 400);

            if (!siteFooter) return;

            const footerRect = siteFooter.getBoundingClientRect();
            const footerOverlap = Math.max(0, window.innerHeight - footerRect.top);

            document.documentElement.style.setProperty(
                '--back-to-top-footer-clearance',
                `${footerOverlap}px`
            );
        };

        window.addEventListener('scroll', updateBackToTopButton, { passive: true });
        window.addEventListener('resize', updateBackToTopButton);
        updateBackToTopButton();

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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
        const activePanel = carouselWrapper.querySelector('.carousel-slide--active');
        const nextPanel = carouselWrapper.querySelector('.carousel-slide--next');
        const activeCaption = carouselWrapper.querySelector('.carousel-slide--active .slide-caption');

        function getIndex(offset, index = currentIndex) {
            return (index + offset + total) % total;
        }

        const allSlides = carouselWrapper.querySelectorAll('.carousel-slide');
        let autoPlay = null;
        let isHovered = false;
        let transitionTimer = null;
        let transitionCleanupTimer = null;
        let isCarouselAnimating = false;
        const CAROUSEL_TRANSITION_MS = 800;
        const CAROUSEL_VISIBLE_MS = 3000;
        const CAROUSEL_AUTOPLAY_MS = CAROUSEL_VISIBLE_MS + (CAROUSEL_TRANSITION_MS * 2);
        const carouselReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const preloadedCarouselImages = new Map();

        function preloadCarouselImage(src) {
            if (!src) return Promise.resolve(null);
            if (preloadedCarouselImages.has(src)) {
                return preloadedCarouselImages.get(src).promise;
            }

            const image = new Image();
            image.decoding = 'async';
            image.loading = 'eager';
            image.src = src;

            const promise = (image.decode
                ? image.decode()
                : new Promise(resolve => {
                    image.onload = resolve;
                    image.onerror = resolve;
                }))
                .catch(() => {})
                .then(() => image);

            preloadedCarouselImages.set(src, { image, promise });
            return promise;
        }

        function getPreloadedCarouselImage(src) {
            const cached = preloadedCarouselImages.get(src);
            return cached?.image || null;
        }

        function clearCarouselTransitionState() {
            if (transitionTimer) {
                clearTimeout(transitionTimer);
                transitionTimer = null;
            }
            if (transitionCleanupTimer) {
                clearTimeout(transitionCleanupTimer);
                transitionCleanupTimer = null;
            }
            carouselWrapper.classList.remove('is-sliding-next', 'is-sliding-prev', 'is-entering-next', 'is-entering-prev', 'is-side-accent-entering');
            allSlides.forEach(s => s.classList.remove('is-transitioning'));
            carouselWrapper.classList.remove('is-swap-animating');
            carouselWrapper.querySelectorAll('.carousel-float-slide').forEach(slide => slide.remove());
            if (activeCaption) {
                activeCaption.classList.remove('is-caption-animating');
            }
            isCarouselAnimating = false;
        }

        function setCarouselImages(targetIndex) {
            const prevSrc = carouselImages[getIndex(-1, targetIndex)];
            const activeSrc = carouselImages[targetIndex];
            const nextSrc = carouselImages[getIndex(1, targetIndex)];

            prevSlide.src = prevSrc;
            activeSlide.src = activeSrc;
            nextSlide.src = nextSrc;

            preloadCarouselImage(carouselImages[getIndex(-2, targetIndex)]);
            preloadCarouselImage(prevSrc);
            preloadCarouselImage(activeSrc);
            preloadCarouselImage(nextSrc);
            preloadCarouselImage(carouselImages[getIndex(2, targetIndex)]);
        }

        function animateActiveCaption() {
            if (!activeCaption || carouselReduceMotion) return;

            activeCaption.classList.remove('is-caption-animating');
            void activeCaption.offsetWidth;
            activeCaption.classList.add('is-caption-animating');
        }

        function animateSideAccents() {
            if (carouselReduceMotion || isCompactCarousel()) return;

            carouselWrapper.classList.remove('is-side-accent-entering');
            void carouselWrapper.offsetWidth;
            carouselWrapper.classList.add('is-side-accent-entering');

            transitionCleanupTimer = setTimeout(() => {
                carouselWrapper.classList.remove('is-side-accent-entering');
                transitionCleanupTimer = null;
            }, 420);
        }

        function isCompactCarousel() {
            return window.getComputedStyle(prevPanel).display === 'none'
                || window.getComputedStyle(nextPanel).display === 'none';
        }

        function getPanelBox(panel) {
            const wrapperRect = carouselWrapper.getBoundingClientRect();
            const panelRect = panel.getBoundingClientRect();
            return {
                left: panelRect.left - wrapperRect.left,
                top: panelRect.top - wrapperRect.top,
                width: panelRect.width,
                height: panelRect.height
            };
        }

        function createFloatingSlide(src, box, variant = 'active') {
            const slide = document.createElement('div');
            slide.className = `carousel-float-slide carousel-float-slide--${variant}`;
            Object.assign(slide.style, {
                left: `${box.left}px`,
                top: `${box.top}px`,
                width: `${box.width}px`,
                height: `${box.height}px`
            });

            const cachedImage = getPreloadedCarouselImage(src);
            const img = cachedImage ? cachedImage.cloneNode(false) : document.createElement('img');
            img.src = src;
            img.alt = '';
            img.decoding = 'async';
            img.loading = 'eager';
            slide.appendChild(img);
            carouselWrapper.appendChild(slide);
            return slide;
        }

        function animateFloatingSlide(slide, fromBox, toBox, options = {}) {
            return slide.animate([
                {
                    left: `${fromBox.left}px`,
                    top: `${fromBox.top}px`,
                    width: `${fromBox.width}px`,
                    height: `${fromBox.height}px`,
                    opacity: options.fromOpacity ?? 1,
                    filter: options.fromFilter ?? 'brightness(1)'
                },
                {
                    left: `${toBox.left}px`,
                    top: `${toBox.top}px`,
                    width: `${toBox.width}px`,
                    height: `${toBox.height}px`,
                    opacity: options.toOpacity ?? 1,
                    filter: options.toFilter ?? 'brightness(1)'
                }
            ], {
                duration: CAROUSEL_TRANSITION_MS,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });
        }

        async function updateCarousel(direction = 'next') {
            if (isCarouselAnimating) return false;
            isCarouselAnimating = true;

            const targetIndex = currentIndex;
            clearCarouselTransitionState();
            isCarouselAnimating = true;

            const targetPrevSrc = carouselImages[getIndex(-1, targetIndex)];
            const targetActiveSrc = carouselImages[targetIndex];
            const targetNextSrc = carouselImages[getIndex(1, targetIndex)];

            try {
                await Promise.all([
                    preloadCarouselImage(targetPrevSrc),
                    preloadCarouselImage(targetActiveSrc),
                    preloadCarouselImage(targetNextSrc),
                    preloadCarouselImage(activeSlide.src),
                    preloadCarouselImage(prevSlide.src),
                    preloadCarouselImage(nextSlide.src)
                ]);
            } catch (error) {
                isCarouselAnimating = false;
                return false;
            }

            if (carouselReduceMotion) {
                setCarouselImages(targetIndex);
                animateActiveCaption();
                isCarouselAnimating = false;
                return true;
            }

            if (isCompactCarousel()) {
                const slideDistance = '18%';
                const exitX = direction === 'next' ? `-${slideDistance}` : slideDistance;
                const enterX = direction === 'next' ? slideDistance : `-${slideDistance}`;
                const MOBILE_MS = 350;

                // Slide-out + fade the current image
                const exitAnim = activePanel.animate([
                    { transform: 'translateX(0)', opacity: 1 },
                    { transform: `translateX(${exitX})`, opacity: 0 }
                ], { duration: MOBILE_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' });

                exitAnim.onfinish = () => {
                    exitAnim.cancel();
                    setCarouselImages(targetIndex);

                    // Slide-in + fade the new image from opposite side
                    const enterAnim = activePanel.animate([
                        { transform: `translateX(${enterX})`, opacity: 0 },
                        { transform: 'translateX(0)', opacity: 1 }
                    ], { duration: MOBILE_MS, easing: 'cubic-bezier(0.0, 0, 0.2, 1)', fill: 'forwards' });

                    animateActiveCaption();

                    enterAnim.onfinish = () => {
                        enterAnim.cancel();
                        isCarouselAnimating = false;
                    };
                };
                return true;
            }

            const prevBox = getPanelBox(prevPanel);
            const activeBox = getPanelBox(activePanel);
            const nextBox = getPanelBox(nextPanel);
            let activeFloat;
            let enteringFloat;
            let fadingFloat;
            let futureSideFloat;

            try {
                void carouselWrapper.offsetWidth;
                await new Promise(resolve => requestAnimationFrame(resolve));

                activeFloat = createFloatingSlide(activeSlide.src, activeBox, 'active');
                enteringFloat = direction === 'next'
                    ? createFloatingSlide(nextSlide.src, nextBox, 'entering')
                    : createFloatingSlide(prevSlide.src, prevBox, 'entering');
                fadingFloat = direction === 'next'
                    ? createFloatingSlide(prevSlide.src, prevBox, 'side')
                    : createFloatingSlide(nextSlide.src, nextBox, 'side');
                const futureSideSrc = direction === 'next' ? targetNextSrc : targetPrevSrc;
                const futureSideBox = direction === 'next' ? nextBox : prevBox;
                futureSideFloat = createFloatingSlide(futureSideSrc, futureSideBox, 'future-side');

                await Promise.all(Array.from(carouselWrapper.querySelectorAll('.carousel-float-slide img')).map(img => {
                    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
                    return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
                }));
            } catch (error) {
                isCarouselAnimating = false;
                return false;
            }

            carouselWrapper.classList.add('is-swap-animating');

            if (direction === 'next') {
                animateFloatingSlide(activeFloat, activeBox, prevBox, {
                    toOpacity: 0.45,
                    toFilter: 'brightness(0.6)'
                });
                animateFloatingSlide(enteringFloat, nextBox, activeBox, {
                    fromOpacity: 0.45,
                    fromFilter: 'brightness(0.6)'
                });
                animateFloatingSlide(fadingFloat, prevBox, prevBox, {
                    fromOpacity: 0.45,
                    fromFilter: 'brightness(0.6)',
                    toOpacity: 0,
                    toFilter: 'brightness(0.5)'
                });
                animateFloatingSlide(futureSideFloat, nextBox, nextBox, {
                    fromOpacity: 0,
                    toOpacity: 0.45,
                    fromFilter: 'brightness(0.45)',
                    toFilter: 'brightness(0.6)'
                });
            } else {
                animateFloatingSlide(activeFloat, activeBox, nextBox, {
                    toOpacity: 0.45,
                    toFilter: 'brightness(0.6)'
                });
                animateFloatingSlide(enteringFloat, prevBox, activeBox, {
                    fromOpacity: 0.45,
                    fromFilter: 'brightness(0.6)'
                });
                animateFloatingSlide(fadingFloat, nextBox, nextBox, {
                    fromOpacity: 0.45,
                    fromFilter: 'brightness(0.6)',
                    toOpacity: 0,
                    toFilter: 'brightness(0.5)'
                });
                animateFloatingSlide(futureSideFloat, prevBox, prevBox, {
                    fromOpacity: 0,
                    toOpacity: 0.45,
                    fromFilter: 'brightness(0.45)',
                    toFilter: 'brightness(0.6)'
                });
            }

            transitionTimer = setTimeout(() => {
                setCarouselImages(targetIndex);
                animateActiveCaption();
                transitionTimer = null;
                carouselWrapper.classList.remove('is-swap-animating');
                carouselWrapper.querySelectorAll('.carousel-float-slide').forEach(slide => slide.remove());
                animateSideAccents();
                isCarouselAnimating = false;
            }, CAROUSEL_TRANSITION_MS);
            return true;
        }

        function goNext() {
            if (isCarouselAnimating) return false;
            currentIndex = getIndex(1);
            updateCarousel('next');
            return true;
        }

        function goPrev() {
            if (isCarouselAnimating) return false;
            currentIndex = getIndex(-1);
            updateCarousel('prev');
            return true;
        }

        // Keep each image fully visible for about 3 seconds between transitions
        function stopAutoPlay() {
            if (autoPlay) {
                clearInterval(autoPlay);
                autoPlay = null;
            }
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlay = setInterval(goNext, CAROUSEL_AUTOPLAY_MS);
        }

        function resetAutoPlay() {
            if (!isHovered) {
                startAutoPlay();
            }
        }

        startAutoPlay();

        nextBtn.addEventListener('click', () => { if (goNext()) resetAutoPlay(); });
        prevBtn.addEventListener('click', () => { if (goPrev()) resetAutoPlay(); });
        nextPanel.addEventListener('click', () => { if (goNext()) resetAutoPlay(); });
        prevPanel.addEventListener('click', () => { if (goPrev()) resetAutoPlay(); });

        carouselWrapper.addEventListener('mouseenter', () => {
            isHovered = true;
            stopAutoPlay();
        });
        carouselWrapper.addEventListener('mouseleave', () => {
            isHovered = false;
            startAutoPlay();
        });

        // Touch swipe support
        let touchStartX = 0;
        carouselWrapper.addEventListener('touchstart', (e) => {
            if (isCarouselAnimating) return;
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });
        carouselWrapper.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            let didNavigate = false;
            if (Math.abs(diff) > 50) {
                didNavigate = diff > 0 ? goNext() : goPrev();
            }
            if (didNavigate || Math.abs(diff) <= 50) resetAutoPlay();
        }, { passive: true });

        // Initial load (no animation)
        setCarouselImages(currentIndex);
        carouselImages.forEach(preloadCarouselImage);
    }
});
