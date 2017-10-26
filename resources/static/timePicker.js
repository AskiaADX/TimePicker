(function() {
    var msEdgeMatch = /Edge\/([0-9]+)/i.exec(navigator.userAgent);
    if(msEdgeMatch) document.documentMode = parseInt(msEdgeMatch[1]);
})();
(function () {

    function TimePicker(options) {
        var adcId = options.adcId
        var hour = document.querySelector("#hour_" + adcId);
        var min = document.querySelector("#minutes_" + adcId);
        var sec = document.querySelector("#seconds_" + adcId);
        var ampm = document.querySelector("#ampm_" + adcId);
        var timeSep = ":";
        var seps = document.getElementsByClassName('timeSeparator_' + adcId);
        var mil = !options.imperial; // use am/pm
        var showSeconds = options.showSeconds;
		var minsInterval = options.stepMinutes;
        var secsInterval = options.stepSeconds;

        this.selected_hour = parseInt(indexFromVal(hour,options.selected_hour))
        //console.log("from options "+options.selected_hour);
        //console.log("this.selected_hour "+parseInt(indexFromVal(hour,options.selected_hour)));
        this.selected_min = parseInt(indexFromVal(min,options.selected_min));
        this.selected_sec = parseInt(indexFromVal(sec,options.selected_sec));
        this.question = options.question;
        
        var minHour = options.minHour;
        var maxHour = options.maxHour;
        if (!minHour) minHour = 00;
        if (!maxHour) maxHour = 23;
        
        var hourOpt = 0;
        var minStep = 0;  
        var secStep = 0;

        for (var x in seps) {
            document.getElementsByClassName('timeSeparator_' + adcId)[x].innerHTML = timeSep;
        }

        if (!showSeconds) {
            document.querySelector("#secsContainer_" + adcId).innerHTML="";
        } else {            
            sec.options[0] = new Option("ss");
        }
		hour.options[0] = new Option("hh");
        min.options[0] = new Option("mm");

        for (var i=minHour;i<=maxHour;i++) {
            // var val = i<10&&mil?"0"+i:i;
            var val = i;
			if (!mil && val>12) val-=12;
            val = val<10?"0"+val:val;
            if (val)
            {
                hour.options[hourOpt+1]=new Option(val,i);
                hourOpt++;
            }
        }
        hour.selectedIndex = 0;

        minStep = 0;
        for (var i=0;i<60;i++) {
            if (i%minsInterval== 0) {
                var val = i<10?"0"+i:i;
                min.options[minStep+1]=new Option(val,i);
                minStep++;
            }
        }
        min.selectedIndex = 0;

        if(showSeconds){
            secStep = 0;
            for (var i=0;i<60;i++) {
                if (i%secsInterval== 0) {
                    var val = i<10?"0"+i:i;
                    sec.options[secStep+1]=new Option(val,i);
                    secStep++;
                }
            }
            sec.selectedIndex = 0;
        }

        hour.onchange=function() {
            var timeResult = "";
            var hourVal = hour.options[hour.selectedIndex].value;
            var hourIndex = hour.options[hour.selectedIndex].index;
            if (!mil) {
                //console.log("hourVal = "+ hourVal)
                //console.log("hour.selectedIndex = "+hour.selectedIndex);
                if (hour.selectedIndex > 0) ampm.innerHTML=(hourVal)<12?"am":"pm";
                //if(ampm.innerHTML == "pm") hourVal = parseInt(hourVal) + 12;
            }
                        
            var minsVal = min.options[min.selectedIndex].text;
            if(showSeconds) {var secsVal = sec.options[sec.selectedIndex].text}
            if (showSeconds && hourVal != "hh" && minsVal != "mm" && secsVal != "ss") {
                timeResult = hourVal+":"+minsVal+":"+secsVal;
            } else if(!showSeconds && hourVal != "hh" && minsVal != "mm"){
                timeResult = hourVal+":"+minsVal;
            }
            document.querySelector("#time_" + adcId).value=timeResult;
            if (window.askia 
                && window.arrLiveRoutingShortcut 
                && window.arrLiveRoutingShortcut.length > 0
                && window.arrLiveRoutingShortcut.indexOf(options.question) >= 0) {
                askia.triggerAnswer();
            }
        }
        min.onchange=function() {
            hour.onchange();
        }

        if(showSeconds){
            sec.onchange=function() {
                min.onchange();
            }
        }

        if(this.selected_hour >= 0) hour.selectedIndex = this.selected_hour+1;
        if((this.selected_min/minsInterval) >= 0) min.selectedIndex = (this.selected_min/minsInterval) + 1;
        if(showSeconds && (this.selected_sec/secsInterval) >= 0) sec.selectedIndex = (this.selected_sec/secsInterval) + 1;

        hour.onchange();
    }
    
    function indexFromVal(sel,str) {
        for (i=0; i<sel.options.length;i++) {
            alert("i is: "+i +" str is: "+str);
        	if (sel.options[i].text == str) {
                return i;  
            }
        }        
    }
        
    window.TimePicker = TimePicker;

 }());