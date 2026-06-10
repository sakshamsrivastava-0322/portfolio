/* ==========================================================================
   CS STUDENT PORTFOLIO - JS APPLICATION LOGIC
   Features: Custom Cursor, Canvas Particle Background, Typing Effect, 
             Reveal on Scroll, Mobile Nav, Form Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. MOBILE NAVIGATION
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ==========================================
  // 2. CUSTOM CURSOR
  // ==========================================
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot moves instantly
    if (dot) {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }
  });

  // Smooth cursor outline trail (LERP)
  function animateCursor() {
    const ease = 0.15; // interpolation factor
    outlineX += (mouseX - outlineX) * ease;
    outlineY += (mouseY - outlineY) * ease;

    if (outline) {
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Handle hover states for links and interactive items
  const hoverables = document.querySelectorAll('a, button, input, textarea, select, .skill-card, .project-card, .menu-toggle');
  
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });


  // ==========================================
  // 3. CANVAS PARTICLE BACKGROUND
  // ==========================================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 60;

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // 1 to 3px
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(155, 93, 229, 0.4)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce or wrap edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    // Draw lines between close particles
    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dist = Math.hypot(particlesArray[a].x - particlesArray[b].x, particlesArray[a].y - particlesArray[b].y);
          if (dist < 120) {
            opacityValue = 1 - (dist / 120);
            ctx.strokeStyle = `rgba(22, 29, 48, ${opacityValue * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }


  // ==========================================
  // 4. HERO TYPING ANIMATION
  // ==========================================
  const typedTextSpan = document.querySelector('.typed-text');
  const textArray = ["First-Year CS Student", "Creative Developer", "Problem Solver", "Tech Enthusiast"];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (typedTextSpan) {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }
  }

  function erase() {
    if (typedTextSpan) {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingSpeed + 500);
      }
    }
  }

  // Start typing animation
  if (textArray.length) setTimeout(type, 1000);


  // ==========================================
  // 5. REVEAL ON SCROLL (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const navSectionLinks = document.querySelectorAll('.nav-links .nav-item');
  const sections = document.querySelectorAll('section');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Active Nav Item on Scroll
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navSectionLinks.forEach(li => {
      li.classList.remove('active');
      const href = li.querySelector('a').getAttribute('href').substring(1);
      if (href === current) {
        li.classList.add('active');
      }
    });
  });


  // ==========================================
  // 6. CONTACT FORM VALIDATION & HANDLING
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      const inputs = contactForm.querySelectorAll('.form-input');

      // Clear previous error styles
      inputs.forEach(input => {
        input.classList.remove('error');
      });
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      // Validate each input
      inputs.forEach(input => {
        const value = input.value.trim();
        
        if (value === '') {
          input.classList.add('error');
          hasError = true;
        }

        // Email validation specifically
        if (input.type === 'email' && value !== '') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            input.classList.add('error');
            hasError = true;
          }
        }
      });

      if (!hasError) {
        // Mock successful form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        setTimeout(() => {
          // Reset button and form
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          formStatus.textContent = "Thank you! Your message was sent successfully. I'll get back to you soon!";
          formStatus.className = 'form-status success';
          formStatus.style.display = 'block';

          contactForm.reset();
        }, 1500);
      }
    });
  }
});
