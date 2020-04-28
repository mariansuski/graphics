//OX, OY, OZ
const vectors = [
    //Floor
    [[-300, 750, -150], [300, 750, -150]],
    [[-300, 750, -150], [-300, 2500, -150]],
    [[-300, 2500, -150], [300, 2500, -150]],
    [[300, 2500, -150], [300, 750, -150]],

    //Left Block
    [[400, 1200, -150], [550, 1200, -150]],
    [[400, 1200, -150], [400, 2000, -150]],
    [[400, 2000, -150], [550, 2000, -150]],
    [[550, 2000, -150], [550, 1200, -150]],

    [[400, 1200, 400], [550, 1200, 400]],
    [[400, 1200, 400], [400, 2000, 400]],
    [[400, 2000, 400], [550, 2000, 400]],
    [[550, 2000, 400], [550, 1200, 400]],

    [[400, 1200, -150], [400, 1200, 400]],
    [[550, 1200, 400], [550, 1200, -150]],

    [[400, 2000, -150], [400, 2000, 400]],
    [[550, 2000, -150], [550, 2000, 400]],

    //Right first block
    [[-400, 800, -150], [-500, 800, -150]],
    [[-400, 800, -150], [-400, 1500, -150]],
    [[-400, 1500, -150], [-500, 1500, -150]],
    [[-500, 1500, -150], [-500, 800, -150]],

    [[-400, 800, 200], [-500, 800, 200]],
    [[-400, 800, 200], [-400, 1500, 200]],
    [[-400, 1500, 200], [-500, 1500, 200]],
    [[-500, 1500, 200], [-500, 800, 200]],

    [[-400, 800, -150], [-400, 800, 200]],
    [[-500, 800, 200], [-500, 800, -150]],

    [[-400, 1500, -150], [-400, 1500, 200]],
    [[-500, 1500, -150], [-500, 1500, 200]],

    //Right second block
    [[-350, 1650, -150], [-550, 1650, -150]],
    [[-350, 1650, -150], [-350, 2400, -150]],
    [[-350, 2400, -150], [-550, 2400, -150]],
    [[-550, 2400, -150], [-550, 1650, -150]],

    [[-350, 1650, 300], [-550, 1650, 300]],
    [[-350, 1650, 300], [-350, 2400, 300]],
    [[-350, 2400, 300], [-550, 2400, 300]],
    [[-550, 2400, 300], [-550, 1650, 300]],

    [[-350, 1650, -150], [-350, 1650, 300]],
    [[-550, 1650, 300], [-550, 1650, -150]],

    [[-350, 2400, -150], [-350, 2400, 300]],
    [[-550, 2400, -150], [-550, 2400, 300]],
];

let focal = 1;
const STEP_FOCAL_CHANGE = 0.1;
const STEP_TRANSLATION_CHANGE = 25;
const STEP_ROTATE_DEGREES = 1;
const COEFFICIENT_ROTATE = STEP_ROTATE_DEGREES * Math.PI / 180;

document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'KeyW':
            rotateUp();
            break;
        case 'KeyS':
            rotateDown();
            break;
        case 'KeyA':
            rotateLeft();
            break;
        case 'KeyD':
            rotateRight();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowUp':
            moveForward();
            break;
        case 'ArrowDown':
            moveBackwards();
            break;
        case 'NumpadAdd':
            zoomIn();
            break;
        case 'NumpadSubtract':
            zoomOut();
            break;
        case 'Numpad2':
            moveDown();
            break;
        case 'Numpad8':
            moveUp();
            break;
        case 'KeyQ':
            rotateZNoClockwise();
            break;
        case 'KeyE':
            rotateZClockwise();
            break;
    }
});

function zoomIn() {
    focal += STEP_FOCAL_CHANGE;
    drawImage();
}

function zoomOut() {
    focal -= STEP_FOCAL_CHANGE;
    drawImage();
}

function moveForward() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][1] -= STEP_TRANSLATION_CHANGE;
        vectors[i][1][1] -= STEP_TRANSLATION_CHANGE;
    }
    drawImage();
}

function moveBackwards() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][1] += STEP_TRANSLATION_CHANGE;
        vectors[i][1][1] += STEP_TRANSLATION_CHANGE;
    }
    drawImage();
}

function moveLeft() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][0] += STEP_TRANSLATION_CHANGE;
        vectors[i][1][0] += STEP_TRANSLATION_CHANGE;
    }
    drawImage();
}

function moveRight() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][0] -= STEP_TRANSLATION_CHANGE;
        vectors[i][1][0] -= STEP_TRANSLATION_CHANGE;
    }
    drawImage();
}

function moveUp() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][2] -= STEP_TRANSLATION_CHANGE;
        vectors[i][1][2] -= STEP_TRANSLATION_CHANGE;
    }
    drawImage();
}

function moveDown() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][2] += STEP_TRANSLATION_CHANGE;
        vectors[i][1][2] += STEP_TRANSLATION_CHANGE;
    }
    drawImage();
}

function rotateUp() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][1] = vectors[i][0][1] * Math.cos((-1) * COEFFICIENT_ROTATE) - vectors[i][0][2] * Math.sin((-1) * COEFFICIENT_ROTATE);
        vectors[i][0][2] = vectors[i][0][2] * Math.cos((-1) * COEFFICIENT_ROTATE) + vectors[i][0][1] * Math.sin((-1) * COEFFICIENT_ROTATE);

        vectors[i][1][1] = vectors[i][1][1] * Math.cos((-1) * COEFFICIENT_ROTATE) - vectors[i][1][2] * Math.sin((-1) * COEFFICIENT_ROTATE);
        vectors[i][1][2] = vectors[i][1][2] * Math.cos((-1) * COEFFICIENT_ROTATE) + vectors[i][1][1] * Math.sin((-1) * COEFFICIENT_ROTATE);
    }
    drawImage();
}

function rotateDown() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][1] = vectors[i][0][1] * Math.cos(COEFFICIENT_ROTATE) - vectors[i][0][2] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][0][2] = vectors[i][0][2] * Math.cos(COEFFICIENT_ROTATE) + vectors[i][0][1] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][1][1] = vectors[i][1][1] * Math.cos(COEFFICIENT_ROTATE) - vectors[i][1][2] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][1][2] = vectors[i][1][2] * Math.cos(COEFFICIENT_ROTATE) + vectors[i][1][1] * Math.sin(COEFFICIENT_ROTATE);
    }
    drawImage();
}

function rotateRight() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][0] = vectors[i][0][0] * Math.cos(COEFFICIENT_ROTATE) - vectors[i][0][1] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][0][1] = vectors[i][0][1] * Math.cos(COEFFICIENT_ROTATE) + vectors[i][0][0] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][1][0] = vectors[i][1][0] * Math.cos(COEFFICIENT_ROTATE) - vectors[i][1][1] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][1][1] = vectors[i][1][1] * Math.cos(COEFFICIENT_ROTATE) + vectors[i][1][0] * Math.sin(COEFFICIENT_ROTATE);
    }
    drawImage();
}

function rotateLeft() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][0] = vectors[i][0][0] * Math.cos((-1) * COEFFICIENT_ROTATE) - vectors[i][0][1] * Math.sin((-1) * COEFFICIENT_ROTATE);
        vectors[i][0][1] = vectors[i][0][1] * Math.cos((-1) * COEFFICIENT_ROTATE) + vectors[i][0][0] * Math.sin((-1) * COEFFICIENT_ROTATE);
        vectors[i][1][0] = vectors[i][1][0] * Math.cos((-1) * COEFFICIENT_ROTATE) - vectors[i][1][1] * Math.sin((-1) * COEFFICIENT_ROTATE);
        vectors[i][1][1] = vectors[i][1][1] * Math.cos((-1) * COEFFICIENT_ROTATE) + vectors[i][1][0] * Math.sin((-1) * COEFFICIENT_ROTATE);
    }
    drawImage();
}

function rotateZNoClockwise() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][0] = vectors[i][0][0] * Math.cos((-1) * COEFFICIENT_ROTATE) + vectors[i][0][2] * Math.sin((-1) * COEFFICIENT_ROTATE);
        vectors[i][0][2] = (-1) * vectors[i][0][0] * Math.sin((-1) * COEFFICIENT_ROTATE) + vectors[i][0][2] * Math.cos((-1) * COEFFICIENT_ROTATE);
        vectors[i][1][0] = vectors[i][1][0] * Math.cos((-1) * COEFFICIENT_ROTATE) + vectors[i][1][2] * Math.sin((-1) * COEFFICIENT_ROTATE);
        vectors[i][1][2] = (-1) * vectors[i][1][0] * Math.sin((-1) * COEFFICIENT_ROTATE) + vectors[i][1][2] * Math.cos((-1) * COEFFICIENT_ROTATE);
    }
    drawImage();
}

function rotateZClockwise() {
    for (let i =0; i < vectors.length; i++){
        vectors[i][0][0] = vectors[i][0][0] * Math.cos(COEFFICIENT_ROTATE) + vectors[i][0][2] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][0][2] = (-1) * vectors[i][0][0] * Math.sin(COEFFICIENT_ROTATE) + vectors[i][0][2] * Math.cos(COEFFICIENT_ROTATE);
        vectors[i][1][0] = vectors[i][1][0] * Math.cos(COEFFICIENT_ROTATE) + vectors[i][1][2] * Math.sin(COEFFICIENT_ROTATE);
        vectors[i][1][2] = (-1) * vectors[i][1][0] * Math.sin(COEFFICIENT_ROTATE) + vectors[i][1][2] * Math.cos(COEFFICIENT_ROTATE);
    }
    drawImage();
}

function isVisible(point) {
    return point[0][1] >= focal && point[1][1] >= focal;
}

function castVectorsTo2DPlain() {
    return vectors.map( (vector) => {
        if (isVisible(vector))
            return [cast3DPointTo2DPoint(vector[0]), cast3DPointTo2DPoint(vector[1])];
        else
            return [[0,0],[0,0]];
    });
}

function cast3DPointTo2DPoint(point) {
    let ratio = focal / point[1] * 1000;
    let x = (ratio * point[0] + 1300 / 2);
    let z = (1000 / 2 - ratio * point[2]);
    return [x, z];
}

function drawImage() {
    let canvas = document.getElementById('cameraCanvas');
    let context = canvas.getContext('2d');
    let vectors2D = castVectorsTo2DPlain();
    context.clearRect(0, 0, canvas.width, canvas.height);
    vectors2D.map( (vector) => {
        context.beginPath();
        context.moveTo(vector[0][0], vector[0][1]);
        context.lineTo(vector[1][0], vector[1][1]);
        context.stroke();
    });
}

drawImage();
