function getCode(){
  return document.getElementById("code").value;
}

function setCode(val){
  return document.getElementById("code").value = val;
}

function setOutput(val){
  return document.getElementById("output").innerHTML = val;
}

function getIndex(name){
  for(var i = 1; i < varNames.length; i++){
    if(name == varNames[i]) return(i);
  }
  alert("Error: Can't get index of " + name + " because it is undefined.");
  return(undefined);
}

function goToIndex(ind){
  while(globalIndex != ind){
    if(globalIndex < ind){
      globalIndex++;
      output += ">";
    } else {
      globalIndex--;
      output += "<";
    }
  }
}

function addition(arr, ind, rez){
  var first = getIndex(arr[ind - 1]);
  var second = getIndex(arr[ind + 1]);
  goToIndex(first);
  output+="[-";
  for(var i=1;i<=globalIndex;i++) output+="<";
  output+="+";
  for(var i=1;i<=first;i++) output+=">";
  output+="]";
  goToIndex(0);
  output+="[-";
  for(var i=1;i<=first;i++) output+=">";
  output+="+";
  if(first < rez) for(var i=first;i<rez;i++) output+=">";
  else for(var i=first;i>rez;i--) output+="<";
  output+="+";
  for(var i=rez;i>0;i--) output+="<";
  output+="]";
  //add second
}

var varNames = [];
var globalIndex = 0;
var output = "";

varNames[0] = "TEMP";

function compile(){
  var lines = getCode().split("\n");
  for(var i = 0; i < lines.length; i++){

    if(lines[i].indexOf(" = ") > -1){

      var split = lines[i].split(" ");
      var currentIndex = varNames.length;
      var currentName = lines[i].substr(0, lines[i].indexOf(" = "));

      for(var j = 1; j < varNames.length; j++){
        if(currentName == varNames[j]){
          currentIndex = j;
          break;
        }
      }

      goToIndex(currentIndex);

      varNames[currentIndex] = currentName;

      output += "[-]";

      if(split.length == 3){

        for(var j=1;j<=parseInt(split[2],10);j++) output+="+";

      } else {

        for(var j = 3; j < split.length; j+=2){
          if(split[j] == "+") addition(split, j, currentIndex);
        }

      }

      //z = a + b - c
      //0 1 2 3 4 5 6

    }

    if(lines[i].indexOf(" >") > -1){

      var currentIndex = getIndex(lines[i].substr(0, lines[i].indexOf(" >")));

      goToIndex(currentIndex);

      output += ".";

    }

  }

  setOutput("Output: " + output);

}
