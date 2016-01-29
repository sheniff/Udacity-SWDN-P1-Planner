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

DataStore.prototype.isLoggedIn = function() {
  return !!this.currentUser;
};

DataStore.prototype.userInfo = function() {
  return this.currentUser;
};

DataStore.prototype.userEvents = function() {
  if(!this.currentUser) {
    return [];
  }

  // return those events owned by current user or those where s/he was invited
  return this.events.filter(function(evt) {
    return evt.creator === this.currentUser.email ||
      evt.host === this.currentUser.email ||
      evt.guests.includes(this.currentUser.email);
  }.bind(this));
};

DataStore.prototype.login = function(user) {
  if (user instanceof Array) {
    user = DataStore.toObject(user);
  }

  this.users[user.email] = user;
  localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));

  this.currentUser = user;
  localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
};

DataStore.prototype.logout = function() {
  this.currentUser = null;
  localStorage.removeItem(this.CURRENT_USER_KEY);
};

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

DataStore.prototype.getUsers = function() {
  return this.users;
};

DataStore.prototype.saveEvent = function(eventData) {
  if (eventData instanceof Array) {
    eventData = DataStore.toObject(eventData);
  }

  eventData.creator = this.userInfo().email;

  this.events.push(eventData);
  localStorage.setItem(this.EVENTS_KEY, JSON.stringify(this.events));
};
