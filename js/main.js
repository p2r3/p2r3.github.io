//Swipe gesture code from https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
//Modified to fit this usecase

var startX = 0;
var endX = 0;

function pageLoad(){
  var slider = document.getElementById("slider");

  loadSliderObjects();

  slider.addEventListener('touchstart', function(event) {
    startX = event.changedTouches[0].screenX;
  }, false);

  slider.addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].screenX;
    handleGesture();
  }, false);
}

var minDist = window.innerWidth/10;

function handleGesture() {
  var direction = "";
  if (endX - startX <= -minDist) {
    direction = "left";
  }else if (endX - startX >= minDist) {
    direction = "right";
  }
  moveSlider(direction);
}

var sliderObjects;

function loadSliderObjects(){
  sliderObjects = document.getElementById("slider-objects");
  sliderObject("images/flips.png","Trampoline flips","pages/flips.html");
  sliderObject("images/webdev.png","Web development","pages/webdev.html");
  sliderObject("images/osu.png","osu!","pages/osu.html");
  if(objectCount%2==0) var sliderShift = 25;
  else var sliderShift = 0;
  sliderObjects.style.left=sliderShift+50+"vw";
  sliderObjects.style.top="0";
  sliderObjects.style.width=objectCount*50+"vw";
  currentObject = Math.ceil(objectCount/2);
}

var objectCount = 0;
var currentObject = 0;

function sliderObject(img, title, url){
  objectCount++;
  sliderObjects.innerHTML += "<div class='slider-object' onclick='goToUrl(\""+url+"\")'><img src='"+img+"' alt='Empty'><h3>"+title+"</h3></div>";
}

function goToUrl(url){
  setTimeout(function () {
    window.location.href=url;
  }, 300);
}

function moveSlider(direction){
  var prevLeft = sliderObjects.style.left;
  if(direction === "left"){
    if(currentObject !== objectCount){
      sliderObjects.style.left = parseInt(prevLeft.split("vw")[0],10)-50+"vw";
      currentObject++;
    }
  }
  if(direction === "right"){
    if(currentObject !== 1){
      sliderObjects.style.left = parseInt(prevLeft.split("vw")[0],10)+50+"vw";
      currentObject--;
    }
  }
}
