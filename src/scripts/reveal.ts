const targets = document.querySelectorAll<HTMLElement>('.reveal');

if (targets.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  targets.forEach((target) => observer.observe(target));
} else {
  targets.forEach((target) => target.classList.add('is-revealed'));
}
