const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game settings
const blockSize = 40;
const worldWidth = Math.floor(canvas.width / blockSize);
const worldHeight = Math.floor(canvas.height / blockSize);
const blocks = [];

// Block types (colors)
const blockTypes = {
    grass: '#228B22',
    dirt: '#8B4513',
    stone: '#A9A9A9',
};

// Function to generate a simple terrain
function generateWorld() {
    for (let x = 0; x < worldWidth; x++) {
        for (let y = 0; y < worldHeight; y++) {
            if (y > worldHeight / 2) {
                blocks.push({ x, y, color: blockTypes.dirt });
            } else if (y > worldHeight / 3) {
                blocks.push({ x, y, color: blockTypes.grass });
            } else {
                blocks.push({ x, y, color: blockTypes.stone });
            }
        }
    }
}

// Function to draw blocks
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let block of blocks) {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
    }
}

// Function to place a block
function placeBlock(x, y) {
    const block = {
        x: Math.floor(x / blockSize),
        y: Math.floor(y / blockSize),
        color: blockTypes.grass // Default block type to place
    };
    blocks.push(block);
    drawBlocks();
}

// Handle mouse clicks for placing blocks
canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    placeBlock(x, y);
});

// Player object
const player = {
    x: Math.floor(worldWidth / 2) * blockSize,
    y: Math.floor(worldHeight / 2) * blockSize,
    size: blockSize,
};

// Function to draw player
function drawPlayer() {
    ctx.fillStyle = '#FFD700'; // Gold color
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Handle keyboard input for player movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        player.y -= blockSize;
    } else if (event.key === 'ArrowDown') {
        player.y += blockSize;
    } else if (event.key === 'ArrowLeft') {
        player.x -= blockSize;
    } else if (event.key === 'ArrowRight') {
        player.x += blockSize;
    }
    drawBlocks();
    drawPlayer();
});

// Initialize the game
generateWorld();
drawBlocks();
drawPlayer();
