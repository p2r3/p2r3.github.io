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
      if ( day != 5 && day != -1 ) loadNextLesson();
        else loadFreeDay();
      loadLessonList();
      getId("group-prompt").style.opacity = 0;
      setTimeout(function(){
        getId("group-prompt").style.display = "none";
        getId("viewlist").style.opacity = 1;
      }, 700);
    }
  }
  data.send();
}


var dateObj = new Date();
var day = dateObj.getDay() - 1;
var totalMinutes = dateObj.getMinutes() + dateObj.getHours() * 60;

var nextHeader, nextName, nextTime, currHeader, currName, late = false;

function loadNextLesson(){

  if ( lessons.schedule[day] !== undefined ){

    var scheduleLength = lessons.schedule[day].length;

    for ( var i = 0; i < scheduleLength * 2; i++ ){

      if ( totalMinutes >= lessons.minutes[i] ){

        var j = Math.floor(i / 2);
        nextName = lessons.schedule[day][j + 1];
        currName = lessons.schedule[day][j];
        updateTimeDisplay(lessons.time[j], lessons.minutes[i + 2]);

        if ( nextName == "-" ){
          nextName = lessons.schedule[day][j + 2];
          nextTime = lessons.time[j + 1];
        }

        if ( i % 2 == 1 ){
          currName = "Starpbrīdis";
          updateTimeDisplay(lessons.time[j], lessons.minutes[i + 1]);
        }

        if ( nextName === undefined && day != 5 && day != -1){
          if ( lessons.schedule[day + 1][1] == "-" ) late = true;
          nextName = lessons.schedule[day + 1][1 + late];
          nextTime = "rīt, " + lessons.time[0 + late];
        }

      }

  }


  }

  if ( totalMinutes >= lessons.minutes[scheduleLength * 2 - 1] && day != 5 && day != -1 ){
    nextName = lessons.schedule[day + 1][1];
    nextTime = "rīt, " + lessons.time[0];
    if ( nextName == "-" ){
      nextName = lessons.schedule[day + 1][2];
      nextTime = "rīt, " + lessons.time[1];
    }
    currName = "Beigušās stundas";
  }

  displayNextLesson();
}

function loadFreeDay(){

  nextHeader = "Pirmdienas rītā būs";
  nextName = lessons.schedule[0][1];
  nextTime = lessons.time[0];
  currHeader = "Šodien ir";
  currName = "Brīvdiena";
  getId("viewlist").style.display = "none";
  displayNextLesson();

}

function displayNextLesson(){

  if( nextHeader === undefined ) nextHeader = "Nākamā stunda";
  if( currHeader === undefined ) currHeader = "Tagad";

  getId("nextlesson-header").innerHTML = nextHeader;
  getId("nextlesson-name").innerHTML = nextName;
  getId("nextlesson-time").innerHTML = nextTime;
  getId("currentlesson-header").innerHTML = currHeader;
  getId("currentlesson-name").innerHTML = currName;

}

var listVisible = false;

function viewList(){

  if ( !listVisible ){
     getId("list-display").style.opacity = 1;
     getId("lesson-display").style.filter = "blur(5px)";

     setTimeout(function(){
       listVisible = true;
     }, 100);
  }

}

function hideList(){

  if ( listVisible ){
    getId("list-display").style.opacity = 0;
    getId("lesson-display").style.filter = "blur(0px)";

    setTimeout(function() {
      listVisible = false;
    }, 100);
  }

}

function loadLessonList(){

  if ( lessons.schedule[day] !== undefined ){

    var scheduleLength = lessons.schedule[day].length;
    var listString = "";

    for ( var i = 1; i < scheduleLength; i++ ) {
      listString += "<p class='list-lesson'>" + lessons.schedule[day][i] + "</p><p class='list-time'>" + lessons.time[i - 1] + "</p>";
    }

    getId("list-display").innerHTML = listString;

  }


}

function updateTimeDisplay(time, mins){

  nextTime = time + "<br><span>(vēl " + ( mins - totalMinutes ) + " minūtes)</span>";

}
