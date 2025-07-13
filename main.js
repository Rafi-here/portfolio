const cards = document.querySelectorAll(".card");
const wrapper = document.querySelector(".card-wrapper");
let currentIndex = 1;

function updateCards() {
  cards.forEach((card, index) => {
    card.classList.remove("active");
    if (index === currentIndex) {
      card.classList.add("active");
    }
  });
  wrapper.style.transform = `translateX(calc(-${currentIndex * 340}px + 50%))`;
}
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi AOS
  AOS.init({
    duration: 800,
    once: true
  });
});
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
});

updateCards();

// Animation card projek
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    
    // Animate cards on load
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Add hover effects
    projectItems.forEach(item => {
        // Card hover
        item.addEventListener('mouseenter', () => {
            const link = item.querySelector('.project-link');
            if (link) link.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            const link = item.querySelector('.project-link');
            if (link) link.style.transform = 'scale(1)';
        });
        
        // Image parallax effect
        const img = item.querySelector('.project-preview img');
        if (img) {
            item.addEventListener('mousemove', (e) => {
                const x = e.clientX - item.getBoundingClientRect().left;
                const y = e.clientY - item.getBoundingClientRect().top;
                
                img.style.transformOrigin = `${x}px ${y}px`;
            });
        }
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const navToggle = document.createElement('button');
  navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  navToggle.className = 'nav-toggle';
  document.querySelector('.navbar').appendChild(navToggle);
  
  navToggle.addEventListener('click', function() {
    document.querySelector('.navbar ul').classList.toggle('show');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.navbar ul').classList.remove('show');
    });
  });
  
  // Adjust hero height on mobile
  function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (window.innerWidth < 768) {
      hero.style.height = 'auto';
      hero.style.minHeight = '100vh';
    } else {
      hero.style.height = '100vh';
    }
  }
  
  window.addEventListener('resize', adjustHeroHeight);
  adjustHeroHeight();
});

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll function
  function smoothScroll(e) {
    // Only handle anchor links
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      const target = document.querySelector(hash);
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, hash);
      }
    }
  }

  // Apply to all anchor links in navbar
  document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
  });

  // Apply to hero button
  document.querySelector('.hero button').parentElement.addEventListener('click', smoothScroll);
  
  // Fallback for browsers without smooth scroll
  if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollFallback = function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        const target = document.querySelector(hash);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (target) {
          const startPos = window.pageYOffset;
          const targetPos = target.offsetTop - navbarHeight;
          const distance = targetPos - startPos;
          const duration = 800;
          let startTime = null;
          
          function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = progress < 0.5 
              ? 2 * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            window.scrollTo(0, startPos + distance * ease);
            
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            } else {
              history.pushState(null, null, hash);
            }
          }
          
          requestAnimationFrame(animation);
        }
      }
    };
    
    // Replace event listeners with fallback
    document.querySelectorAll('.navbar a').forEach(anchor => {
      anchor.removeEventListener('click', smoothScroll);
      anchor.addEventListener('click', smoothScrollFallback);
    });
    
    document.querySelector('.hero button').parentElement.removeEventListener('click', smoothScroll);
    document.querySelector('.hero button').parentElement.addEventListener('click', smoothScrollFallback);
  }
});