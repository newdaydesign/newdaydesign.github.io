if (typeof DoOurModelRadialGradient === 'function')
    document.removeEventListener('mousemove', DoOurModelRadialGradient);

function DoPortfolioRadialGradient(e) {
    var container = document.getElementsByClassName("hero")[0];

    // Destructure the event object to get clientX and clientY
    const { clientX, clientY } = e;
    const { width, height } = container.getBoundingClientRect();
    
    // Calculate percentages for radial position
    const xPercent = (clientX / width) * 100;
    const yPercent = (clientY / height) * 100;

    // Update the radial gradient
    container.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgb(247, 200, 153), rgb(155, 182, 194))`;
}

// Add the event listener with the correct handler
document.addEventListener('mousemove', DoPortfolioRadialGradient);
