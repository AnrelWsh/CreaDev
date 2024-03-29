import * as THREE from "three"
import gsap from "gsap"
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import * as CANNON from "cannon-es"

//Creating Scene
const scene = new THREE.Scene()

//Creating Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

//Lights
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
scene.add(directionalLight)
directionalLight.position.set(0, 50, 0)

//Rendering
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Background color
renderer.setClearColor(0xcecece);

//Setting up camera and controls
const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(0, 10, 10)
orbit.update()

//Init gravity and objects movements
const world = new CANNON.World({ 
  gravity: new CANNON.Vec3(0, -10, 0) 
})

//Creating the plane
const planeGeo = new THREE.PlaneGeometry(10, 10)
const planeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
})
const planeMesh = new THREE.Mesh(planeGeo, planeMat)
scene.add(planeMesh)

//Creating plane physics
const planePhysMat = new CANNON.Material()
const planeBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3(5, 5, 0.01)),
  material: planePhysMat
})
planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
world.addBody(planeBody)

//Adding a ball to the scene
const mouse = new THREE.Vector2()
const intersectionPoint = new THREE.Vector3()
const planeNormal = new THREE.Vector3()
const plane = new THREE.Plane()
const raycaster = new THREE.Raycaster()

//Detecting where the mouse is
window.addEventListener("mousemove", function (e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  planeNormal.copy(camera.position).normalize()
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position)
  raycaster.setFromCamera(mouse, camera)
  raycaster.ray.intersectPlane(plane, intersectionPoint)
})

const meshes = []
const bodies = []

//Creating the ball on click where the mouse is
window.addEventListener("click", function (e) {
  const sphereGeo = new THREE.SphereGeometry(0.125, 30, 30)
  const sphereMat = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
    metalness: 0,
    roughness: 0
  });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphereMesh);
  sphereMesh.castShadow = true;

  //Creating physics to the ball
  const spherePhysMat = new CANNON.Material();
  const sphereBody = new CANNON.Body({
    mass: 0.3,
    shape: new CANNON.Sphere(0.125),
    position: new CANNON.Vec3(
      intersectionPoint.x,
      intersectionPoint.y,
      intersectionPoint.z
    ),
    material: spherePhysMat
  });
  world.addBody(sphereBody);

  const planeSphereContactMat = new CANNON.ContactMaterial(
    planePhysMat,
    spherePhysMat,
    { restitution: 0.3 }
  );

  world.addContactMaterial(planeSphereContactMat);

  meshes.push(sphereMesh);
  bodies.push(sphereBody);
});

// Create BoxGeometry instead of SphereGeometry
// window.addEventListener("click", function (e) {
//   const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5); 
//   const boxMat = new THREE.MeshStandardMaterial({
//     color: Math.random() * 0xffffff,
//     metalness: 0,
//     roughness: 0
//   });
//   const boxMesh = new THREE.Mesh(boxGeo, boxMat);
//   scene.add(boxMesh);
//   boxMesh.castShadow = true;

//   //Creating physics to the box
//   const boxPhysMat = new CANNON.Material();
//   const boxBody = new CANNON.Body({
//     mass: 0.3,
//     shape: new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25)),
//     position: new CANNON.Vec3(
//       intersectionPoint.x,
//       intersectionPoint.y,
//       intersectionPoint.z
//     ),
//     material: boxPhysMat
//   });
//   world.addBody(boxBody);

//   const planeBoxContactMat = new CANNON.ContactMaterial(
//     planePhysMat,
//     boxPhysMat,
//     { restitution: 0.3 }
//   );

//   world.addContactMaterial(planeBoxContactMat);

//   meshes.push(boxMesh);
//   bodies.push(boxBody);
// });

//Updating scene rotation and position
const timestep = 1 / 60;

function animate() {
  world.step(timestep);

  planeMesh.position.copy(planeBody.position);
  planeMesh.quaternion.copy(planeBody.quaternion);

  for (let i = 0; i < meshes.length; i++) {
    meshes[i].position.copy(bodies[i].position);
    meshes[i].quaternion.copy(bodies[i].quaternion);
  }

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

//Updating page resizing
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
