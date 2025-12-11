document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      const isHidden = mobileNav.hasAttribute('hidden');
      
      if (isHidden) {
        mobileNav.removeAttribute('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.innerHTML = '✕';
      } else {
        mobileNav.setAttribute('hidden', '');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
      }
    });
    
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.setAttribute('hidden', '');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
      });
    });
    
    document.addEventListener('click', function(event) {
      const isClickInsideNav = mobileNav.contains(event.target);
      const isClickOnButton = mobileMenuBtn.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnButton && !mobileNav.hasAttribute('hidden')) {
        mobileNav.setAttribute('hidden', '');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
      }
    });
    
    mobileMenuBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !mobileNav.hasAttribute('hidden')) {
        mobileNav.setAttribute('hidden', '');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.focus();
      }
    });
  }

  const API = 'http://localhost:3000/api/news';

  function cardTemplate({title, link, contentSnippet, image, isoDate, source}) {
    const time = new Date(isoDate).toLocaleString('id-ID');
    return `
      <a class="card" href="${link}" target="_blank" rel="noopener">
        <img src="${image.large || image || 'https://via.placeholder.com/400x225?text=No+Image'}" alt="${title}" onerror="this.style.display='none'" />
        <div class="card-body">
          <h3 class="card-title">${title}</h3>
          <p class="card-desc">${contentSnippet || ''}</p>
          <div class="card-footer">${source} · ${time}</div>
        </div>
      </a>`;
  }

  async function loadNews() {
    const con = document.getElementById('news-container');
    try {
      const res = await fetch(API);
      if(!res.ok) throw new Error(res.status);
      const data = await res.json();
      con.innerHTML = data.map(cardTemplate).join('');
    } catch (e) {
      // con.innerHTML = `<div class="news-error">Gagal memuat berita (${e.message})</div>`;
    }
  }

  loadNews();
});