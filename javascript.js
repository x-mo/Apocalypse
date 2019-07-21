var close=document.getElementById("close");
var pop=document.getElementById("popupcontainer");
var blacklayer=document.getElementById("blacklayer");
var controllerz=document.getElementById("controllers");
var names=document.getElementById("gamemakers");
var credits=document.getElementById("credits");


soundGameStart.play();

credits.addEventListener("click",shownames);
function shownames() {
    blacklayer.style.display="block";
    close.style.display="block";
    names.style.display="block";


}

controllerz.addEventListener("click",showpopup);
function showpopup() {
    pop.style.display="block";
    blacklayer.style.display="block";
    close.style.display="block";
    names.style.display="none";


}

close.addEventListener("click",hidepopup);
function hidepopup(){
    pop.style.display="none";
    blacklayer.style.display="none";
    close.style.display="none";

};

function clickFunction() {

    soundButtonClicked.play();
    setTimeout(navigate, 1000);

    function navigate() { window.location.replace('ZombieHunter/index.html'); }
}

function hoverFunction() {
    soundButtonHover.play();

}