const backgroundCanvas = document.getElementById('backgroundCanvas');
const bgCtx = backgroundCanvas.getContext('2d');

// Set canvas size to fill the screen
function resizeBackgroundCanvas() {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
}
resizeBackgroundCanvas();
window.addEventListener('resize', resizeBackgroundCanvas);

// Star properties
const stars = [];
const starCount = 200; // Number of stars
const maxStarSpeed = 2; // Maximum speed of stars
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5']; // Array of vibrant colors

// Initialize stars
for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * backgroundCanvas.width,
        y: Math.random() * backgroundCanvas.height,
        z: Math.random() * backgroundCanvas.width, // Depth effect
        speed: Math.random() * maxStarSpeed + 0.1, // Random speed
        color: colors[Math.floor(Math.random() * colors.length)], // Random color
    });
}

// Draw stars
function drawStars() {
    bgCtx.fillStyle = '#000'; // Black background
    bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

    stars.forEach(star => {
        // Update star position
        star.z -= star.speed;
        if (star.z <= 0) {
            star.x = Math.random() * backgroundCanvas.width;
            star.y = Math.random() * backgroundCanvas.height;
            star.z = backgroundCanvas.width; // Reset depth
            star.color = colors[Math.floor(Math.random() * colors.length)]; // Assign a new random color
        }

        // Calculate star size and position
        const starX = (star.x - backgroundCanvas.width / 2) * (backgroundCanvas.width / star.z) + backgroundCanvas.width / 2;
        const starY = (star.y - backgroundCanvas.height / 2) * (backgroundCanvas.width / star.z) + backgroundCanvas.height / 2;
        const starSize = (backgroundCanvas.width / star.z) * 2;

        // Draw star
        bgCtx.beginPath();
        bgCtx.arc(starX, starY, starSize, 0, Math.PI * 2);
        bgCtx.fillStyle = star.color; // Use the star's color
        bgCtx.fill();
    });

    requestAnimationFrame(drawStars);
}

drawStars();