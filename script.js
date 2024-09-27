// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('orrery-container').appendChild(renderer.domElement);

// Function to add celestial bodies
function addCelestialBody(size, color, distance, orbitSpeed) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const planet = new THREE.Mesh(geometry, material);
    
    planet.position.x = distance; // Set initial position
    planet.orbitSpeed = orbitSpeed; // Set orbit speed
    scene.add(planet);
    
    return planet;
}

// Adding celestial bodies
const sun = addCelestialBody(2, 0xffff00, 0, 0); // Sun
const earth = addCelestialBody(0.5, 0x0000ff, 5, 0.02); // Earth
const mars = addCelestialBody(0.4, 0xff0000, 7, 0.015); // Mars

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate planets around the sun
    earth.position.x = 5 * Math.cos(earth.orbitSpeed * Date.now() * 0.001);
    earth.position.z = 5 * Math.sin(earth.orbitSpeed * Date.now() * 0.001);
    
    mars.position.x = 7 * Math.cos(mars.orbitSpeed * Date.now() * 0.001);
    mars.position.z = 7 * Math.sin(mars.orbitSpeed * Date.now() * 0.001);

    renderer.render(scene, camera);
}

animate();

// Adjust camera position
camera.position.z = 10;
