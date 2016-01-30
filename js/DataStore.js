/**
* @description Uses localStorage API to emulate data persistence of users and events
* @constructor
*/
function DataStore() {
  if(!localStorage) {
    return window.console.warn('[DataStore] Warning: No localStorage in this browser. Persistence won\'t work!');
  }

  this.USERS_KEY = 'UdacityEventPlannerUsers';
  this.CURRENT_USER_KEY = 'UdacityEventPlannerCurrentUser';
  this.EVENTS_KEY = 'UdacityEventPlannerEvents';

  this.users = JSON.parse(localStorage.getItem(this.USERS_KEY)) || {};
  this.currentUser = JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY));
  this.events = JSON.parse(localStorage.getItem(this.EVENTS_KEY)) || [];
}

/**
* @description Returns if there is any logged in user
* @returns {boolean} There's some logged in user
*/
DataStore.prototype.isLoggedIn = function() {
  return !!this.currentUser;
};

/**
* @description Returns logged in user
* @returns {Object} Logged in user's info
*/
DataStore.prototype.userInfo = function() {
  return this.currentUser;
};

/**
* @description Returns current user's events. Those created by current user and those where this user has been invited to.
* @returns {Array} List of events current user created or has been invited to
*/
DataStore.prototype.userEvents = function() {
  if(!this.currentUser) {
    return [];
  }

  // return those events owned by current user or those where s/he was invited
  var events = this.events.filter(function(evt) {
    return evt.creator === this.currentUser.email ||
      evt.host === this.currentUser.email ||
      evt.guests.includes(this.currentUser.email);
  }.bind(this));

  // if there are no events for this user, add a dummy one
  events = [{
    title: 'Party @ Example.org!',
    host: 'organizer@example.org',
    guests: ['myfriend@example.org', 'thatguy@example.org', 'you@example.org'],
    start: new Date(2016, 2, 10, 20),
    end: new Date(2016, 2, 10, 22),
    location: 'Example.org HQ (777 Bryant St)',
    message: 'Let\'s all have fun together celebrating the 150th anniversary of this emblematic fake company!'
  }];

  return events;
};

/**
* @description Logs in a user based on provided data
* @param {Object} user data to store and log in
*/
DataStore.prototype.login = function(user) {
  if (user instanceof Array) {
    user = DataStore.toObject(user);
  }

  this.users[user.email] = user;
  localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));

  this.currentUser = user;
  localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
};

/**
* @description Logs out current user
*/
DataStore.prototype.logout = function() {
  this.currentUser = null;
  localStorage.removeItem(this.CURRENT_USER_KEY);
};

/**
* @description Returns list of existing users in system
* @returns {Array} List of created users
*/
DataStore.prototype.getUsers = function() {
  return this.users;
};

/**
* @description Stores an event in localStorage
* @param {Object} Event data to store
*/
DataStore.prototype.saveEvent = function(eventData) {
  if (eventData instanceof Array) {
    eventData = DataStore.toObject(eventData);
  }

  eventData.creator = this.userInfo().email;

  this.events.push(eventData);
  localStorage.setItem(this.EVENTS_KEY, JSON.stringify(this.events));
};

/**
* @description [Static method] converts array of items into object using "name" attribute as key
* @param {Array} List of items to convert to a dictionary. Each item must contain a "name" attribute
* @returns {Object} Equivalent to input where keys are each item's attribute "name"
*/
DataStore.toObject = function(array) {
  var o = {};

  array.forEach(function(elm) {
    if (o[elm.name] !== undefined) {
      if (!o[elm.name].push) {
        o[elm.name] = [o[elm.name]];
      }
      o[elm.name].push(elm.value || '');
    } else {
      o[elm.name] = elm.value || '';
    }
  });

  return o;
};
