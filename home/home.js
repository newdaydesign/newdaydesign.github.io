// const overlay = document.querySelector(".home-bg__overlay");

// let circleX = window.innerWidth / 2;
// let circleY = window.innerHeight / 2;
// let targetX = circleX;
// let targetY = circleY;
// let circleSize = 0.1;  // Start very small on load
// let targetSize = 1.8;  // Default size after load

// const easeFactor = 0.05; // Movement smoothing
// const sizeEaseFactor = 0.01; // Size smoothing
// const maxSize = 400;  // Max size when moving
// const minSize = 300;  // Min size when idle

// let lastMoveTime = Date.now();

// // Define movement boundaries (50% of screen width and height)
// const minX = window.innerWidth * 0.1;  // Left boundary (25%)
// const maxX = window.innerWidth * 0.9;  // Right boundary (75%)
// const minY = window.innerHeight * 0.1; // Top boundary (25%)
// const maxY = window.innerHeight * 0.9; // Bottom boundary (75%)

// // On mouse move, update target position and grow circle
// document.addEventListener("mousemove", (e) => {
//     lastMoveTime = Date.now();  // Update last move time

//     // Get the normalized "pull" effect (centered around the middle)
//     let deltaX = (e.clientX - window.innerWidth / 2) * 0.3;
//     let deltaY = (e.clientY - window.innerHeight / 2) * 0.3;

//     // Constrain movement within the central 50% of the screen
//     targetX = Math.max(minX, Math.min(maxX, window.innerWidth / 2 + deltaX));
//     targetY = Math.max(minY, Math.min(maxY, window.innerHeight / 2 + deltaY));

//     // Increase the circle size while moving
//     targetSize = maxSize;
// });

// // Function to animate the circle growth and movement
// function animate() {
//     // Smoothly interpolate position
//     circleX += (targetX - circleX) * easeFactor;
//     circleY += (targetY - circleY) * easeFactor;

//     // Smoothly interpolate size
//     circleSize += (targetSize - circleSize) * sizeEaseFactor;

//     overlay.style.transform = 'transform: scale(${circleSize}) translate(${circleX}px, ${circleY}px)';

//     // If the mouse hasn't moved for 50ms, shrink the circle
//     if (Date.now() - lastMoveTime > 50) {
//         targetSize = minSize;
//     }

//     requestAnimationFrame(animate);
// }

// // **Page Load Effect - Grow from tiny size**
// setTimeout(() => {
//     targetSize = minSize; // Begin initial growth
// }, 1000); // Small delay before growing

// // Start animation loop
// animate();


// const overlay = document.querySelector(".home-bg__overlay");
const overlay = document.querySelector(".home-bg__image");

let circleX = 0;
let circleY = 0;
let targetX = 0;
let targetY = 0;
let circleSize = 1.0;  // Start very small on load
let targetSize = 1.8;  // Default size after load

const easeFactor = 0.05;
const sizeEaseFactor = 0.01;
const maxSize = 1.8;
const minSize = 0.5;

let lastMoveTime = Date.now();

// Define movement boundaries (in centered coordinates)
const minX = -window.innerWidth * 0.4;  // -40% from center
const maxX = window.innerWidth * 0.4;   // +40% from center
const minY = -window.innerHeight * 0.4;
const maxY = window.innerHeight * 0.4;

// On mouse move, update target position and grow circle
document.addEventListener("mousemove", (e) => {
    lastMoveTime = Date.now();

    // Get mouse position relative to center
    let relativeX = (e.clientX - window.innerWidth / 2) * 0.3;
    let relativeY = (e.clientY - window.innerHeight / 2) * 0.3;

    // Constrain within central region
    targetX = Math.max(minX, Math.min(maxX, relativeX));
    targetY = Math.max(minY, Math.min(maxY, relativeY));

    targetSize = maxSize;
});

// Animate loop
function animate() {
    // Smoothly interpolate position and size
    circleX += (targetX - circleX) * easeFactor;
    circleY += (targetY - circleY) * easeFactor;
    circleSize += (targetSize - circleSize) * sizeEaseFactor;

    // Apply combined transform (translate from center, then scale)
    overlay.style.transform = `translate(${circleX}px, ${circleY}px) scale(${circleSize})`;

    // Reset to idle size if no mouse movement recently
    if (Date.now() - lastMoveTime > 50) {
        targetSize = minSize;
    }

    requestAnimationFrame(animate);
}

// Initial delay before growing
setTimeout(() => {
    targetSize = minSize;
}, 1000);

// Start loop
animate();
