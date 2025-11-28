// ========================================
// ADVANCED MOUSE TRACKING & PARALLAX
// ========================================

class AdvancedMouseTracking {
  constructor() {
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.setupParallax();
  }

  setupParallax() {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      this.galleryItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(mouseY - itemCenterY, mouseX - itemCenterX);
        const distance = Math.hypot(mouseX - itemCenterX, mouseY - itemCenterY);
        const maxDistance = 500;
        const influence = Math.max(0, 1 - distance / maxDistance);

        const rotationX = Math.sin(angle) * influence * 8;
        const rotationY = Math.cos(angle) * influence * 8;

        item.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      });
    });
  }
}

// ========================================
// SUPER CREATIVE GALLERY WITH NEON EFFECTS
// ========================================

class NeonGallery {
  constructor() {
    this.modal = document.getElementById('imageModal');
    this.modalImage = document.getElementById('modalImage');
    this.modalCaption = document.getElementById('modalCaption');
    this.closeBtn = document.querySelector('.close');
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.mouse = { x: 0, y: 0 };

    this.setupEventListeners();
    this.addAdvancedEffects();
    this.createParticles();
    this.startAnimationLoop();
  }

  setupEventListeners() {
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const content = item.querySelector('.content');
        const caption = content.querySelector('h3').textContent + ' - ' + content.querySelector('p').textContent;
        this.openModal(img.src, caption);
      });

      // Add stagger animation
      item.style.animationDelay = `${index * 0.05}s`;
      item.style.animation = 'galleryEnter 0.8s ease-out backwards';

      // Add touch event for mobile
      item.addEventListener('touchstart', () => {
        item.style.transform = 'scale(0.98)';
      });

      item.addEventListener('touchend', () => {
        item.style.transform = '';
      });

      // Add glow effect on focus
      item.addEventListener('mouseenter', () => {
        item.style.animation = 'borderGlow 1.5s ease-in-out infinite';
      });

      item.addEventListener('mouseleave', () => {
        item.style.animation = 'none';
      });
    });

    this.closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // Mouse move effect (only on desktop)
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.updateGlowEffect(e);
      });
    }
  }

  updateGlowEffect(e) {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    
    this.galleryItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemX = rect.left + rect.width / 2;
      const itemY = rect.top + rect.height / 2;
      
      const distance = Math.hypot(e.clientX - itemX, e.clientY - itemY);
      const maxDistance = 300;
      
      if (distance < maxDistance) {
        const intensity = (1 - distance / maxDistance) * 0.5;
        item.style.setProperty('--glow-intensity', intensity);
      } else {
        item.style.setProperty('--glow-intensity', 0);
      }
    });
  }

  addAdvancedEffects() {
    // Add CSS variables for dynamic effects
    const style = document.createElement('style');
    style.textContent = `
      .gallery-item {
        --glow-intensity: 0;
        box-shadow: 
          0 8px 32px rgba(131, 56, 236, calc(0.2 + var(--glow-intensity))),
          0 0 60px rgba(255, 0, 110, calc(0.1 + var(--glow-intensity))),
          inset 0 0 20px rgba(6, 255, 165, calc(0.05 + var(--glow-intensity) * 2)),
          0 0 100px rgba(131, 56, 236, calc(var(--glow-intensity) * 0.3));
        transition: box-shadow 0.3s ease;
      }
      
      @keyframes galleryEnter {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          filter: blur(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  createParticles() {
    // Create floating particles in background
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(131, 56, 236, 0.9), rgba(255, 0, 110, 0.3));
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        box-shadow: 0 0 ${size * 3}px rgba(6, 255, 165, 0.6);
        animation: float ${duration}s infinite ease-in-out ${delay}s;
        opacity: ${Math.random() * 0.6 + 0.4};
        filter: blur(0.5px);
      `;

      particleContainer.appendChild(particle);
    }

    document.body.insertBefore(particleContainer, document.body.firstChild);
  }

  openModal(src, caption) {
    this.modalImage.src = src;
    this.modalCaption.textContent = caption;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add modal entrance animation
    this.modalImage.style.animation = 'none';
    setTimeout(() => {
      this.modalImage.style.animation = 'modalSlideIn 0.5s ease-out';
    }, 10);
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  startAnimationLoop() {
    // Add more dynamic effects
    setInterval(() => {
      this.galleryItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && Math.random() > 0.97) {
          item.style.animation = 'none';
          setTimeout(() => {
            item.style.animation = 'pulse 0.6s ease-out';
          }, 10);
        }
      });
    }, 1500);
  }
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

class ScrollReveal {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'galleryEnter 0.8s ease-out forwards';
          this.observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    this.observeElements();
  }

  observeElements() {
    document.querySelectorAll('.gallery-item').forEach((item) => {
      this.observer.observe(item);
    });
  }
}

// ========================================
// MODAL ANIMATIONS
// ========================================

const modalStyles = document.createElement('style');
modalStyles.textContent = `
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.7) translateY(30px);
      filter: blur(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }

  .modal-content {
    animation: modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .modal {
    animation: fadeInModal 0.3s ease-out;
  }

  @keyframes fadeInModal {
    from {
      opacity: 0;
      backdrop-filter: blur(0);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(10px);
    }
  }

  .close {
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: 40px;
    font-weight: bold;
    color: var(--neon-green);
    cursor: pointer;
    z-index: 1001;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    background: rgba(131, 56, 236, 0.2);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--neon-green);
    box-shadow: 0 0 20px rgba(6, 255, 165, 0.5);
  }

  .close:hover {
    color: var(--neon-pink);
    background: rgba(255, 0, 110, 0.3);
    transform: rotate(90deg) scale(1.1);
    border-color: var(--neon-pink);
    box-shadow: 0 0 40px rgba(255, 0, 110, 0.8);
  }
`;
document.head.appendChild(modalStyles);

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Check if mobile device
  const isMobile = window.innerWidth <= 768;
  
  // Initialize advanced mouse tracking for 3D effects
  if (!isMobile) {
    new AdvancedMouseTracking();
  }

  // Initialize neon gallery
  new NeonGallery();

  // Initialize scroll animations
  new ScrollReveal();

  // Preload images
  preloadImages();

  // Add dynamic background effect on mouse movement (desktop only)
  if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mouse-x', x + '%');
      document.body.style.setProperty('--mouse-y', y + '%');
    });
  }

  // Optimize for mobile
  if (isMobile) {
    // Disable hover effects and use active states instead
    const style = document.createElement('style');
    style.textContent = `
      @media (hover: none) {
        .gallery-item:hover {
          transform: translateY(-8px) scale(1.01);
        }
        
        .gallery-item:active {
          transform: scale(0.98);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Handle window resize for responsive adjustments
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (width <= 380) {
      galleryGrid.style.gap = '0.6rem';
    } else if (width <= 480) {
      galleryGrid.style.gap = '0.8rem';
    } else if (width <= 768) {
      galleryGrid.style.gap = '1.2rem';
    } else {
      galleryGrid.style.gap = '2rem';
    }
  });
});

function preloadImages() {
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src) {
      const preload = new Image();
      preload.onload = () => {
        img.classList.add('loaded');
      };
      preload.onerror = () => {
        img.classList.add('loaded');
      };
      preload.src = src;
    }
  });
}
