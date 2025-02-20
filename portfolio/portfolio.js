var portfolio = document.getElementsByClassName("portfolio")[0];
var portfolio = document.getElementsByClassName("hero")[0];

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

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    pin: true,
    pinSpacing: false
})


let sections = gsap.utils.toArray(".portfolio__wrap");

// gsap.to(sections, {
//     xPercent: -100 * (sections.length - 1), 
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".portfolio", 
//         pin: true, 
//         scrub: 1,
//         // snap: 1 / (sections.length - 1),
//         // base vertical scrolling on how wide the container is so it feels more natural.
//         end: () => "+=" + document.querySelector(".portfolio").offsetWidth
//     }
// });



document.addEventListener("DOMContentLoaded", function () {
    let sections = gsap.utils.toArray(".portfolio__wrap");
    let portfolio = document.querySelector(".portfolio");
    
    gsap.to(portfolio, {
        x: () => `-${(sections.length - 1) * 100}vw`, // Move full width based on section count
        ease: "none",
        scrollTrigger: {
            trigger: ".portfolio",
            start: "top top",
            pin: true,
            scrub: 1,
            end: () => `+=${portfolio.offsetWidth}`, // Scroll duration matches total width
            anticipatePin: 1,
            // snap: {
            //     // snapTo: 1 / (sections.length - 1), // Snap to each section
            //     // duration: 0.1, // Smooth snapping
            //     // ease: "power1.inOut" // Ease effect for snapping
            // }
        }
    });
});