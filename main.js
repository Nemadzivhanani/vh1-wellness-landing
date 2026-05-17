/* =========================================
   Scroll Animations using Intersection Observer
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SCROLL ANIMATIONS ---
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    const elementInView = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        root: null, 
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver(elementInView, observerOptions);

    scrollElements.forEach((el) => {
        scrollObserver.observe(el);
    });

    // --- CANVAS PARTICLE NETWORK ---
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Brand Colors: Green, Dark Green, Purple
    const colors = ['#7cb342', '#558b2f', '#6a1b9a'];

    // Resize canvas to fit the hero section
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    // Particle Object
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Random direction and speed
            this.vx = (Math.random() - 0.5) * 0.8; 
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 3 + 1; // Size of the dots
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        // Move the particle
        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }

        // Draw the dot
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    // Populate the array with particles
    function initParticles() {
        particlesArray = [];
        // Number of particles depends on screen width so it doesn't get cluttered on mobile
        let numberOfParticles = (canvas.width * canvas.height) / 15000; 
        
        // Cap the number to keep performance high
        if(numberOfParticles > 100) numberOfParticles = 100;
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Connect dots if they are close enough
    function connectParticles() {
        let maxDistance = 120;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // Opacity decreases as they get further apart
                    let opacity = 1 - (distance / maxDistance);
                    ctx.strokeStyle = `rgba(124, 179, 66, ${opacity})`; // Using the brand green for the lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    // Animation Loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    // Start everything
    resizeCanvas();
    initParticles();
    animateParticles();
});