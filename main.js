function main() {
    var canvas = document.getElementById('myCanvas');
    var gl = canvas.getContext('webgl');

    // Depan Atas
    const topFront = {
        color_point_1: [0.45, 0.2, 1.0], // Warna atas
        color_point_2: [0.72, 0.52, 1.0], // Warna depan
        color_point_3: [1.0, 1.0, 1.0], // Warna teks
        
        // Koordinat
        // Kotak kardus
        point_a: [-0.720, 0.000],
        point_b: [-0.330, 0.000],
        point_e: [-0.800, 0.600],
        point_f: [-0.250, 0.600],
        point_g: [-0.300, 0.850],
        point_h: [-0.750, 0.850],

        // Teks atas
        point_i: [-0.550, 0.700],
        point_j: [-0.500, 0.700],
        point_k: [-0.500, 0.750],
        point_l: [-0.550, 0.750],

        // Teks depan
        point_m: [-0.720, 0.400],
        point_n: [-0.400, 0.400],
        point_o: [-0.380, 0.550],
        point_p: [-0.740, 0.550],
    };


    const topRight = {
        color_point_1: [0.45, 0.2, 1.0], // Warna atas
        color_point_2: [0.72, 0.52, 1.0], // Warna depan
        color_point_3: [1.0, 1.0, 1.0], // Warna teks

        // Koordinat
        // Kotak kardus
        point_b: [0.450, 0.000],
        point_c: [0.670, 0.000],
        point_e: [0.450, 0.750],
        point_f: [0.400, 0.600],
        point_g: [0.720, 0.600],
        point_h: [0.670, 0.750],

        // Teks depan
        point_m: [0.550, 0.400],
        point_n: [0.600, 0.400],
        point_o: [0.600, 0.550],
        point_p: [0.550, 0.550],
    };

    const vertices = [
        // topFront Object
        // Atas
        // Segitiga FGE
        ...topFront.point_f, ...topFront.color_point_1,
        ...topFront.point_g, ...topFront.color_point_1,
        ...topFront.point_e, ...topFront.color_point_1,

        // Segitiga HGE
        ...topFront.point_h, ...topFront.color_point_1,
        ...topFront.point_g, ...topFront.color_point_1,
        ...topFront.point_e, ...topFront.color_point_1,

        // Depan
        // Segitiga FEB
        ...topFront.point_f, ...topFront.color_point_2,
        ...topFront.point_e, ...topFront.color_point_2,
        ...topFront.point_b, ...topFront.color_point_2,

        // Segitiga EBA
        ...topFront.point_e, ...topFront.color_point_2,
        ...topFront.point_b, ...topFront.color_point_2,
        ...topFront.point_a, ...topFront.color_point_2,

        // Teks
        // Segitiga IJK
        ...topFront.point_i, ...topFront.color_point_3,
        ...topFront.point_j, ...topFront.color_point_3,
        ...topFront.point_k, ...topFront.color_point_3,

        // Segitiga IKL
        ...topFront.point_i, ...topFront.color_point_3,
        ...topFront.point_k, ...topFront.color_point_3,
        ...topFront.point_l, ...topFront.color_point_3,

        // Segitiga MON
        ...topFront.point_m, ...topFront.color_point_3,
        ...topFront.point_o, ...topFront.color_point_3,
        ...topFront.point_n, ...topFront.color_point_3,

        // Segitiga MOP
        ...topFront.point_m, ...topFront.color_point_3,
        ...topFront.point_o, ...topFront.color_point_3,
        ...topFront.point_p, ...topFront.color_point_3,

        // topRight Object
        // Atas
        // Segitiga FEB
        ...topRight.point_f, ...topRight.color_point_1,
        ...topRight.point_e, ...topRight.color_point_1,
        ...topRight.point_g, ...topRight.color_point_1,

        // Segitiga HEG
        ...topRight.point_h, ...topRight.color_point_1,
        ...topRight.point_e, ...topRight.color_point_1,
        ...topRight.point_g, ...topRight.color_point_1,

        // Kanan
        // Segitiga FGB
        ...topRight.point_f, ...topRight.color_point_2,
        ...topRight.point_g, ...topRight.color_point_2,
        ...topRight.point_b, ...topRight.color_point_2,

        // Segitiga BCG
        ...topRight.point_b, ...topRight.color_point_2,
        ...topRight.point_c, ...topRight.color_point_2,
        ...topRight.point_g, ...topRight.color_point_2,

        // Teks
        // Segitiga MON
        ...topRight.point_m, ...topRight.color_point_3,
        ...topRight.point_o, ...topRight.color_point_3,
        ...topRight.point_n, ...topRight.color_point_3,

        // Segitiga MOP
        ...topRight.point_m, ...topRight.color_point_3,
        ...topRight.point_o, ...topRight.color_point_3,
        ...topRight.point_p, ...topRight.color_point_3,
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);


    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);


    var shaderProgram = gl.createProgram();


    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);


    gl.linkProgram(shaderProgram);


    gl.useProgram(shaderProgram);


    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    // Kecepatan animasi
    var speed = 0.0034;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    console.log(vertices.length);
        
    function moveVertices() {
        if (vertices[176] < -0.4 || vertices[126] > 1.0) {
            speed = speed * -1;
        }

        for (let i = 121; i < vertices.length; i += 5) {
            vertices[i] = vertices[i] + speed;
        }
    }

    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 36;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render)
}