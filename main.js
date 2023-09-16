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