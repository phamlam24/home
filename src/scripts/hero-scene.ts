import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !prefersReducedMotion) {
  const styles = getComputedStyle(document.documentElement);
  const accent = new THREE.Color(styles.getPropertyValue('--color-ctp-teal').trim() || '#8bd5ca');
  const accent2 = new THREE.Color(styles.getPropertyValue('--color-ctp-mauve').trim() || '#c6a0f6');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.IcosahedronGeometry(2.2, 1);
  const material = new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.55 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 14;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particlesMaterial = new THREE.PointsMaterial({ color: accent2, size: 0.03, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  let targetX = 0;
  let targetY = 0;

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
  };
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('pointermove', (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 0.6;
    targetY = (event.clientY / window.innerHeight - 0.5) * 0.6;
  });

  let frameId: number;
  const animate = () => {
    mesh.rotation.x += 0.0015;
    mesh.rotation.y += 0.002;
    particles.rotation.y += 0.0006;

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (-targetY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };
  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
    } else {
      animate();
    }
  });
}
