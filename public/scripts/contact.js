// --------- Other ---------
function formSubmitFunc(e) {
    console.log("hi")
    console.log(calendar.currentData.eventStore.instances)
    console.log("ddi it works")
    e.preventDefault();
    return false;
}
function isRealValue(obj)
{
    return obj && obj !== 'null' && obj !== 'undefined';
}

// --------- Slot Picker Section ---------
// Make this pop up like the calendar does
// Show the range in the button (9-11 AM)
// Blank out filled slots
function setupTimeSlotPicker(){
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let rowAmnt = 4
    if (vw < 768){
        rowAmnt = 2
    }
    $('#time-slot-picker').timeSlotPicker(
        {
            startTime:'09:00',
            endTime:'18:00',
            timeStep:'120',
            // defaultDate:'2021-05-31',
            // maxDateTime:'2021-05-30 18:00',
            // minDateTime:'2021-05-30 09:00',
            showEntireTimeslot : true,
            hideMinutesIfZero: true,
            minDayTime:'09:00',
            maxDayTime:'18:00',
            inputElementSelector:'#time-slot-input',
            maxPerRow: rowAmnt,
        }
    );
}

function validTimeCheck(){
    const startTimeInput = document.getElementById('timestart').valueAsDate;
    const endTimeInput = document.getElementById('timeend').valueAsDate;
    const startEmpty = !isRealValue(startTimeInput)
    const endEmpty = !isRealValue(endTimeInput)
    var allEvents = calendar.currentData.eventStore.instances
    
    // if both are null, do nothing
    if (startEmpty && endEmpty){
        return
    }

    // if one is null but the other isnt, make sure date isnt within existing ranges
    else if (!startEmpty && endEmpty){
        var newStartDate = new Date(selectedDay.getTime())
        newStartDate.setHours(startTimeInput.getHours())
        newStartDate.setMinutes(startTimeInput.getMinutes())    

        Object.keys(allEvents).forEach(calEventKey => {
            calEvent = allEvents[calEventKey]
            if ((calEvent.range.start < newStartDate) &&( newStartDate < calEvent.range.end)){
                alert("no")
                document.getElementById('timestart').value = ""
            }
        });
        return
    }
    else if (startEmpty && !endEmpty){
        var newEndDate = new Date(selectedDay.getTime())
        newEndDate.setHours(endTimeInput.getHours())
        newEndDate.setMinutes(endTimeInput.getMinutes())    

        Object.keys(allEvents).forEach(calEventKey => {
            calEvent = allEvents[calEventKey]
            if ((calEvent.range.start < newEndDate) &&( newEndDate < calEvent.range.end)){
                alert("no")
                document.getElementById('timeend').value = ""
            }
        });
        return
    }
    
    // if both present, regular range conflict
    else {
        var newStartDate = new Date(selectedDay.getTime())
        newStartDate.setHours(startTimeInput.getHours())
        newStartDate.setMinutes(startTimeInput.getMinutes())  
        var newEndDate = new Date(selectedDay.getTime())
        newEndDate.setHours(endTimeInput.getHours())
        newEndDate.setMinutes(endTimeInput.getMinutes())    
        // invalid if ends before starts
        if (newStartDate>=newEndDate){
            alert("end time must be after start time")
            document.getElementById('timeend').value = ""
        }
        // range overlap: valid if starts after existing ends / ends before existing starts
        Object.keys(allEvents).forEach(calEventKey => {
            calEvent = allEvents[calEventKey]
            if (!((newStartDate>calEvent.range.end) || (newEndDate<calEvent.range.start))){
                alert("no")
                document.getElementById('timestart').value = ""
                document.getElementById('timeend').value = ""
            }
        });
    }

    var newStartDate = new Date(selectedDay.getTime())
    newStartDate.setHours(startTimeInput.getHours())
    newStartDate.setMinutes(startTimeInput.getMinutes())    
    console.log(newStartDate)


}
function openSlotPicker(e){
    event.preventDefault();    
    var popup = document.getElementById("slotPickerPopup");
    const clickedOnClosedPopup = popup && !popup.classList.contains('show');
    if (clickedOnClosedPopup) {
        popup.classList.toggle("show");
        // var popupDiv = document.getElementById("slotPickerPopupDiv");
        // popupDiv.display = "inline-block";
        
    }
}
document.addEventListener(
    "slotSelected",
    (e) => {
      console.log($('.tsp-active').text())
      document.querySelector('#start-time').value = $('.tsp-active').text()
    },
    false,
  );
document.addEventListener('DOMContentLoaded', function() {
    setupTimeSlotPicker()
});
$(window).resize(function() {
    setupTimeSlotPicker()
});


// --------- Calendar Section ---------
var calendar = ""
var selectedDay = ""
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    calendarEl.style.width = document.getElementById('date').offsetWidth + "px  "
    document.getElementById('time-slot-picker').style.width = document.getElementById('start-time').offsetWidth + "px  "


    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        googleCalendarApiKey: 'AIzaSyCl3MxjwR0UYF8yEAj4rhOZ9HKvdbwqwUU', // Add your API key here
        events: 'firstname.lastname.shut@gmail.com',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            // right: 'dayGridMonth,timeGridWeek,timeGridDay'
            right: 'today'
        },
        eventClick: function(info) {
            info.jsEvent.preventDefault();
        },
        eventContent: function (arg) {
            var event = arg.event;
            const eventText = "Busy"
            var customHtml = '';
            // customHtml += "<span class='r10 highlighted-badge font-xxs font-bold clearColour'>" + eventText + "</span>";
            return { html: customHtml }
        },
        dateClick: function(info) {
            var today = new Date()
            if (info.date>today){
                var popup = document.getElementById("myPopup");
                selectedDay = info.date
                console.log(info.date)
                document.querySelector('#date').value = info.date.toISOString().split('T')[0]
                document.querySelector('#calendarWarning').style.visibility = "hidden";
                popup.classList.toggle("show"); 
            }else{
                document.querySelector('#calendarWarning').innerHTML = "Please select a date that is not in the past.";
                // document.querySelector('#calendarWarning').style.visibility = "hidden";
                // document.querySelector('#calendarWarning').style.visibility = "visible";

            }            
            // Grayed out days if fully booked logic can be added here
        }
    });

    calendar.render();

    
    function IsDateHasEvent(date) {
        var allEvents = [];
        allEvents = calendar.currentData.eventStore.instances
        console.log(allEvents)
        Object.keys(allEvents).forEach(calEventKey => {
            calEvent = allEvents[calEventKey]
            console.log(calEvent)
        });
    }

});
$(window).resize(function() {
    const calendarEl = document.getElementById('calendar');
    calendarEl.style.width = document.getElementById('date').offsetWidth + "px  "
    document.getElementById('time-slot-picker').style.width = document.getElementById('start-time').offsetWidth + "px  "
    calendar.render();
    console.log("viewport change, rerender calendar")
});

// // add the responsive classes after page initialization
// window.onload = function () {
//     $('.fc-toolbar.fc-header-toolbar').addClass('row col-lg-12');
// };
// // add the responsive classes when navigating with calendar buttons
// $(document).on('click', '.fc-button', function(e) {
//     $('.fc-toolbar.fc-header-toolbar').addClass('row col-lg-12');
// });

// Date Checks:
// 1) Set Day
//  a) Check if day is fully booked? Between a range (9am-5pm), find a slot at least X hours long 
// 2) Set Time (needs day set first)
//  a) Can't start during event
//  b) Can't end during event
//  c) another event cant start during this event

// Calendar: only click days after today


function openCalendar(e){
    event.preventDefault();    
    var popup = document.getElementById("myPopup");
    const clickedOnClosedPopup = popup && !popup.classList.contains('show');
    if (clickedOnClosedPopup) {
        popup.classList.toggle("show");
        // var popupDiv = document.getElementById("calendarPopupDiv");
        // popupDiv.style.display = "inline-block";
        calendar.render()
    }
}


// --------- Both ---------
// Close calendar and picker
window.addEventListener('click', ({target}) => {
    const isInPopupCalendar = target.closest("#formDateInput")
    const isInPopupTimeSlotPicker = target.closest("#formTimeInput")
    // document.querySelector('#calendarWarning').style.visibility = "hidden";
    if ((isInPopupCalendar == null)){
        var popup = document.getElementById("myPopup");

        popup.classList.remove("show");  
        document.querySelector('#calendarWarning').innerHTML = "";
        // document.getElementById("calendarPopupDiv").style.display = "none";
    }
    if(isInPopupTimeSlotPicker == null){
        var popup = document.getElementById("slotPickerPopup");
        popup.classList.remove("show");  
        // document.getElementById("slotPickerPopupDiv").style.display = "none";        
    }
});


