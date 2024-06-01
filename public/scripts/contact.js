var calendar = ""

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
            console.log(info)
            openModal("", "");
            IsDateHasEvent(info)
            
            // Grayed out days if fully booked logic can be added here
        }
    });

    calendar.render();
      
    function IsDateHasEvent(date) {
        var allEvents = [];
        allEvents = calendar
        console.log(allEvents)
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
