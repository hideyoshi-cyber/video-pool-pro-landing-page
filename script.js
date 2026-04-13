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

  // Embed mode: hide own footer when embedded in Wix (via ?embed=true)
  if (new URLSearchParams(window.location.search).get('embed') === 'true') {
    document.querySelector('footer')?.remove();
    document.body.style.overflow = 'auto';
  }
});

// ===== Share for Discount =====
const shareUrl = 'https://hideyoshi-cyber.github.io/video-pool-pro-landing-page/';
const shareText = '動画修正指示を劇的に効率化するデスクトップアプリ「Video Pool PRO」。サブスク不要の買い切り型で14日間無料トライアル！';
let shareTimerStarted = false;

function shareAndReveal(platform) {
  let url;
  switch (platform) {
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      break;
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      break;
    case 'instagram':
      // Instagram doesn't have a direct share URL; copy text and open Instagram
      navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      url = 'https://www.instagram.com/';
      break;
    case 'threads':
      url = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      break;
    case 'line':
      url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      break;
  }
  window.open(url, '_blank', 'width=600,height=500');

  // Start 3-minute timer (only once)
  if (!shareTimerStarted) {
    shareTimerStarted = true;
    document.getElementById('share-buttons').style.display = 'none';
    const timerEl = document.getElementById('share-timer-state');
    if (timerEl) timerEl.style.display = 'block';
    startShareCountdown(180); // 3 minutes = 180 seconds
  }
}

function startShareCountdown(seconds) {
  const countdownEl = document.getElementById('share-countdown');
  let remaining = seconds;

  const interval = setInterval(() => {
    remaining--;
    const min = Math.floor(remaining / 60);
    const sec = remaining % 60;
    if (countdownEl) countdownEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;

    if (remaining <= 0) {
      clearInterval(interval);
      // Hide timer, show code
      document.getElementById('share-timer-state').style.display = 'none';
      document.getElementById('share-code-reveal').style.display = 'block';
    }
  }, 1000);
}

function copyShareCode() {
  const code = document.getElementById('share-code')?.textContent;
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      const btn = document.getElementById('share-copy-btn');
      if (btn) {
        btn.textContent = 'コピー済み ✓';
        setTimeout(() => { btn.textContent = 'コピー'; }, 2000);
      }
    });
  }
}

