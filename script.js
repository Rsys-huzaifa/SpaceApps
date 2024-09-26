const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
let score = 0;
let basketPosition = 50; // Start position of the basket

// Function to move the basket
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const gameAreaRect = gameArea.getBoundingClientRect();
    basketPosition = ((x - gameAreaRect.left) / gameAreaRect.width) * 100;
    basket.style.left = `${basketPosition}%`;
});

// Function to create falling apples
function createApple() {
    const apple = document.createElement('div');
    apple.classList.add('apple');
    apple.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    gameArea.appendChild(apple);
    
    // Animate apple falling
    let appleFallInterval = setInterval(() => {
        let appleTop = parseFloat(getComputedStyle(apple).top);
        if (appleTop < window.innerHeight - 40) {
            apple.style.top = `${appleTop + 5}px`;
        } else {
            clearInterval(appleFallInterval);
            gameArea.removeChild(apple);
            alert(`Game Over! Your score: ${score}`);
            location.reload(); // Restart the game
        }
        
        // Check for collision with basket
        const appleRect = apple.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();
        if (appleRect.bottom > basketRect.top && 
            appleRect.right > basketRect.left && 
            appleRect.left < basketRect.right) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            clearInterval(appleFallInterval);
            gameArea.removeChild(apple);
        }
    }, 100);
}

// Create apples at intervals
setInterval(createApple, 1000);
