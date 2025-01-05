window.addEventListener('DOMContentLoaded', () => {

});

if (typeof DoPortfolioRadialGradient === 'function')
    document.removeEventListener('mousemove', DoPortfolioRadialGradient);

function DoOurModelRadialGradient(e) {
    var container = document.getElementsByClassName("hero")[0];

    // Destructure the event object to get clientX and clientY
    const { clientX, clientY } = e;
    const { width, height } = container.getBoundingClientRect();
    
    // Calculate percentages for radial position
    const xPercent = (clientX / width) * 100;
    const yPercent = (clientY / height) * 100;

    // Update the radial gradient
    container.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgb(247, 200, 153), rgb(194, 155, 170))`;
}

// Add the event listener with the correct handler
document.addEventListener('mousemove', DoOurModelRadialGradient);
