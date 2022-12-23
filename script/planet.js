const {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  MeshLambertMaterial,
  SphereGeometry,
  Mesh,
  AmbientLight,
  PointLight,
  TextureLoader,
  TorusGeometry,
  Group,
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

// ADD IMAGE TO TEXTURE

const loader = new TextureLoader();

// ADD LIGHTING

const light = new AmbientLight(0x404040);
scene.add(light);
const pointLight = new PointLight(0xffffff, 1, 0);
pointLight.position.set(500, 500, -2000);
scene.add(pointLight);

// CREATE PLANET

const makePlanet = () => {
  const texture = loader.load("assets/planet_jo.jpg");
  const geometry = new SphereGeometry(800, 128, 128);
  const material = new MeshLambertMaterial({
    // color: 0xffa123,
    map: texture,
  });

  const planet = new Mesh(geometry, material);

  scene.add(planet);

  return planet;
};

// CREATE RING

const makeRing = (width, color) => {
  const geometry = new TorusGeometry(width, 5, 16, 100);
  const material = new MeshLambertMaterial({
    color: color,
  });

  const mesh = new Mesh(geometry, material);

  mesh.geometry.rotateX(Math.PI / 2);
  mesh.geometry.rotateZ(Math.PI / 10);

  scene.add(mesh);
  return mesh;
};

// CREATE MOON

const makeMoon = () => {
  const texture = loader.load("assets/antler_moon.jpg");
  const geometry = new SphereGeometry(100, 64, 64);
  const material = new MeshLambertMaterial({
    map: texture,
  });

  const moon = new Mesh(geometry, material);
  scene.add(moon);

  return moon;
};

const earth = makePlanet();
const firstRing = makeRing(1000, 0xf9a026);
const secondRing = makeRing(1100, 0xffffff);
const thirdRing = makeRing(900, 0x444444);

const moon = makeMoon();
const moonGroup = new Group();
moonGroup.add(moon);
scene.add(moonGroup);

moon.translateX(-1200);

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  camera.lookAt(scene.position);

  earth.rotateY(0.003);
  moon.rotateY(0.01);
  moonGroup.rotateY(0.006);
  firstRing.geometry.rotateY(-0.002);
  secondRing.geometry.rotateY(0.001);
  thirdRing.geometry.rotateY(-0.003);
};

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// document.addEventListener("scroll", () => {
//   const scrollPosition = window.pageYOffset;

//     earth.rotation.set(0, scrollPosition / 100, 0);
//     firstRing.rotation.set(0, scrollPosition / -250, 0);
// });

document.addEventListener("mousemove", (event) => {
  camera.position.x = (window.innerWidth / 2 - event.pageX) * 2;
  camera.position.y = (window.innerHeight / 2 - event.pageY) * 2;
});
