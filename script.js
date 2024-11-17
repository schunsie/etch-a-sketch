// Etch-a-sketch grid
const grid = document.querySelector('#grid'); 

let gridSize = 16;
createGrid()

function createGrid() {
    let blockSize = calcSize(gridSize, grid.clientWidth);
    
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
    let pixels = gridWidth / gridSize;
    return `${pixels}px`;
}

// Drawing with mouse
let mouseDown = false;
document.onmousedown = () => mouseDown = true;
document.onmouseup = () => mouseDown = false;

grid.addEventListener('mouseover', (e) => {
    target = e.target;

    // prevents triggering event on border of container (grid)
    if (!target.classList.contains('grid-block')) return;
    
    let isBlank = !target.getAttribute('style').includes('background-color');
    if (isBlank) {
        target.style.backgroundColor = `${getPaintColor()}`;
        if (mouseDown) target.style.opacity = 1;
        else target.style.opacity = 0.1;
    }
    else increaseOpacity(target);
});

function increaseOpacity(target) {
    let opacity = Number(target.style.opacity);
    if (opacity < 1) target.style.opacity = opacity + 0.1;
}


// Options menu

// color slider
const colorSwitch = document.querySelector('#color-switch');
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
const confirmBtn = document.querySelector('#confirm-size');
let newGridSize = gridSize;

gridSlider.addEventListener('input', () => {
    newGridSize = gridSlider.value;
    sizeLabel.textContent = `${newGridSize}x${newGridSize}`;
});

confirmBtn.addEventListener('click', () => {
    if (newGridSize == gridSize) return;

    gridSize = newGridSize;
    clearGrid();
    createGrid();
});

function clearGrid() {
    // Check if grid is filled
    if (document.querySelector('.grid-block')) {
        grid.innerHTML = '';
    }
}

// reset button
const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', () => {
    clearGrid();
    createGrid();
});