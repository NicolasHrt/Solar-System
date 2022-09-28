import * as THREE from "three";
import { Plane } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ceilPowerOfTwo } from "three/src/math/mathutils";

// Language: javascript
// Path: vite-project\main.js
const Planets = [];
const planetCanvas = document.getElementsByClassName("planet-image");
console.log(planetCanvas);

const slides = document.getElementsByClassName("planet-card");
const totalSlides = slides.length;
let slidePosition = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

camera.position.setZ(30);

// const controls = new OrbitControls(camera, renderer.domElement);

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

const mercuryGeometry = new THREE.SphereGeometry(15);
const mercuryTexture = new THREE.TextureLoader().load(
  "./textures/8k_mercury.jpg"
);
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
Planets.push(mercury);

const venusGeometry = new THREE.SphereGeometry(15);
const venusTexture = new THREE.TextureLoader().load(
  "./textures/8k_venus_surface.jpg"
);
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
Planets.push(venus);

const earthGeometry = new THREE.SphereGeometry(15);
const earthTexture = new THREE.TextureLoader().load(
  "./textures/8k_earth_daymap.jpg"
);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
Planets.push(earth);

const marsGeometry = new THREE.SphereGeometry(15);
const marsTexture = new THREE.TextureLoader().load(
  "./textures/8k_mars.jpg"
);
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
Planets.push(mars);

const jupiterGeometry = new THREE.SphereGeometry(15);
const jupiterTexture = new THREE.TextureLoader().load(
  "./textures/8k_jupiter.jpg"
);
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
Planets.push(jupiter);

const saturnGeometry = new THREE.SphereGeometry(15);
const saturnTexture = new THREE.TextureLoader().load(
  "./textures/8k_saturn.jpg"
);
const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
Planets.push(saturn);

const uranusGeometry = new THREE.SphereGeometry(15);
const uranusTexture = new THREE.TextureLoader().load(
  "./textures/2k_uranus.jpg"
);
const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
Planets.push(uranus);

const neptuneGeometry = new THREE.SphereGeometry(15);
const neptuneTexture = new THREE.TextureLoader().load(
  "./textures/2K_neptune.jpg"
);
const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
Planets.push(neptune);

const vertices  = [];

for ( let i = 0; i < 10000; i ++ ) {

	const x = THREE.MathUtils.randFloatSpread( 2000 );
	const y = THREE.MathUtils.randFloatSpread( 2000 );
	const z = THREE.MathUtils.randFloatSpread( 2000 );

	vertices .push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const stars = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );

scene.add( stars );

const ReloadScene = () => {

  var container = planetCanvas[slidePosition];
  console.log(container);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  scene.add(Planets[slidePosition]);
  container.appendChild(renderer.domElement);
};

ReloadScene();

function animate() {
  requestAnimationFrame(animate);
  Planets[slidePosition].rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();

//Carousel Buttons

document
  .getElementById("carousel-next-button")
  .addEventListener("click", function () {
    movetoNextSlide();
  });

document
  .getElementById("carousel-previous-button")
  .addEventListener("click", function () {
    movetoPreviousSlide();
  });

const movetoNextSlide = () => {
  scene.remove(Planets[slidePosition]);

  planetCanvas[slidePosition].removeChild(renderer.domElement);
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
};

const movetoPreviousSlide = () => {
  scene.remove(Planets[slidePosition]);
  planetCanvas[slidePosition].removeChild(renderer.domElement);
  if (slidePosition <= 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
};

const updateSlidePosition = () => {
  console.log(slidePosition);
  for (let slide of slides) {
    slide.classList.add("planet-card--hidden");
    slide.classList.remove("planet-card--visible");
  }
  slides[slidePosition].classList.remove("planet-card--hidden");
  slides[slidePosition].classList.add("planet-card--visible");
  ReloadScene();
};
