const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game settings
const blockSize = 40;
const blocks = [];
const trees = [];

// Tree types
const treeTypes = {
    oak: { color: '#8B4513', height: 60, info: 'Oaks are long-lived trees that support many species of wildlife.' },
    pine: { color: '#A0522D', height: 50, info: 'Pines are evergreen trees that play a crucial role in their ecosystems.' },
    maple: { color: '#FFD700', height: 55, info: 'Maples provide shade and beautiful fall colors, crucial for the ecosystem.' },
};

// Function to generate a simple terrain
function generateWorld() {
    for (let x = 0; x < canvas.width / blockSize; x++) {
        for (let y = canvas.height / 2; y < canvas.height / blockSize; y++) {
            blocks.push({ x, y, color: '#228B22' });
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

// Function to draw trees
function drawTrees() {
    for (let tree of trees) {
        ctx.fillStyle = tree.color;
        ctx.fillRect(tree.x * blockSize, tree.y * blockSize - tree.height, blockSize, tree.height);
    }
}

// Function to plant a tree
function plantTree(x, y, type) {
    const tree = {
        x: Math.floor(x / blockSize),
        y: Math.floor(y / blockSize),
        color: treeTypes[type].color,
        height: treeTypes[type].height,
        info: treeTypes[type].info,
    };
    trees.push(tree);
    drawBlocks();
    drawTrees();
    displayInfo(tree.info);
}

// Function to display educational info
function displayInfo(info) {
    const infoDiv = document.getElementById('info');
    infoDiv.textContent = info;
}

// Handle mouse clicks for planting trees
canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Plant a random tree type
    const treeTypesArray = Object.keys(treeTypes);
    const randomType = treeTypesArray[Math.floor(Math.random() * treeTypesArray.length)];
    plantTree(x, y, randomType);
});

// Initialize the game
generateWorld();
drawBlocks();
