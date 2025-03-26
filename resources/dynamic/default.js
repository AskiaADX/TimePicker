(function () {
    var timePicker = new TimePicker({
        showSeconds: {%=CurrentADC.PropValue("showSeconds")%},
        stepMinutes: {%=CurrentADC.PropValue("stepMinutes")%},
        stepSeconds: {%=CurrentADC.PropValue("stepSeconds")%},
        imperial: {%=CurrentADC.PropValue("imperial")%},
        hideInput: true,
        minHour: {%= 
        dim tm1 = CurrentQuestion.MinDate 
        cvdkna(tm1.Hour,-2) %},
        maxHour: {%= 
        dim tm2 = CurrentQuestion.MaxDate 
        cvdkna(tm2.Hour,-2) %},
        selected_hour: "{%= Hour(CurrentQuestion) %}",
        selected_min: "{%= Minute(CurrentQuestion) %}",
        selected_sec: "{%= Second(CurrentQuestion) %}",
        question: "{%= CurrentQuestion.Shortcut %}",
        adcId: {%= CurrentADC.InstanceId%}
    });
}());
