function main() {
    alert('Petunjuk :\nPilih 2 objek dengan warna yang sama!');

    let scene, camera, renderer, controls, rayCast;
    
    let randomInRange = function(from, to) {
        let x = Math.random() * (to - from);
        return x + from;
    };
    
    let createCube = function() {
        let geometry = new THREE.BoxGeometry(3, 3, 3);

        // warna box
        const colorList = [
            0xf044ff,
            0x449aff,
            0x47ff44,
            0xff4444,
            0xfbff44
        ];
        let color = colorList[Math.floor(randomInRange(0, 5))];
        let emissive = color + 0.05;
        
        let material = new THREE.MeshLambertMaterial({color: color, emissive: emissive});
        let cube = new THREE.Mesh( geometry, material );
        
        // posisi box
        cube.position.x = randomInRange(-20, 20);
        cube.position.y = randomInRange(-20, 20);
        cube.position.z = randomInRange(-20, 20);

        // box dimasukkan ke scene
        scene.add(cube);
    };

    let scoreCorrect = 10;
    let scoreWrong = -10;
    let currentScore = 0;
    let highScore = 0;
    let elementScore = document.getElementById("score");
    let elementHighScore = document.getElementById("highscore");

    let selectedObject = []; // nyimpan objek yang dipilih
    let originalColors = []; // nyimpan warna asli
    
    let onMouseClick = function(e) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
        mouse.z = 1;

        rayCast.setFromCamera(mouse, camera);

        let intersects = rayCast.intersectObjects(scene.children, false);

        if(intersects.length == 0){
            // jika objek tidak berhasil diambil
            return;
        } else {   
            selectedObject.push(intersects);
            originalColors.push(intersects[0].object.material.color.getHex());
    
            console.log(intersects);
            console.log(originalColors);
            console.log(selectedObject);
            
            // objek yang dipilih lebih dari satu
            if(selectedObject.length > 1 ) {
                // cek sama atau tidak
                if(selectedObject[0][0].object.uuid === selectedObject[1][0].object.uuid){
                    console.log("objeknya sama");
                    selectedObject[0][0].object.material.emissive.setHex(originalColors[0]);
                    selectedObject[0][0].object.rotation.z = 0;
                } else if(originalColors[0] == (originalColors[1])) {
                    console.log("warnanya sama");

                    selectedObject.forEach(object => {
                        object[0].object.geometry.dispose();
                        object[0].object.material.dispose();
                        scene.remove(object[0].object);
                        renderer.renderLists.dispose();
                    });
    
                    currentScore += scoreCorrect;
                    console.log(currentScore);
                    elementScore.innerHTML = currentScore;
    
                }
                else {
                    console.log("warnanya beda");
                    selectedObject[0][0].object.material.emissive.setHex(originalColors[0]);
                    selectedObject[0][0].object.rotation.z = 0;

                    currentScore += scoreWrong;
                    console.log(currentScore);
                    elementScore.innerHTML = currentScore;
                }
    
                selectedObject = [];
                originalColors = [];
            } else if (selectedObject.length > 2) {
                // kalau objek yang dipilih lebih dari dua (kalau ada salah salah)
                selectedObject = [];
                originalColors = [];
                return;
            }
        } 
    };

    // generate box baru
    let speed = 3000;
    const baseSpeed = 3000;

    let generateCube = function() {
        if(scene.children.length >= 40){
            speed = baseSpeed;
            
            if (currentScore > highScore) {
                highScore = currentScore;
                elementHighScore.innerHTML = highScore;
            }

            currentScore = 0;
            elementScore.innerHTML = currentScore;

            // elementHighScore.innerHTML = currentScore;
            // currentScore = 0;
        }
        else{
            speed -= 200;
            createCube();

            console.log(`kecepatan: ${speed}, banyak box: ${scene.children.length}`);
        }

        setTimeout(generateCube, speed);
    }
    
    // set up the environment - 
    // initiallize scene, camera, objects and renderer
    let init = function() {
        // create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffee);
        
        // create an locate the camera
        camera = new THREE.PerspectiveCamera(70, 
                        window.innerWidth / window.innerHeight, 
                        1, 1000);
        camera.position.z = 50;

        // mengatur pencahayaan dari atas dan bawah
        var light = new THREE.DirectionalLight(0xffffff);
        var light2 = new THREE.DirectionalLight(0xffffff);
        scene.add(light);
        scene.add(light2);
        light.position.set(0, 15, 0);
        light2.position.set(0, -15, 0);
				
        // membuat dan memasukkan box ke dalam scene
        for(let i = 1; i <= 20; i++)
            createCube();

        // tambah box baru
        generateCube();
        
        // create the renderer   
        renderer = new THREE.WebGLRenderer();   
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(renderer.domElement);
        document.addEventListener("click", onMouseClick, false);  
        
        // control
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        
        // inisialisasi raycaster
        rayCast = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        mouse.x = mouse.y = -1;
    };
   
    const clock = new THREE.Clock();

    let mainLoop = function() {
        const elapsedTime = clock.getElapsedTime();

        if (selectedObject.length == 1) {
            selectedObject[0][0].object.material.emissive.setHex(elapsedTime % 0.5 >= 0.25 ? originalColors[0] : (originalColors[0] * 3));
            selectedObject[0][0].object.rotation.z += 0.1;
        }
        
        renderer.render(scene, camera);
        controls.update();        
        window.requestAnimationFrame(mainLoop);
    };

    init();
    mainLoop();
}