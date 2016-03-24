var scene, camera, renderer;
var geometry, material, mesh;
var effect, controls;
var element, container;

var clock = new THREE.Clock();

init();
animate();

function init() {

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;

    geometry = new THREE.BoxGeometry(200, 200, 200);

    //loadtexture();
    initTexture();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    element = renderer.domElement;

    initEffects();
    initControls();

    var light = new THREE.HemisphereLight(0x777777, 0xffffff, 1);
    scene.add(light);

    container = document.getElementById('test');
    container.appendChild(element);

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);
}

function initTexture() {

    var texture = THREE.ImageUtils.loadTexture(
        //'textures/Pearson_logo.png'
        'textures/colorful-checks.jpg'
    );

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(1, 1);
    texture.anisotropy = renderer.getMaxAnisotropy();

    material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture,
        wireframe: false
    });

}

function loadtexture() {
    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // load a resource
    loader.load(
        // resource URL
        'textures/patterns/checker.png',
        // Function when resource is loaded
        function(texture) {
            // do something with the texture
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat = new THREE.Vector2(50, 50);
            texture.anisotropy = renderer.getMaxAnisotropy();

            material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.FlatShading,
                map: texture,
                wireframe: false
            });
        },
        // Function called when download progresses
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function(xhr) {
            console.log('An error happened');
        }
    );
}

function initEffects() {
    //effect = new THREE.StereoEffect(renderer);
    //effect = new THREE.OculusRiftEffect(renderer, {worldScale: 100, scale: 0.5});
    //effect = new THREE.AnaglyphEffect(renderer);
    effect = new THREE.CardboardEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);
}

function initControls() {
    controls = new THREE.OrbitControls(camera, element);
    controls.rotateUp = Math.PI / 4;
    /*
    controls.target.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
    ); 
    */
    controls.enableZoom = true;
    controls.enablePan = true;

    function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    update(clock.getDelta());
    render(clock.getDelta());
}

function resize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    effect.setSize(width, height);
}

function update(dt) {
    resize();

    camera.updateProjectionMatrix();

    controls.update(dt);
}

function render(dt) {
    effect.render(scene, camera);
}

function fullscreen() {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
}
