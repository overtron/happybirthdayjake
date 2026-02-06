document.addEventListener('DOMContentLoaded', function () {
    // ============================================================
    // ELEMENTS
    // ============================================================
    const surpriseButton = document.getElementById('surprise-button');
    const modal = document.getElementById('surprise-modal');
    const closeButton = document.querySelector('.close-button');
    const birthdayMessage = document.getElementById('birthday-message');
    const funFactElement = document.getElementById('fun-fact');
    const pizzaIcon = document.getElementById('pizza-icon');
    const backgroundMusic = document.getElementById('background-music');
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const sections = document.querySelectorAll('.full-section');
    const navDots = document.querySelectorAll('.nav-dot');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const factSlides = document.querySelectorAll('.fact-slide');

    // ============================================================
    // DATA
    // ============================================================
    const funFacts = [
        "Jake can debug a stack trace AND sand down a table leg with finesse.",
        "Jake's woodworking projects are as elegant as his code.",
        "Legend says Jake can catch fish with just a witty comment.",
        "Jake's Pizza Fridays have become the stuff of legend.",
        "Jake once brewed a beer so good, it fixed a production bug."
    ];

    const message = "Happy Birthday to a person who can debug a stack trace *and* sand down a table leg with finesse. You make tech more human and Fridays more delicious. Cheers to another trip around the sun, full of side projects and slow pours. 🎉🍻";

    const floatingEmojis = ['🎈', '🎉', '🎊', '⭐', '✨', '🎂', '🍕', '🎁', '🎵', '🪵'];

    // ============================================================
    // PARTICLE SYSTEM (Background stars / sparkles)
    // ============================================================
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 40 : 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            const currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.pulse));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.1})`;
            ctx.fill();
        }
    }

    // Connection lines between nearby particles (desktop only)
    function drawConnections() {
        if (isMobile) return;
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ============================================================
    // FLOATING DECORATIVE EMOJIS
    // ============================================================
    const floatingDecor = document.getElementById('floating-decor');

    function spawnFloatingEmoji() {
        const el = document.createElement('div');
        el.className = 'floating-element';
        el.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

        const duration = Math.random() * 15 + 15;
        el.style.animationDuration = duration + 's';
        el.style.animationDelay = Math.random() * 5 + 's';

        floatingDecor.appendChild(el);

        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, (duration + 5) * 1000);
    }

    // Spawn initial batch
    for (let i = 0; i < (isMobile ? 5 : 10); i++) {
        setTimeout(spawnFloatingEmoji, Math.random() * 5000);
    }

    // Keep spawning
    setInterval(spawnFloatingEmoji, isMobile ? 4000 : 2500);

    // ============================================================
    // PARALLAX SCROLLING
    // ============================================================
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    function updateParallax() {
        const scrollY = window.scrollY;
        parallaxBgs.forEach(bg => {
            const speed = parseFloat(bg.dataset.speed) || 0.2;
            const section = bg.parentElement;
            const rect = section.getBoundingClientRect();
            const offset = rect.top * speed;
            bg.style.transform = `translateY(${offset}px)`;
        });
    }

    window.addEventListener('scroll', function () {
        requestAnimationFrame(updateParallax);
    });

    // ============================================================
    // SCROLL REVEAL (Intersection Observer)
    // ============================================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================================
    // SECTION NAVIGATION DOTS
    // ============================================================
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                navDots.forEach(dot => dot.classList.remove('active'));
                if (navDots[index]) navDots[index].classList.add('active');
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => sectionObserver.observe(section));

    navDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const index = parseInt(this.dataset.section);
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ============================================================
    // FUN FACTS CAROUSEL
    // ============================================================
    let currentFact = 0;
    let factInterval;

    function showFact(index) {
        factSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'exit');
            if (i === currentFact && i !== index) {
                slide.classList.add('exit');
            }
        });
        currentFact = index;
        factSlides[currentFact].classList.add('active');

        carouselDots.forEach(dot => dot.classList.remove('active'));
        carouselDots[currentFact].classList.add('active');
    }

    function nextFact() {
        showFact((currentFact + 1) % factSlides.length);
    }

    function startCarousel() {
        factInterval = setInterval(nextFact, 4000);
    }

    carouselDots.forEach(dot => {
        dot.addEventListener('click', function () {
            clearInterval(factInterval);
            showFact(parseInt(this.dataset.fact));
            startCarousel();
        });
    });

    startCarousel();

    // ============================================================
    // 3D TILT EFFECT ON CARDS
    // ============================================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ============================================================
    // TYPEWRITER EFFECT
    // ============================================================
    let typewriterTimeout;

    function typeWriter(element, text, speed, callback) {
        let index = 0;
        element.textContent = '';

        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        element.appendChild(cursor);

        function type() {
            if (index < text.length) {
                const textNode = document.createTextNode(text.charAt(index));
                element.insertBefore(textNode, cursor);
                index++;
                typewriterTimeout = setTimeout(type, speed);
            } else {
                // Remove cursor after finishing
                setTimeout(() => {
                    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                    if (callback) callback();
                }, 1500);
            }
        }

        type();
    }

    // ============================================================
    // SURPRISE BUTTON & MODAL
    // ============================================================
    surpriseButton.addEventListener('click', function () {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        openModal();
    });

    function openModal() {
        modal.style.display = 'block';

        // Reset message and start typewriter
        birthdayMessage.textContent = '';
        typeWriter(birthdayMessage, message, 30, function () {
            showRandomFunFact();
        });

        // Launch confetti burst
        launchConfettiBurst();
    }

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        clearTimeout(typewriterTimeout);
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            clearTimeout(typewriterTimeout);
        }
    });

    // ============================================================
    // FUN FACTS IN MODAL
    // ============================================================
    let modalFactInterval;

    function showRandomFunFact() {
        let currentIndex = 0;
        funFactElement.textContent = funFacts[currentIndex];
        funFactElement.style.opacity = '1';

        clearInterval(modalFactInterval);
        modalFactInterval = setInterval(function () {
            funFactElement.style.opacity = '0';
            setTimeout(function () {
                currentIndex = (currentIndex + 1) % funFacts.length;
                funFactElement.textContent = funFacts[currentIndex];
                funFactElement.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    // ============================================================
    // PIZZA EASTER EGG
    // ============================================================
    pizzaIcon.addEventListener('click', function () {
        alert("It's Pizza Friday, every day for you, Jake!");
        launchConfettiBurst();
    });

    // ============================================================
    // CONFETTI
    // ============================================================
    function launchConfetti(particleCount) {
        particleCount = particleCount || 100;
        confetti({
            particleCount: isMobile ? Math.min(particleCount, 50) : particleCount,
            spread: isMobile ? 50 : 70,
            origin: { y: 0.6 }
        });
    }

    function launchConfettiBurst() {
        // Multi-wave confetti burst
        var colors = ['#ff6b6b', '#ffd93d', '#546de5', '#ff9a8b', '#ffffff'];

        confetti({
            particleCount: isMobile ? 40 : 80,
            spread: 60,
            origin: { y: 0.7, x: 0.5 },
            colors: colors
        });

        setTimeout(function () {
            confetti({
                particleCount: isMobile ? 30 : 60,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.65 },
                colors: colors
            });
        }, 200);

        setTimeout(function () {
            confetti({
                particleCount: isMobile ? 30 : 60,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.65 },
                colors: colors
            });
        }, 400);
    }

    // Initial confetti on page load
    setTimeout(launchConfetti, 500);

    // ============================================================
    // ORIENTATION CHANGE
    // ============================================================
    window.addEventListener('orientationchange', function () {
        setTimeout(function () {
            resizeCanvas();
            if (modal.style.display === 'block') {
                var modalContent = document.querySelector('.modal-content');
                if (modalContent) modalContent.style.marginTop = '5%';
            }
        }, 300);
    });
});
