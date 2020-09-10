function getId(elementId){
  return document.getElementById(elementId);
}

var lessons;

function loadGroupInfo(group){
  var data = new XMLHttpRequest();
  data.overrideMimeType( "application/json" );
  data.open( "GET", group + ".json", true );
  data.onreadystatechange = function(){
    if ( data.readyState == 4 && data.status == "200" ){
      lessons = JSON.parse( data.responseText );
      if ( day != 6 && day != -1 ) loadNextLesson();
        else loadFreeDay();
      getId("group-prompt").style.opacity = 0;
    }
  }
  data.send();
}


var dateObj = new Date();
var day = dateObj.getDay() - 1;
var totalMinutes = dateObj.getMinutes() + dateObj.getHours() * 60;

var nextHeader, nextName, nextTime, currHeader, currName, late = false;

function loadNextLesson(){

  var scheduleLength = lessons.schedule[day].length

  for ( var i = 0; i < scheduleLength * 2; i++ ){
    if ( totalMinutes >= lessons.minutes[i] ){
      var j = Math.floor(i / 2);
      nextName = lessons.schedule[day][j + 1];
      currName = lessons.schedule[day][j];
      nextTime = lessons.time[j];
      if ( nextName == "-" ){
        nextName = lessons.schedule[day][j + 2];
        nextTime = lessons.time[j + 1];
      }

      if ( i % 2 == 1 ) currName = "Starpbrīdis";

      if ( nextName === undefined ){
        if ( lessons.schedule[day + 1][1] == "-" ) late = true;
        nextName = lessons.schedule[day + 1][1 + late];
        nextTime = "rīt, " + lessons.time[0 + late];
      }
    }
  }

  if ( totalMinutes >= lessons.minutes[scheduleLength * 2 - 1] ){
    nextName = lessons.schedule[day + 1][1];
    nextTime = lessons.time[0];
    if ( nextName == "-" ){
      nextName = lessons.schedule[day + 1][2];
      nextTime = lessons.time[1];
    }
    currName = "Beigušās stundas";
  }

  console.log(totalMinutes + " " + day);

  displayNextLesson();
}

function loadFreeDay(){
  nextHeader = "Pirmdienas rītā būs";
  nextName = lessons.schedule[0][1];
  nextTime = lessons.time[0];
  currHeader = "Šodien ir";
  currName = "Brīvdiena";
  displayNextLesson();
}

function displayNextLesson(){
  getId("nextlesson-name").innerHTML = nextName;
  getId("nextlesson-time").innerHTML = nextTime;
  getId("currentlesson-name").innerHTML = currName;
}
