function DataStore() {
  if(!localStorage) {
    return console.warn('[DataStore] Warning: No localStorage in this browser. Persistence won\'t work!');
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
  var events = [];

  if(!this.currentUser) {
    return events;
  }

  // return those events owned by current user or those where s/he was invited
  return this.events.filter(function(evt) {
    return evt.host === this.currentUser.email || evt.guests.includes(this.currentUser.email);
  });
};

DataStore.prototype.login = function(user) {
  if (user instanceof Array) {
    user = this.toObject(user);
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

DataStore.prototype.toObject = function(array) {
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
