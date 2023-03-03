import * as THREE from "three"
import gsap from "gsap"
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene()

//Ball

// //Texture
const textureEye1 = new THREE.TextureLoader().load( 'img/eye_texture.png' )
textureEye1.offset.y = -0.5
textureEye1.offset.x = -0.1
textureEye1.repeat.set(3, 2);

const geoEye1 = new THREE.SphereGeometry(3, 64, 64)
const matEye1 = new THREE.MeshStandardMaterial({
  map: textureEye1,
  roughness: 0.3
})
const eye1 = new THREE.Mesh(geoEye1, matEye1)
eye1.position.x = 5;
scene.add(eye1)

const textureEye2 = new THREE.TextureLoader().load( 'img/eye_texture.png' )
textureEye2.offset.y = -0.5
textureEye2.offset.x = -0.35
textureEye2.repeat.set(3, 2);

const geoEye2 = new THREE.SphereGeometry(3, 64, 64)
const matEye2 = new THREE.MeshStandardMaterial({
  map: textureEye2,
  roughness: 0.3
})
const eye2 = new THREE.Mesh(geoEye2, matEye2)
eye2.position.x = -5;
scene.add(eye2)



//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 0, 10)
light.intensity = 1.25
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = false;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false;

//Resize 
window.addEventListener('resize', () => {
  //Update Size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline Anim
const tl = gsap.timeline({defaults: {duration: 1} })
tl.fromTo(eye1.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
tl.fromTo(eye2.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1}, "-=1")
tl.fromTo(".title", {opacity: 0}, {opacity: 1})


// //Objet collé à la souris
// canvas.addEventListener('mousemove', (event) => {
//   // calculate mouse position in normalized device coordinates (-1 to +1)
//   const mouse = new THREE.Vector2(
//     (event.clientX / sizes.width) * 2 - 1,
//     -(event.clientY / sizes.height) * 2 + 1
//   );

//   // calculate the intersection point between the mouse and the plane where the eyes are located
//   const raycaster = new THREE.Raycaster();
//   raycaster.setFromCamera(mouse, camera);
//   const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
//   const intersectPoint = new THREE.Vector3();
//   raycaster.ray.intersectPlane(plane, intersectPoint);

//   // update the position of the eyes to the intersection point
//   eye1.position.copy(intersectPoint);
//   eye2.position.copy(intersectPoint);
// });


//Eyes following mouse
window.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX / window.innerWidth * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Rotate eye1
  eye1.rotation.y = mouseX * 0.5;
  eye1.rotation.x = -mouseY * 0.5;

  // Rotate eye2
  eye2.rotation.y = mouseX * 0.5;
  eye2.rotation.x = -mouseY * 0.5;
})


const title = document.querySelector('.title');

// title.addEventListener('click', () => {
//   gsap.to(eye1.rotation, { duration: 0.5, y: Math.PI * 0, x: Math.PI * 0.1, ease: 'power2.out' })
//   gsap.to(eye2.rotation, { duration: 0.5, y: Math.PI * 0, x: Math.PI * 0.1, ease: 'power2.out' })
//   gsap.to(eye1.rotation, { duration: 0.5, y: Math.PI * 0.1, x: Math.PI * 0, ease: 'power2.out' })
//   gsap.to(eye2.rotation, { duration: 0.5, y: Math.PI * 0.1, x: Math.PI * 0, ease: 'power2.out' })
//   gsap.to(eye1.rotation, { duration: 0.5, y: Math.PI * 0, x: Math.PI * -0.1, ease: 'power2.out' })
//   gsap.to(eye2.rotation, { duration: 0.5, y: Math.PI * 0, x: Math.PI * -0.1, ease: 'power2.out' })
//   gsap.to(eye1.rotation, { duration: 0.5, y: Math.PI * -0.1, x: Math.PI * 0, ease: 'power2.out' })
//   gsap.to(eye2.rotation, { duration: 0.5, y: Math.PI * -0.1, x: Math.PI * 0, ease: 'power2.out' })
// })

const eyeRotations = [  
  { x: -Math.PI / 4, y: 0 },  
  { x: 0, y: Math.PI / 4 },  
  { x: Math.PI / 4, y: 0 },  
  { x: 0, y: -Math.PI / 4 },
  { x: 0, y: 0 },
]

// Define a function to animate the eye rotation
function animateEyeRotation(index) {
  const rotation = eyeRotations[index]

  gsap.to(eye1.rotation, {
    duration: 0.2,
    x: rotation.x,
    y: rotation.y,
    ease: 'power2.out',
    onComplete: () => {
      // Call the next rotation after completing the current one
      const nextIndex = (index + 1) % eyeRotations.length;
      if (nextIndex === 0) {
        return;
      }

      animateEyeRotation(nextIndex);
    },
  });
}

const eyeRotations2 = [  
  { x: -Math.PI / 4, y: 0 },  
  { x: 0, y: -Math.PI / 4 },
  { x: Math.PI / 4, y: 0 },  
  { x: 0, y: Math.PI / 4 },  
  { x: 0, y: 0 },
]

function animateEyeRotation2(index) {
  const rotation = eyeRotations2[index]

  gsap.to(eye2.rotation, {
    duration: 0.2,
    x: rotation.x,
    y: rotation.y,
    ease: 'power2.out',
    onComplete: () => {
      // Call the next rotation after completing the current one
      const nextIndex = (index + 1) % eyeRotations2.length;
      if (nextIndex === 0) {
        return;
      }

      animateEyeRotation2(nextIndex);
    },
  });
}

// Call the animateEyeRotation function on click
title.addEventListener("click", () => {
  animateEyeRotation(0);
  animateEyeRotation2(0);
});