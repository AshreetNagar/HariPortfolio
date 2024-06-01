// Load the Google APIs Client Library
gapi.load('client:auth2', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY', // Replace with your API key
        clientId: 'YOUR_CLIENT_ID', // Replace with your Client ID
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
    }).then(() => {
        // List upcoming events
        listUpcomingEvents();
    });
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(response => {
        const events = response.result.items;
        const calendarDiv = document.getElementById('calendar');

        if (events.length > 0) {
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.innerText = `${event.summary} (${event.start.dateTime || event.start.date})`;
                eventDiv.addEventListener('click', () => {
                    openModal(event);
                });
                calendarDiv.appendChild(eventDiv);
            });
        } else {
            calendarDiv.innerText = 'No upcoming events found.';
        }
    });
}

function openModal(event) {
    const modal = document.getElementById('contactFormModal');
    modal.style.display = 'block';
    // Populate form with event details if needed
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
