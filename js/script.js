
/* evenlisteners */
/* navbar expand button click */
document.getElementById("navbartoggle").addEventListener("click", toggleNavbar);
document.getElementById("contentlayer").addEventListener("click", collapseNavbar);

/* navbar element global */
var navbar = document.getElementById('navbarResponsive');
var dropdown = document.getElementById('dropdownProject');

/* function collapse navbar */
function collapseNavbar() {
    dropdown.className = dropdown.className.replace( /(?:^|\s)show(?!\S)/g , '' );
    navbar.className = navbar.className.replace( /(?:^|\s)show(?!\S)/g , '' );
    
}

/* function to to unshow objects */
function collapse(element) {
    element.className = element.className.replace( /(?:^|\s)show(?!\S)/g , '' );
}

function toggleDiv(divid) {
    document.getElementById(divid).style.display = "block";
    if (opendiv == divid) {
        hideDiv(opendiv)
        opendiv = null;
    }
    else if (opendiv != null) {
        hideDiv(opendiv);
        opendiv = divid;
    }
    else {
        opendiv = divid;
    }
}

/* toggles the navbar */
function toggleNavbar() {
    var toggled = statusNavbar(navbar);
    
    /* function show navbar */
    function showNavbar(navbarElement) {
        navbarElement.className += " show";
    }

    /* function check status of navbar. returns null or value */
    function statusNavbar(navbarElement) {
        var toggled = navbarElement.className.match(/(?:^|\s)show(?!\S)/);
        return toggled;
    }
       
    /* add or remove "show" class based on if it is already there or not (toggled variable)
    for IE compatibilty did not use HTML5 .classlist.add .classlist.remove .classList.contains */
    try {
        if (toggled == null) {         
            showNavbar(navbar);
        }
        else {     
            collapseNavbar(); 
        }
    } 
    catch (error) {
        alert("error: toggleNavbar")
    }
}

function toggleDropdown() {

    /* function show dropdown */
    function show(dropdownElement) {
        dropdownElement.className += " show";
    }

    /* function check status of dropdown. returns null or value */
    function status(dropdownElement) {
        var toggled = dropdownElement.className.match(/(?:^|\s)show(?!\S)/);
        return toggled;
    }

    var toggled = status(dropdown);
            
    /* add or remove "show" class based on if it is already there or not (toggled variable)
    for IE compatibilty did not use HTML5 .classlist.add .classlist.remove .classList.contains */
    try {
        if (toggled == null) {         
            show(dropdown);
        }
        else {     
            collapse(dropdown); 
        }
    } 
    catch (error) {
        alert("error: toggleNavbar")
    }
}
