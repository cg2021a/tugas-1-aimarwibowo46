function main() {

    let scene, light, camera, renderer;
    let sphere, plane, cube, torus, octa, cylinder, cone, tknot, tetra, icosa; // shapes
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    var pindah = 0.01, pindah2 = 0.01, pindah3 = 0.01;


    let createSphere = function () {
        let geometry = new THREE.SphereGeometry(1.54, 10, 10);
        const material = new THREE.MeshStandardMaterial({
            color: 0xda70d6,
            metalness: 0.6,
            flatShading: true,
            clearcoat: 0.5
        });
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.z = 2;
        sphere.position.y = -2;
        scene.add(sphere);

    }

    let createCube = function () {
        let geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshNormalMaterial({
            wireframe: true,
        });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.z = 2;
        cube.position.x = 8;
        cube.position.y = -2;

    }

    let createTorus = function () {
        let geometry = new THREE.TorusGeometry(1.54, 0.5, 8, 6);
        const material = new THREE.MeshPhongMaterial({
            color: 0x407294,
            flatShading: false,
            shininess: 150
        });
        torus = new THREE.Mesh(geometry, material);
        scene.add(torus);
        torus.position.z = 3;
        torus.position.x = -8;
        torus.position.y = -2;

    }


    let createOctahedron = function () {
        let geometry = new THREE.OctahedronGeometry(1.57);
        const material = new THREE.MeshNormalMaterial({
            color: 0xccff66,    // red (can also use a CSS color string here)
            flatShading: false,
        });
        octa = new THREE.Mesh(geometry, material);
        scene.add(octa);
        octa.position.z = 3;
        octa.position.x = -8;
        octa.position.y = 5;

    }

    let createCylinder = function () {

        const geometry = new THREE.CylinderGeometry(
            1.54, 1.54, 2, 50);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff00ff,    // red (can also use a CSS color string here)
            flatShading: false,
            shininess: 150
        });
        cylinder = new THREE.Mesh(geometry, material);
        scene.add(cylinder);

        cylinder.position.z = 3;
        cylinder.position.x = 8;
        cylinder.position.y = 5;

    }

    let createCone = function () {
        let geometry = new THREE.ConeGeometry(1.54, 4, 7)
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x0000ff,
            flatShading: true,
            metalness: 0.2,
            reflectivity: 1,
            clearcoat: 0.3,
            clearcoatRoughness: 0.25,
            tranmission: 1
        });
        cone = new THREE.Mesh(geometry, material);
        scene.add(cone);
        cone.position.z = 3;
        cone.position.y = 7;
        cone.rotation.y = Math.PI / 2;

    }

    let createtknot = function () {
        const radius = 1.54;
        const tubeRadius = 0.6;
        const radialSegments = 8;
        const tubularSegments = 100;
        const p = 2;
        const q = 3;

        const geometry = new THREE.TorusKnotGeometry(
            radius, tubeRadius, tubularSegments, radialSegments, p, q);
        const material = new THREE.MeshStandardMaterial({
            color: 0x89CFF0,
            roughness: 0.3,
            metalness: 0.2
        });
        tknot = new THREE.Mesh(geometry, material);
        tknot.position.z = 4;
        tknot.position.y = -8;
        scene.add(tknot);


    }

    let createTetra = function () {
        const radius = 1.5;
        const detail = 2;
        const geometry = new THREE.TetrahedronGeometry(radius, detail);

        const fiveTone = new THREE.TextureLoader().load('../images/fiveTone.jpg');
        const material = new THREE.MeshToonMaterial({
            color: 0x65b0bb,    // red (can also use a CSS color string here)
            flatShading: true,
            gradientMap: fiveTone,
        });
        tetra = new THREE.Mesh(geometry, material);
        tetra.position.z = 2;
        tetra.position.y = -8;
        tetra.position.x = -8;
        scene.add(tetra);

    }


    let createIcosa = function () {
        const radius = 1.54;

        const geometry = new THREE.IcosahedronGeometry(radius);
        const material = new THREE.MeshBasicMaterial({
            color: 0xFF0000,
            wireframe: true
        });
        icosa = new THREE.Mesh(geometry, material);
        icosa.position.z = 2;
        icosa.position.y = -8;
        icosa.position.x = 8;
        scene.add(icosa);

    }


    let createPlane = function () {

        const planeSize = 40;
        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        let geometry = new THREE.BoxGeometry(30, 30);
        let material = new THREE.MeshPhongMaterial({
            map: texture

        });

        plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
    }

    let getLights = function () {
        let ambient = new THREE.AmbientLight(0xffffff, 0.7);
        let directional = new THREE.DirectionalLight(0xffffff, 1);
        let hemipshere = new THREE.HemisphereLight(0xffffff, 0x0095DD, 1);
        let point = new THREE.PointLight(0xffffff, 1, 100);
        let point2 = new THREE.PointLight(0xffffff, 1, 100);
        let spotlight = new THREE.SpotLight(0xffffff, 1, 75);
        let none = new THREE.AmbientLight(0xffffff, 0);

        ambient.position.set(20, 20, 20);
        directional.position.set(-10, 25, 25).normalize();
        hemipshere.position.set(10, 20, 30);
        point.position.set(10, 10, 10);
        point2.position.set(0, 8, 0);
        spotlight.position.set(30, 30, 30);

        const lights = [ambient, directional, hemipshere, point, spotlight, none];

        lights.forEach((obj) => scene.add(obj));

        lights.forEach((light) => {
            light.visible = false;
        });

        lights[0].visible = true;

        const getlight = document.getElementById('light');
        getlight.addEventListener('change', (x) => {
            const selected = x.target.value;

            lights.forEach((light) => {
                light.visible = false;
            });
            lights[selected].visible = true;
        });


    };


    let getLights2 = function () {
        let ambient = new THREE.AmbientLight(0xffffff, 0.7);
        let directional = new THREE.DirectionalLight(0xffffff, 1);
        let hemipshere = new THREE.HemisphereLight(0xffffff, 0x0095DD, 1);
        let point = new THREE.PointLight(0xffffff, 1, 100);
        let spotlight = new THREE.SpotLight(0xffffff, 1, 75);
        let none = new THREE.AmbientLight(0xffffff, 0);

        ambient.position.set(20, 20, 20);
        directional.position.set(-10, 25, 25).normalize();
        hemipshere.position.set(10, 20, 30);
        point.position.set(0,8,0);
        spotlight.position.set(30, 30, 30);


        const lights_2 = [point, ambient, directional, hemipshere, spotlight, none];

        lights_2.forEach((obj) => scene.add(obj));

        lights_2.forEach((light2) => {
            light2.visible = false;
        });
        lights_2[0].visible = true;

        const getlight2 = document.getElementById('light_2');
        getlight2.addEventListener('change', (e) => {
            const selected = e.target.value;

            lights_2.forEach((light2) => {
                light2.visible = false;
            });
            lights_2[selected].visible = true;
        });
    };



    // initiallize scene, camera, objects and renderer
    let init = function () {
        // 1. create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.rotateX(-Math.PI * 0.25);
        scene.rotateY(Math.PI * 0.04)
        scene.rotateZ(Math.PI * 0.7)

        // 2. create an locate the camera     
        camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight,
            1, 1000);
        camera.position.x = 20;
        camera.position.y = -70;
        camera.position.z = 100;
        // camera.lookAt(new THREE.Vector3(0, 10, 10));;

        getLights();
        getLights2();



        // 3. create an locate the object on the scene           

        createPlane();
        createCube();
        createSphere();
        createTorus();
        createOctahedron();
        createCylinder();
        createCone();
        createtknot();
        createTetra();
        createIcosa();



        // 4. create the renderer     
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        renderer.render(scene, camera, controls);

    };


    // main animation loop - calls 50-60 in a second.
    let mainLoop = function () {
        sphere.rotation.x += -0.05;

        torus.rotation.x += -0.02;
        torus.rotation.y += -0.02;

        cone.rotation.x += -0.03;
        cone.rotation.z += -0.03;
        cone.rotation.y += -0.03;

        cylinder.rotation.z += -0.05;

        tknot.rotation.z += -0.05;
        tknot.rotation.y += -0.05;

        tetra.rotation.x += -0.05;
        tetra.rotation.y += -0.05;
        tetra.rotation.z += -0.05;

        cube.position.z += -pindah;
        if (cube.position.z > 0.01) pindah = -0.007;
        if (cube.position.z > 5.17) {
            pindah = 0;
            cube.rotation.x += 0.03;
            cube.rotation.y += -0.01;
            cube.rotation.z += -0.02;
        }

        octa.position.z += -pindah2;
        if (octa.position.z > 2) pindah2 = -0.007;
        if (octa.position.z > 4) {
            pindah2 = 0;
            octa.rotation.z += 0.06;
        };

        torus.position.z += -pindah3;
        if (torus.position.z > 0.01) pindah3 = -0.007;
        if (torus.position.z > 5) {
            pindah3 = 0;
        };

        icosa.rotation.x += -0.05;
        icosa.rotation.y += -0.05;


        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    };

    ///////////////////////////////////////////////
    init();
    mainLoop();
}