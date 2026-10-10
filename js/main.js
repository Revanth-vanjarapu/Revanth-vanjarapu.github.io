/**
 * =========================================================================
 * VANJARAPU REVANTH KUMAR | SENIOR FULL STACK DEVELOPER & TEAM LEAD
 * CLIENT-SIDE RUNTIME & INTERACTIVITY ENGINE
 * =========================================================================
 */

// =========================================================================
// 📄 LIVE GOOGLE DRIVE RÉSUMÉ SYNC CONFIGURATION
// When you update your resume in Drive:
// Right-click the file in Google Drive -> "File information" -> "Manage versions"
// -> "Upload new version". The link stays identical forever!
// =========================================================================
const GOOGLE_DRIVE_RESUME_URL = "https://drive.google.com/file/d/1_CWrb_l-tyUpiS1D1SiYCq1YBTUmZziW/view?usp=sharing";

/**
 * 1. Synchronize all resume anchors dynamically across DOM
 */
(function syncResumeLinks() {
  const activeUrl = GOOGLE_DRIVE_RESUME_URL.trim();
  const resumeElements = document.querySelectorAll('.resume-link');
  resumeElements.forEach(el => {
    el.href = activeUrl;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
})();

/**
 * 2. Recruiter / Tech Lead DevTools Console Greeting (Pro-Mode Easter Egg)
 */
(function renderDevToolsGreeting() {
  const badgeStyle = 'background:#0f172a;color:#38bdf8;padding:5px 9px;border-radius:4px 0 0 4px;font-family:monospace;font-weight:bold;font-size:12px;border:1px solid #38bdf8';
  const roleStyle = 'background:#38bdf8;color:#080b12;padding:5px 9px;border-radius:0 4px 4px 0;font-family:monospace;font-weight:bold;font-size:12px;';
  const bodyStyle = 'color:#94a3b8;font-family:monospace;font-size:11px;line-height:1.6;';
  
  console.log('%c Vanjarapu Revanth Kumar %c Senior Full Stack Developer & Team Lead ', badgeStyle, roleStyle);
  console.log(
    '%c' +
    '⚡ Architecture: High-concurrency real-time systems, sub-second dispatch engines & cross-platform apps.\n' +
    '🚀 Core Stack:   TypeScript, MERN, Next.js, Fastify, Redis, WebSockets, React Native, Linode, Docker.\n' +
    '📫 Direct Mail:  vanjarapurevanthk@gmail.com | Phone: +91 9989636166\n' +
    '📂 GitHub:       https://github.com/Revanth-vanjarapu\n' +
    '📄 Live Résumé:  ' + GOOGLE_DRIVE_RESUME_URL,
    bodyStyle
  );
})();

/**
 * 3. Ambient Mouse Spotlight Effect (RAF Throttled for 60fps Performance)
 */
const spotlight = document.getElementById('spotlight');
let ticking = false;

window.addEventListener('mousemove', (e) => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
      ticking = false;
    });
    ticking = true;
  }
});

/**
 * 4. Mobile Navigation Drawer Toggle & Escape Handling
 */
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileBtn && mobileDrawer) {
  mobileBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      mobileDrawer.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 5. Active Navigation Link Highlighting via IntersectionObserver
 */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links .nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/**
 * 6. Interactive Architecture & Project Category Filtering
 */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons && filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 7. One-Click Copy Email to Clipboard with Accessible Toast Feedback
 */
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toast = document.getElementById('toastNotification');
const emailToCopy = 'vanjarapurevanthk@gmail.com';

if (copyEmailBtn && toast) {
  copyEmailBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = emailToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    } catch (err) {
      console.error('Failed to copy email:', err);
      window.location.href = `mailto:${emailToCopy}`;
    }
  });
}
