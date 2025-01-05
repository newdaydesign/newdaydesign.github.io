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
        setTimeout(() => {DoNavLogo(); }, 200);
        navState = NavState.LOGO;
        dimmer.classList.remove("--is-dimmed");

        // Update the URL in the browser
        history.pushState({}, '', url);
  
        // Fetch the new page
        const response = await fetch(url);
        const html = await response.text();
    
        // Parse the new page HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
    
        // Extract and update the page title
        document.title = doc.querySelector('title').textContent;


        // Get all link elements from the current document
        const existingLinks = Array.from(document.querySelectorAll('link[href]'));

        // Get all link elements from the new page (doc)
        const newLinks = Array.from(doc.querySelectorAll('link[href]'));

        // 1. Remove links from the current document if they aren't in the new document
        existingLinks.forEach(link => {
            const linkHref = link.href;
            if (!newLinks.some(newLink => newLink.href === linkHref)) {
                link.remove();
            }
        });

        // 2. Add new links from the new document that aren't already present
        newLinks.forEach(newLink => {
            const newLinkHref = newLink.href;
            if (!existingLinks.some(link => link.href === newLinkHref)) {
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = newLinkHref;
                document.head.appendChild(linkElement);
            }
        });
    
        // Update <meta> tags if needed
        const metas = doc.querySelectorAll('meta');
        metas.forEach(meta => {
            const existingMeta = document.querySelector(`meta[name="${meta.getAttribute('name')}"]`);
            if(existingMeta){
                existingMeta.parentNode.replaceChild(meta, existingMeta);
            } 
            else{
                document.head.appendChild(meta);
            }
        });
  
        // Extract the new <main> content
        const newMainContent = doc.querySelector('main').innerHTML;


        // Get all script elements from the current document
        const existingScripts = Array.from(document.querySelectorAll('script[src]'));

        // Get all script elements from the new page (doc)
        const newScripts = Array.from(doc.querySelectorAll('script[src]'));

        // 1. Remove scripts from the current document if they aren't in the new document
        existingScripts.forEach(script => {
            const scriptSrc = script.src;
            if (!newScripts.some(newScript => newScript.src === scriptSrc)) {
                // script.parentNode.removeChild(script);
                script.src = '';
                script.type = 'text/gzip';
                script.remove();
                console.log('removed ' + scriptSrc);
            }
        });

        // 2. Add new scripts from the new document that aren't already present
        newScripts.forEach(newScript => {
            const newScriptSrc = newScript.src;
            if (!existingScripts.some(script => script.src === newScriptSrc)) {
                const scriptElement = document.createElement('script');
                scriptElement.src = newScriptSrc;
                scriptElement.async = false; // Ensures proper execution order
                document.head.appendChild(scriptElement);
                console.log('added ' + newScriptSrc);
            }
        });

    
        // Replace the current main content
        document.querySelector('main').innerHTML = newMainContent;

        // window.location.reload();
    
  
      // Finish the menu animation
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 250); // Match this timeout with the animation duration
    });
});

window.addEventListener('popstate', () => {
    // Reload the page when the user navigates back or forward
    window.location.href = window.location.href;
  });

