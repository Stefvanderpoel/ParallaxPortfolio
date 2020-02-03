

/* navbar element global */
var navbar = document.getElementById('navbarResponsive');

/* nav-items elements global */
var navitems = document.getElementsByClassName("nav-link");

/* function collapse navbar */
function collapseNavbar() {
    navbar.className = navbar.className.replace( /(?:^|\s)show(?!\S)/g , '' );
}

/* toggles the navbar */
function toggleNavbar() {
    var toggled = statusNavbar(navbar);
    
    /* function show navbar */
    function showNavbar(navbarElement) {
        navbarElement.className += " show";
    }

    /* function to add onclick="collapseNavbar()" to elements */ 
    function addCollapse(htmlElements) {
        for (var i = 0; i < htmlElements.length; i++) {
            htmlElements[i].setAttribute("onclick", "collapseNavbar()");
        }
    }

    /* function check status of navbar. returns null or value */
        function statusNavbar(navbarElement) {
            var toggled = navbarElement.className.match(/(?:^|\s)show(?!\S)/);
            return toggled;
        }
       
    /* add or remove "show" class based on if it is already there or not (toggled variable) */
    /* for IE compatibilty did not use HTML5 .classlist.add .classlist.remove .classList.contains */
    try {
        if (toggled == null) {         
            showNavbar(navbar);
            addCollapse(navitems);
            
        }
        else {     
            collapseNavbar(); 
        }
    } 
    catch {
        alert("error: toggleNavbar")
    }
}