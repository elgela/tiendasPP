const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
});
