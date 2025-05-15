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


document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.reveal-right, .reveal-left');
  
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
  
    const handleScroll = () => {
      elements.forEach(el => {
        if (isElementInViewport(el) && !el.classList.contains('active')) {
          el.classList.add('active'); // Add 'active' class to trigger animation
        }
      });
    };
  
    // Initial check in case elements are already in view on page load
    handleScroll();
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});