(function () {
    var timePicker = new TimePicker({
        showSeconds: {%=CurrentADC.PropValue("showSeconds")%},
        stepMinutes: {%=CurrentADC.PropValue("stepMinutes")%},
        stepSeconds: {%=CurrentADC.PropValue("stepSeconds")%},
        imperial: {%=CurrentADC.PropValue("imperial")%},
        hideInput: true,
        minHour: {%= Hour(CurrentQuestion.MinDate) %},
        maxHour: {%= Hour(CurrentQuestion.MaxDate) %},
        selected_hour: "{%= Hour(CurrentQuestion) %}",
        selected_min: "{%= Minute(CurrentQuestion) %}",
        selected_sec: "{%= Second(CurrentQuestion) %}",
        question: "{%= CurrentQuestion.Shortcut %}",
        adcId: {%= CurrentADC.InstanceId%}
    });
}());