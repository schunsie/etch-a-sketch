// Etch-a-sketch grid
const grid = document.querySelector('#grid'); 

let gap = 2;
let gridSize = 16;
let blockSize = calcSize(gridSize, grid.clientWidth);
createGrid()

function createGrid() {
    for (let i = 1; i <= gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        grid.appendChild(row);
        
        for (let j = 1; j <= gridSize; j++) {
            const gridBlock = document.createElement('div');
            gridBlock.classList.add('grid-block');
            gridBlock.setAttribute('style', `width: ${blockSize}; height: ${blockSize};`);
            
            row.appendChild(gridBlock);
        }
    }
}

function calcSize(gridSize, gridWidth) {
    // All sizes in pixels
    let pixels = (gridWidth - gap * (gridSize-1)) / gridSize;
    return `${pixels}px`;
}

grid.addEventListener('mouseover', (e) => {
    target = e.target;

    if (target.classList.contains('grid-block')) {
        target.style.backgroundColor = `${getPaintColor()}`;
    }
});


// Options menu

// color slider
const colorSwitch = document.querySelector('#color-switch')
let paintColor = 'black';
let rainbowMode = false; 

colorSwitch.addEventListener('click', () => {
    if (colorSwitch.checked) rainbowMode = true;
    else rainbowMode = false;
});

function getPaintColor() {
    if (rainbowMode) {
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        return `rgb(${r},${g},${b})`;
    }
    else return 'black';
}

// Grid size slider
const gridSlider = document.querySelector('#grid-slider');
const sizeLabel = document.querySelector('#size');

gridSlider.addEventListener('input', () => {
    let size = gridSlider.value;
    sizeLabel.textContent = `${size}x${size}`;
});