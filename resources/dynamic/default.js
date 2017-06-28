var options_{%= CurrentADC.InstanceId %} = {
    showSeconds:{%=CurrentADC.PropValue("showSeconds")%},
    stepMinutes:{%=CurrentADC.PropValue("stepMinutes")%},
    stepSeconds:{%=CurrentADC.PropValue("stepSeconds")%},
    imperial:{%=CurrentADC.PropValue("imperial")%},
    hideInput: true
}

var minHour = {%= Val(CurrentQuestion.MinDate.Format("hh")) %};
var maxHour = {%= Val(CurrentQuestion.MaxDate.Format("hh")) %};
console.log(minHour);
console.log(maxHour);

if (!minHour) {
    minHour = 00;    
}
if (!maxHour) {
    maxHour = 24;
}

    
var mil = !options_{%= CurrentADC.InstanceId %}.imperial; // use am/pm
var timeSep = ":";
var showSeconds = options_{%= CurrentADC.InstanceId %}.showSeconds;

var minsInterval = options_{%= CurrentADC.InstanceId %}.stepMinutes;
var minStep = 0;

var secsInterval = options_{%= CurrentADC.InstanceId %}.stepSeconds;
var secStep = 0;

function initPicker(adcId) {
	var seps = document.getElementsByClassName('timeSeparator_' + adcId);
  	for (var x in seps) {
  		document.getElementsByClassName('timeSeparator_' + adcId)[x].innerHTML = timeSep;
  	}
  	if (!showSeconds) {
  		document.getElementById("secsContainer_" + adcId).innerHTML="";
  	} else {
  		var sec = document.getElementById("seconds_" + adcId);
  	}
  	var hour = document.getElementById("hour_" + adcId);
  	var min = document.getElementById("minutes_" + adcId);
  
  	var ampm = document.getElementById("ampm_" + adcId);
  
  

	for (var i=minHour;i<maxHour;i++) {
    	var val = i<10&&mil?"0"+i:i;
    	if (!mil &&  val>12) val-=12;
    	hour.options[i]=new Option(val,i);
  	}
    
    minStep = 0;
  	for (var i=0;i<60;i++) {
    	if (i%minsInterval== 0) {
    		var val = i<10?"0"+i:i;
      		min.options[minStep]=new Option(val,i);
      		minStep++;
    	}
  	}
    
    if(showSeconds){
        secStep = 0;
        for (var i=0;i<60;i++) {
            if (i%secsInterval== 0) {
                var val = i<10?"0"+i:i;
                sec.options[secStep]=new Option(val,i);
                secStep++;
            }
        }
    }
    
  	hour.onchange=function() {
    	var timeResult = "";
    	if (!mil) {
    		ampm.innerHTML=(hour.selectedIndex)<12?"am":"pm";
    	}
    	var hourVal = hour.options[hour.selectedIndex].text;
    	var minsVal = min.options[min.selectedIndex].text;
    	    if(showSeconds) {var secsVal = sec.options[sec.selectedIndex].text}
    	if (showSeconds) {
    	    timeResult = hourVal+":"+minsVal+":"+secsVal;
    	} else {
    		timeResult = hourVal+":"+minsVal;
    	}
    	
    	document.getElementById("time_" + adcId).value=timeResult + ampm.innerHTML;
  	}
  	min.onchange=function() {
    	hour.onchange();
 	}
    
    if(showSeconds){
        sec.onchange=function() {
            min.onchange();
        }
    }
    
  	var now = new Date();
    hour.selectedIndex=now.getHours();
    min.selectedIndex=now.getMinutes()/minsInterval;
    hour.onchange();

}