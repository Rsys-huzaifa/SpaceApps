const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Block settings
const blockSize = 40;
const blocks = [];

// Block types (colors)
const blockTypes = {
    grass: '#228B22',
    dirt: '#8B4513',
    stone: '#A9A9A9'
};

// Current block type
let currentBlock = blockTypes.grass;

// Function to draw blocks
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let block of blocks) {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
    }
}

// Function to place a block
function placeBlock(x, y) {
    const block = {
        x: Math.floor(x / blockSize) * blockSize,
        y: Math.floor(y / blockSize) * blockSize,
        color: currentBlock
    };
    blocks.push(block);
    drawBlocks();
}

// Function to handle mouse clicks
canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    placeBlock(x, y);
});

// Function to change current block type
document.addEventListener('keydown', (event) => {
    if (event.key === 'g') {
        currentBlock = blockTypes.grass;
    } else if (event.key === 'd') {
        currentBlock = blockTypes.dirt;
    } else if (event.key === 's') {
        currentBlock = blockTypes.stone;
    }
});

// Initialize the game
drawBlocks();
