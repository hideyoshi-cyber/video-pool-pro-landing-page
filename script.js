// ============================================================
// VIDEO POOL PRO — Landing Page Scripts
// ============================================================

// Scroll-triggered fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Convert fade-up elements below the fold to scroll-triggered
document.addEventListener('DOMContentLoaded', () => {
  const heroBottom = document.getElementById('hero').getBoundingClientRect().bottom;
  
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top > heroBottom) {
      el.classList.remove('fade-up');
      el.classList.add('fade-up-scroll');
      observer.observe(el);
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
