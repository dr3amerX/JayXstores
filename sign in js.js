document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme){
    if(theme === 'light') document.documentElement.classList.add('light-theme');
    else document.documentElement.classList.remove('light-theme');
    try{ localStorage.setItem('preferred-theme', theme); }catch(e){}
    if(themeToggle){
      themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-pressed', theme === 'light');
    }
  }

  // Initialize theme from preference or system
  (function initTheme(){
    const saved = localStorage.getItem('preferred-theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(saved || (prefersLight ? 'light' : 'dark'));
  })();

  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const isLight = document.documentElement.classList.contains('light-theme');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  const form = document.getElementById('signin-form');
  const message = document.getElementById('message');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const toggle = document.getElementById('togglePassword');

  function announce(msg, ok = true) {
    message.textContent = msg;
    message.style.color = ok ? '#16a34a' : '#ef4444';
    message.setAttribute('aria-hidden', 'false');
  }

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      toggle.textContent = type === 'password' ? 'Show' : 'Hide';
      toggle.setAttribute('aria-pressed', type === 'text');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email) { announce('Please enter your email or username', false); emailInput.focus(); return; }
    if (!isEmailValid(email) && !/^\w{3,}$/.test(email)) { announce('Enter a valid email or username', false); emailInput.focus(); return; }
    if (password.length < 6) { announce('Password must be at least 6 characters', false); passwordInput.focus(); return; }

    announce('Signing in...');
    setTimeout(() => {
      // Demo credentials
      if (email.toLowerCase() === 'user@example.com' && password === 'password123') {
        const token = 'demo-token-12345';
        if (document.getElementById('remember').checked) localStorage.setItem('demo_auth_token', token);
        else sessionStorage.setItem('demo_auth_token', token);
        announce('Signed in successfully — redirecting...');
        form.reset();
        // Give the user a moment to read the message, then navigate to the fashion page
        setTimeout(()=>{
          // Navigate to sibling folder `web-fashion/index.html`
          window.location.href = '../web-fashion/index.html';
        }, 650);
      } else {
        announce('Invalid credentials', false);
      }
    }, 800);
  });
});
