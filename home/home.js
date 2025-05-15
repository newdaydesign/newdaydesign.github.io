const overlay = document.querySelector(".home-bg__overlay");

let circleX = window.innerWidth / 2;
let circleY = window.innerHeight / 2;
let targetX = circleX;
let targetY = circleY;
let circleSize = 10;  // Start very small on load
let targetSize = 300;  // Default size after load

let lastX = NaN, lastY = NaN, lastSize = NaN;

const easeFactor = 0.2; // Movement smoothing
const sizeEaseFactor = 0.02; // Size smoothing
const maxSize = 400;  // Max size when moving
const minSize = 300;  // Min size when idle

let lastMoveTime = Date.now();

let mouseX = 0 , mouseY = 0;


// Initial values for window dimensions and boundaries
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

let minX = viewportWidth * 0.1;
let maxX = viewportWidth * 0.9;
let minY = viewportHeight * 0.1;
let maxY = viewportHeight * 0.9;

// Listen for window resize events
window.addEventListener("resize", () => {
    // Update viewport size
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    // Recalculate boundaries based on new size
    minX = viewportWidth * 0.1;
    maxX = viewportWidth * 0.9;
    minY = viewportHeight * 0.1;
    maxY = viewportHeight * 0.9;
});



// On mouse move
document.addEventListener("mousemove", (e) => {
    lastMoveTime = Date.now();  // Update last move time

    mouseX = e.clientX;
    mouseY = e.clientY;
});

let lastFrameTime = 0;
const refreshRate = 40;
const frameInterval = 1000 / refreshRate; 

function animate(timestamp) {
    requestAnimationFrame(animate);

    // Only update if enough time has passed
    if (timestamp - lastFrameTime < frameInterval) return;

    lastFrameTime = timestamp;

    // Get the normalized "pull" effect (centered around the middle)
    let deltaX = (mouseX - viewportWidth / 2) * 0.3;
    let deltaY = (mouseY- viewportHeight / 2) * 0.3;

    // Constrain movement within the central 50% of the screen
    targetX = Math.max(minX, Math.min(maxX, viewportWidth / 2 + deltaX));
    targetY = Math.max(minY, Math.min(maxY, viewportHeight / 2 + deltaY));

    // Increase the circle size while moving
    targetSize = maxSize;

    circleX += (targetX - circleX) * easeFactor;
    circleY += (targetY - circleY) * easeFactor;
    circleSize += (targetSize - circleSize) * sizeEaseFactor;

    const shouldUpdate =
        isNaN(lastX) ||
        Math.abs(circleX - lastX) > 0.5 ||
        Math.abs(circleY - lastY) > 0.5 ||
        Math.abs(circleSize - lastSize) > 0.5;

    if (shouldUpdate) {
        overlay.style.setProperty('--circle-x', `${circleX}px`);
        overlay.style.setProperty('--circle-y', `${circleY}px`);
        overlay.style.setProperty('--circle-size', `${circleSize}px`);
        lastX = circleX;
        lastY = circleY;
        lastSize = circleSize;
    }

    if (Date.now() - lastMoveTime > 50) {
        targetSize = minSize;
    }
}

// **Page Load Effect - Grow from tiny size**
setTimeout(() => {
    targetSize = minSize; // Begin initial growth
}, 1000); // Small delay before growing

requestAnimationFrame(animate);


gsap.registerPlugin(ScrollTrigger);




// Set up each path's dasharray and dashoffset once
const paths = gsap.utils.toArray('.thread-line-path');

var pathLength;
paths.forEach(path => {
  pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;
  path.dataset.length = length;
});


ScrollTrigger.create({
  trigger: '.thread-line',
  start: 'top 75%',     // When .thread-line enters viewport
  end: 'bottom 75%',       // Until it leaves
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;

    paths.forEach(path => {
        path.style.strokeDashoffset = pathLength * (1 - progress);
    });
  }
});


// gsap.utils.toArray('.thread-line-path').forEach(path => {
//     const length = path.getTotalLength();
//     path.style.strokeDasharray = length;
//     path.style.strokeDashoffset = length;
  
//     gsap.to(path, {
//         strokeDashoffset: 0,
//         scrollTrigger: {
//           trigger: '.thread-line',
//           start: 'top bottom',
//           end: 'bottom 50%',
//           scrub: true,
//         },
//         ease: 'none',
//       });
// });

// const paths = document.querySelectorAll('.thread-line-path');
// const triggerEl = document.querySelector('.thread');

// // Prepare each path
// paths.forEach(path => {
//   const length = path.getTotalLength();
//   path.style.strokeDasharray = length;
//   path.style.strokeDashoffset = length;
//   path.dataset.length = length;
// });

// // Listen to scroll on the main window
// window.addEventListener('scroll', () => {
//   const triggerRect = triggerEl.getBoundingClientRect();


//   console.log("triggerRect.top: " + triggerRect.top + " window.scrollY: " + window.scrollY);

//   const totalScrollRange = triggerRect.height;

//   let startAnimFromBottom = 0.75;
//   let shiftAmount = window.innerHeight * 2 * startAnimFromBottom;

//   // Clamp progress between 0 and 1
//   let progress = (window.scrollY - triggerRect.top - 0) / totalScrollRange;
//   progress = Math.max(0, Math.min(1, progress));


//   console.log("innerHeight: " + innerHeight);
//   console.log("triggerRect.top: " + triggerRect.top + " window.scrollY: " + window.scrollY);
//   console.log("totalScrollRange: " + totalScrollRange);
//   console.log(progress);

//   // Update strokeDashoffset for all paths
//   paths.forEach(path => {
//     const length = parseFloat(path.dataset.length);
//     path.style.strokeDashoffset = length * (1 - progress);
//   });
// });