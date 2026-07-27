const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cards = document.querySelectorAll<HTMLElement>('.card-tilt');

if (!prefersReducedMotion) {
  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event as MouseEvent).clientX - rect.left;
      const y = (event as MouseEvent).clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
  });
}
