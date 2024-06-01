document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        googleCalendarApiKey: 'YOUR_GOOGLE_CALENDAR_API_KEY', // Add your API key here
        events: {
            googleCalendarId: 'YOUR_CALENDAR_ID', // Add your Calendar ID here
            className: 'gcal-event' // Add custom class to events
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        eventClick: function(info) {
            openModal(info.event.start, info.event.end);
        },
        dateClick: function(info) {
            // Grayed out days if fully booked logic can be added here
        }
    });

    calendar.render();

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
