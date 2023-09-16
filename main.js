class Outing {
    constructor(date, time, coordinator, cost, contact, location, rsvpBy, invitees, tags) {
        this.date = date;
        this.time = time;
        this.coordinator = coordinator;
        this.cost = cost;
        this.contact = contact;
        this.location = location;
        this.rsvpBy = rsvpBy;
        this.invitees = invitees;
        this.tags = tags;
    }
}

class Profile {
    constructor(name, username, picture, bio, friendGroups) {
        this.name = name; 
        this.username = username; 
        this.picture = picture;
        this.bio = bio;
        this.friends = friends;
        this.friendGroups = friendGroups;
        this.blocked = blocked;
    }
}

 // Add a click event listener to the button
 document.getElementById('createEventButton').addEventListener('click', function () {
    // Redirect to the makeevent.html page when the button is clicked
    window.location.href = 'newevent.html';
});


// Function to create a new event
function handleEventCreate() {
    // Get values from the form
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;

    // Create a new event object with date and time
    const newEvent = {
        name: eventName,
        dateTime: `${eventDate} ${eventTime}`,
        location: eventLocation
    };

    const outing = new Outing(eventDate, eventTime, "me", );

    // Add the new event to the list
    const eventList = document.getElementById('eventList');
    const eventItem = document.createElement('li');
    eventItem.textContent = `${newEvent.name} - ${newEvent.dateTime} - ${newEvent.location}`;
    eventList.appendChild(eventItem);

    // Clear the form fields
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventLocation').value = '';
}