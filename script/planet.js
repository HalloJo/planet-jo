const { WebGLRenderer, Scene, PerspectiveCamera } = THREE;

const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x444444, 1);

const webgl = document.querySelector(".webgl");
webgl.appendChild(renderer.domElement);

const scene = new Scene();

const camera = new PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = -3000;

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
