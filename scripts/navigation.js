var logo = document.getElementsByClassName("logo")[0];
var logoCircle = logo.getElementsByClassName("logo__circle")[0];
var logoText = logo.getElementsByClassName("logo__text")[0];
var logoUnderline = logo.getElementsByClassName("logo__underline")[0];
var logoBurgerLine1 = logo.getElementsByClassName("logo__burger-line-1")[0];
var logoBurgerLine2 = logo.getElementsByClassName("logo__burger-line-2")[0];
var nav = document.getElementsByClassName("nav")[0];
var dimmer = document.getElementsByClassName("dimmer")[0];

const navLinks = nav.querySelectorAll('a'); // Navigation links

const HasNoHover = window.matchMedia('(hover: none)').matches;

const NavState = Object.freeze({
    SUNRISE: "SUNRISE",
    LOGO: "LOGO",
    HAMBURGER: "HAMBURGER",
    NAV: "NAV"
})

var isMouseOverNavCircle = false;

var navState; 

function CheckIfDoingSunrise(){
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    if (isHomePage) {
        logoCircle.classList.add('--is-ani');
        logoText.classList.add('--is-ani');
        navState = NavState.SUNRISE;
    } else {
        logoCircle.classList.remove('--is-ani');
        logoText.classList.remove('--is-ani');
        navState = NavState.LOGO;
    }
}
CheckIfDoingSunrise();

function DoNavHamburger(){
    logoBurgerLine1.classList.add("--is-hover");
    logoBurgerLine2.classList.add("--is-hover");
    logoText.classList.add("--is-hover");
    logoCircle.classList.add("--is-hover");
    logoUnderline.classList.add("--is-hover");
}

function DoNavLogo(){
    logoBurgerLine1.classList.remove("--is-hover");
    logoBurgerLine2.classList.remove("--is-hover");
    logoText.classList.remove("--is-hover");
    logoCircle.classList.remove("--is-hover");
    logoUnderline.classList.remove("--is-hover");
}

function AlternateNavMenu(){
    logoBurgerLine1.classList.toggle("--is-menu");
    logoBurgerLine2.classList.toggle("--is-menu");
    nav.classList.toggle("--is-opened");
}


logoText.addEventListener("animationstart", function(){
    navState = NavState.SUNRISE;
});  

logoText.addEventListener("animationend", function(){
    if(isMouseOverNavCircle == true){
        navState = NavState.HAMBRUGER;
        DoNavHamburger();
    }
    else
        navState = NavState.LOGO;
});    

logo.addEventListener('mouseover', function() {
    isMouseOverNavCircle = true;

    if(navState != NavState.SUNRISE)
        DoNavHamburger();
    
});     

logo.addEventListener('mouseleave', function() {
    isMouseOverNavCircle = false;

    if(navState != NavState.SUNRISE && navState != NavState.NAV)
        DoNavLogo();
});   

logo.addEventListener('click', function() {
    if(navState != NavState.SUNRISE){
        AlternateNavMenu();
        if(navState != NavState.NAV){
            navState = NavState.NAV;
            dimmer.classList.add("--is-dimmed");
        }    
        else{
            navState = NavState.HAMBURGER;
            dimmer.classList.remove("--is-dimmed");
        }    
    }    
}); 

if(HasNoHover){
    window.addEventListener('scroll', () => {
        // Check if the user has scrolled down at all
        if (window.scrollY > 3) {
            DoNavHamburger()
        } 
        else{
            DoNavLogo();
        }
    });
}  

navLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = e.target.href;
  
        AlternateNavMenu();
        dimmer.classList.remove("--is-dimmed");
        dimmer.classList.add("--is-brightened");

        setTimeout(() => {DoNavLogo(); }, 100);
        navState = NavState.LOGO;
        // dimmer.classList.remove("--is-dimmed");


        setTimeout(() => {
            window.location.href = url; 
        }, 500);
    });
});

  window.addEventListener('DOMContentLoaded', () => {
    dimmer.classList.remove("--is-brightened");
});  
