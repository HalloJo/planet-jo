const {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  MeshLambertMaterial,
  SphereGeometry,
  Mesh,
  AmbientLight,
  PointLight,
} = THREE;

const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

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

// ADD LIGHTING

const light = new AmbientLight(0x404040);
scene.add(light);
const pointLight = new PointLight(0xffffff, 1, 0);
pointLight.position.set(500, 500, -2000);
scene.add(pointLight);

// CREATE SHAPE

const makePlanet = () => {
  const geometry = new SphereGeometry(800, 128, 128);
  const material = new MeshLambertMaterial({
    color: 0xffa123,
  });
  const planet = new Mesh(geometry, material);

  scene.add(planet);
};

makePlanet();

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  camera.lookAt(scene.position);
};

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
