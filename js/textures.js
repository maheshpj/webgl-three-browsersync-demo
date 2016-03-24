function initTexture() {

    var texture = THREE.ImageUtils.loadTexture(
        //'textures/Pearson_logo.png'
        'textures/colorful-checks.jpg'
    );

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(1, 1);
    texture.anisotropy = renderer.getMaxAnisotropy();

    materialBox = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture,
        wireframe: false
    });

    materialKnot = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture,
        wireframe: true
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
