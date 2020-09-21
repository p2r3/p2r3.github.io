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
  for(var i = 2; i < varNames.length; i++){
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

function fullAddition(ind1, ind2, rez){
  singleAddition(ind1, 1);
  singleAddition(ind2, 1);
  singleMove(1, rez);
}

function singleAddition(ind1, ind2){
  singleMove(ind1,0);
  goToIndex(0);
  output+="[-";
  goToIndex(ind1);
  output+="+";
  goToIndex(ind2);
  output+="+";
  goToIndex(0);
  output+="]";
}

function singleMove(ind1, ind2){
  goToIndex(ind1);
  output+="[-";
  goToIndex(ind2);
  output+="+";
  goToIndex(ind1);
  output+="]";
}

function clear(ind){
  goToIndex(ind);
  output+="[-]";
}

var varNames = [];
var globalIndex = 0;
var output = "";

varNames[0] = "TEMP1";
varNames[1] = "TEMP2"

function compile(){
  var lines = getCode().split("\n");
  for(var i = 0; i < lines.length; i++){

    if(lines[i].indexOf(" = ") > -1){

      var split = lines[i].split(" ");
      var currentIndex = varNames.length;
      var currentName = lines[i].substr(0, lines[i].indexOf(" = "));

      for(var j = 2; j < varNames.length; j++){
        if(currentName == varNames[j]){
          currentIndex = j;
          break;
        }
      }

      goToIndex(currentIndex);

      varNames[currentIndex] = currentName;

      if(split.length == 3){

        if (!isNaN(split[2])) {
          output += "[-]";
          for(var j=1;j<=parseInt(split[2],10);j++) output+="+";
        } else if (split[2] != split[0]) {
          clear(currentIndex);
          singleAddition(getIndex(split[2]), currentIndex);
        }

      } else {

        if(split[3] == "+") fullAddition(getIndex(split[2]), getIndex(split[4]), currentIndex);

      }

    }

    if(lines[i].indexOf(" >") > -1){

      var currentIndex = getIndex(lines[i].substr(0, lines[i].indexOf(" >")));

      goToIndex(currentIndex);

      output += ".";

    }

  }

  setOutput("Output: " + output);

}
