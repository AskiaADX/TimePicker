(function() {
    var msEdgeMatch = /Edge\/([0-9]+)/i.exec(navigator.userAgent);
    if(msEdgeMatch) document.documentMode = parseInt(msEdgeMatch[1]);
})();
(function () {

    function TimePicker(options) {
        var minHour = options.minHour;
        var maxHour = options.maxHour;
        this.selected_hour = options.selected_hour;
        this.selected_min = options.selected_min;
        this.selected_sec = options.selected_sec;
        this.question = options.question;
        var adcId = options.adcId

        if (!minHour) {
            minHour = 00;
        }
        if (!maxHour) {
            maxHour = 24;
        }

        var mil = !options.imperial; // use am/pm
        var timeSep = ":";
        var showSeconds = options.showSeconds;

        var minsInterval = options.stepMinutes;
        var minStep = 0;

        var secsInterval = options.stepSeconds;
        var secStep = 0;

        var seps = document.getElementsByClassName('timeSeparator_' + adcId);
        for (var x in seps) {
            document.getElementsByClassName('timeSeparator_' + adcId)[x].innerHTML = timeSep;
        }
        if (!showSeconds) {
            document.getElementById("secsContainer_" + adcId).innerHTML="";
        } else {
            var sec = document.getElementById("seconds_" + adcId);
            sec.options[0] = new Option("ss");
        }
        var hour = document.getElementById("hour_" + adcId);
        var min = document.getElementById("minutes_" + adcId);

        var ampm = document.getElementById("ampm_" + adcId);

        hour.options[0] = new Option("hh");
        min.options[0] = new Option("mm");


        for (var i=minHour;i<maxHour;i++) {
            // var val = i<10&&mil?"0"+i:i;
            var val = i;
            if (!mil &&  val>12) val-=12;
            val = val<10?"0"+val:val;
            hour.options[i+1]=new Option(val,i);
        }

        minStep = 0;
        for (var i=0;i<60;i++) {
            if (i%minsInterval== 0) {
                var val = i<10?"0"+i:i;
                min.options[minStep+1]=new Option(val,i);
                minStep++;
            }
        }

        if(showSeconds){
            secStep = 0;
            for (var i=0;i<60;i++) {
                if (i%secsInterval== 0) {
                    var val = i<10?"0"+i:i;
                    sec.options[secStep+1]=new Option(val,i);
                    secStep++;
                }
            }
        }
        
        
        function triggerAskia(){
            if (window.askia 
                && window.arrLiveRoutingShortcut 
                && window.arrLiveRoutingShortcut.length > 0
                && window.arrLiveRoutingShortcut.indexOf(options.question) >= 0) {
                askia.triggerAnswer();
            }
        }
        

        hour.onchange=function() {
            var timeResult = "";
            if (!mil) {
                ampm.innerHTML=(hour.selectedIndex)<12?"am":"pm";
            }
            var hourVal = hour.options[hour.selectedIndex].text;
            if(ampm.innerHTML == "pm") hourVal = parseInt(hourVal) + 12;
            var minsVal = min.options[min.selectedIndex].text;
            if(showSeconds) {var secsVal = sec.options[sec.selectedIndex].text}
            if (showSeconds && hourVal != "hh" && minsVal != "mm" && secsVal != "ss") {
                timeResult = hourVal+":"+minsVal+":"+secsVal;
                document.getElementById("time_" + adcId).value=timeResult;
                triggerAskia();
            } else if(!showSeconds && hourVal != "hh" && minsVal != "mm"){
                timeResult = hourVal+":"+minsVal;
                document.getElementById("time_" + adcId).value=timeResult;
                triggerAskia();
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

        hour.selectedIndex = this.selected_hour+1;
        min.selectedIndex = (this.selected_min/minsInterval) + 1;
        if(showSeconds) sec.selectedIndex = (this.selected_sec/secsInterval) + 1;

        hour.onchange();
    }
    
    window.TimePicker = TimePicker;

 }());