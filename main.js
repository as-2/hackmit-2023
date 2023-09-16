class Outing {
    constructor(date, time, coordinator, cost, contact, location, rsvpBy, invitees, tags) {
        this.date = date || "2024-01-01";
        this.time = time || "00:00";
        this.coordinator = coordinator || "me";
        this.cost = cost || "free";
        this.contact = contact || "just pu";
        this.location = location || "MIT";
        this.rsvpBy = rsvpBy || "none";
        this.invitees = invitees || "private";
        this.tags = tags || "event";
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


// Function to create a new event
function handleEventCreate() {
    // Get values from the form
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventCost = document.getElementById("eventCost").value;
    const eventCoordinator = document.getElementById("eventCoordinator").value;
    const eventContact = document.getElementById("eventContact").value;

    // Create a new event object with date and time
    const newEvent = {
        name: eventName,
        dateTime: `${eventDate} ${eventTime}`,
        location: eventLocation
    };

    const outing = new Outing(eventDate, eventTime, eventCoordinator, eventCost, eventContact, eventLocation, eventRsvp, eventInvitees,eventTags);
    console.log(outing);

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