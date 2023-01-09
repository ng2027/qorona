var active=false;
var loggedIn = localStorage.getItem('loggedin');
function animateControlCenter() {
    var ccls = document.getElementsByClassName('control-center-line');
    console.log(ccls)
    var ccl2 = ccls[1];
    var ccl3 = ccls[0];
    if (active == false) {
     
        ccl2.classList.remove('ccl2-deanim');
        ccl3.classList.remove('ccl3-deanim');

        ccl2.classList.add('ccl2');
        ccl3.classList.add('ccl3');

        
        var controlCenterObject = document.getElementById('control-center');


        // controlCenterObject.classList.add('animatable-class-cc');

        setTimeout(setTops, 1000)
        function setTops() {
            ccl2.style.top="-125px";
            ccl3.style.top="-247px";
        }

        controlCenterObject.style.transform="rotate(90deg)";

        displayControlCenter(active);
        active = true;
    }
    else {
        document.getElementById('control-center').classList.
        remove('animatable-class-cc');

        ccl2.classList.remove('ccl2');
        ccl3.classList.remove('ccl3');
        ccl2.classList.add('ccl2-deanim');
        ccl3.classList.add('ccl3-deanim');
        setTimeout(setTops, 800)
        function setTops() {
            ccl2.style.top='-2px';
            ccl3.style.top='6px';
        }

        displayControlCenter(active);

        active=false;

    }

}


function displayControlCenter(active) {
    let ccd = document.getElementById("control-center-div");
    function setLeft(amount) {
        ccd.style.left=amount+"px";
    }
    setLogoutButton();
    if (active == false){
        ccd.classList.remove("deanimate-class-control-center");
        setTimeout(console.log("555"), 100)

        ccd.classList.add("animatable-class-control-center");
        setTimeout(setLeft, 2000, "0")

        active=true;
    }
    else {
        ccd.classList.remove("animatable-class-control-center");
        setTimeout(console.log("555"), 100)

        ccd.classList.add("deanimate-class-control-center");
        setTimeout(setLeft, 2000, "-300")

        active=false;

    }
    
}




function setLogoutButton() {
    loginButton = document.getElementById("login-button");
    logoutButton = document.getElementById("logout-button");

  
    if (loggedIn == 'true') {

        logoutButton.style.display="inline-block";
        // logoutButton.style.paddingLeft="14%";
        loginButton.style.display="none";
 
    }

    else {
        logoutButton.style.display="none";
        loginButton.style.display="inline-block";
    }
}
