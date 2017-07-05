

(function () {
    var timePicker = new TimePicker({
        showSeconds: {%=CurrentADC.PropValue("showSeconds")%},
        stepMinutes: {%=CurrentADC.PropValue("stepMinutes")%},
        stepSeconds: {%=CurrentADC.PropValue("stepSeconds")%},
        imperial: {%=CurrentADC.PropValue("imperial")%},
        hideInput: true,
        minHour: {%= Val(CurrentQuestion.MinDate.Format("hh")) %},
        maxHour: {%= Val(CurrentQuestion.MaxDate.Format("hh")) %},
        selected_hour: {%= CurrentQuestion.Value.Hour %},
        selected_min: {%= CurrentQuestion.Value.Minute %},
        selected_sec: {%=CurrentQuestion.Value.Second %},
        question: "{%= CurrentQuestion.Shortcut %}",
        adcId: {%= CurrentADC.InstanceId%}
    });
}());