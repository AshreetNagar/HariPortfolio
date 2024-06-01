var calendar = ""
var selectedDay = ""

function isRealValue(obj)
{
    return obj && obj !== 'null' && obj !== 'undefined';
}


document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        // plugins: [ googleCalendarPlugin ],
        googleCalendarApiKey: 'AIzaSyCl3MxjwR0UYF8yEAj4rhOZ9HKvdbwqwUU', // Add your API key here
        events: 'firstname.lastname.shut@gmail.com',
        // events: 'calendar.google.com/calendar/u/1?cid=Zmlyc3RuYW1lLmxhc3RuYW1lLnNodXRAZ21haWwuY29t',
        // events: {
        //     googleCalendarId: 'firstname.lastname.shut@gmail.com', // Add your Calendar ID here
        //     className: 'gcal-event' // Add custom class to events
        // },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        eventClick: function(info) {
            // openModal(info.event.start, info.event.end);
            info.jsEvent.preventDefault();
        },
        dateClick: function(info) {
            var today = new Date()
            if (info.date>today){
                selectedDay = info.date
                openModal("", "");
                // IsDateHasEvent(info)    
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
        // var event = $.grep(allEvents, function (v) {
        //     return v.start === date;
        // });
        // return event.length > 0;
    }

    function openModal(start, end) {
        const modal = document.getElementById('contactFormModal');
        modal.style.display = 'block';
        // Populate form with date details if needed
    }

    const modal = document.getElementById('contactFormModal');
    const closeModal = document.getElementsByClassName('close')[0];

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});

function validTimeCheck(){
    const startTimeInput = document.getElementById('timestart').valueAsDate;
    const endTimeInput = document.getElementById('timeend').valueAsDate;
    const startEmpty = !isRealValue(startTimeInput)
    const endEmpty = !isRealValue(endTimeInput)
    var allEvents = calendar.currentData.eventStore.instances
    
    // console.log(startEmpty)
    // console.log(endEmpty)

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