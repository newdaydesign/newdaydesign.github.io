const overlay = document.querySelector(".home-bg__overlay");

let circleX = window.innerWidth / 2;
let circleY = window.innerHeight / 2;
let targetX = circleX;
let targetY = circleY;
let circleSize = 10;  // Start very small on load
let targetSize = 300;  // Default size after load

const easeFactor = 0.05; // Movement smoothing
const sizeEaseFactor = 0.01; // Size smoothing
const maxSize = 400;  // Max size when moving
const minSize = 300;  // Min size when idle

let lastMoveTime = Date.now();

// Define movement boundaries (50% of screen width and height)
const minX = window.innerWidth * 0.1;  // Left boundary (25%)
const maxX = window.innerWidth * 0.9;  // Right boundary (75%)
const minY = window.innerHeight * 0.1; // Top boundary (25%)
const maxY = window.innerHeight * 0.9; // Bottom boundary (75%)

// On mouse move, update target position and grow circle
document.addEventListener("mousemove", (e) => {
    lastMoveTime = Date.now();  // Update last move time

    // Get the normalized "pull" effect (centered around the middle)
    let deltaX = (e.clientX - window.innerWidth / 2) * 0.3;
    let deltaY = (e.clientY - window.innerHeight / 2) * 0.3;

    // Constrain movement within the central 50% of the screen
    targetX = Math.max(minX, Math.min(maxX, window.innerWidth / 2 + deltaX));
    targetY = Math.max(minY, Math.min(maxY, window.innerHeight / 2 + deltaY));

    // Increase the circle size while moving
    targetSize = maxSize;
});

// Function to animate the circle growth and movement
function animate() {
    // Smoothly interpolate position
    circleX += (targetX - circleX) * easeFactor;
    circleY += (targetY - circleY) * easeFactor;

    // Smoothly interpolate size
    circleSize += (targetSize - circleSize) * sizeEaseFactor;

    // Apply new mask position and size
    overlay.style.maskImage = overlay.style.webkitMaskImage = 
        `radial-gradient(circle ${circleSize}px at ${circleX}px ${circleY}px, transparent 0%, white ${circleSize + (circleSize * 1)}px)`;

    // If the mouse hasn't moved for 50ms, shrink the circle
    if (Date.now() - lastMoveTime > 50) {
        targetSize = minSize;
    }

    requestAnimationFrame(animate);
}

// **Page Load Effect - Grow from tiny size**
setTimeout(() => {
    targetSize = minSize; // Begin initial growth
}, 1000); // Small delay before growing

// Start animation loop
animate();
