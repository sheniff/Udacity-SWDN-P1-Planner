/**
* @description Interactive list of guests to add and remove elements of guests list.
* @constructor
* @param {String} DOM id for parent tag that groups all guests list HTML
*/
function GuestsList(groupId) {
  if(!groupId) {
    return window.console.error('No ID for group where guests list is has been provided!');
  }

  // DOM
  this.group = window.$(groupId);
  this.input = this.group.find('input');
  this.datalist = this.group.find('datalist');
  this.addGuestBtn = this.group.find('.btn');
  this.guestsUl = this.group.find('ul');

  // Data
  this.dataStore = new window.DataStore();
  this.usersList = this.dataStore.getUsers();
  this.guestList = [];
}

/*
* @description It populates list of suggested guests and prepare component to add/remove guests to list
*/
GuestsList.prototype.enable = function() {
  this.populateDatalist();
  this.enableGuestsList();

  // initialize the field as invalid for not having anyone invited to event
  this._invalidateEmptyList();
};

/*
* @description Populates datalist of suggestions to add as guests to event
*/
GuestsList.prototype.populateDatalist = function() {
  this.datalist.empty();

  for (var user in this.usersList) {
    var option = document.createElement('option');
    option.value = user;
    this.datalist.append(option);
  }
};

/*
* @description Enables logic to add guests via input field and remove them from list of invitees
*/
GuestsList.prototype.enableGuestsList = function() {
  var _addCurrentGuest = function() {
    var guest = this.input.val(),
      i = this.input.get(0);

    if (!i.validity.valueMissing && !i.validity.typeMismatch) {
      this.addGuest(guest);
      this.input.val('');
      this.printList();
      i.setCustomValidity('');
    }
  };

  var _removeGuest = function(event) {
    var guest = window.$(event.target).closest('li').text();
    this.removeGuest(guest);
    this.printList();
    this._invalidateEmptyList();
  };

  this.addGuestBtn.off().on('click', _addCurrentGuest.bind(this));
  this.input.off().on('change', _addCurrentGuest.bind(this));
  this.guestsUl.off().on('click', 'a.remove', _removeGuest.bind(this));
};

/*
* @description Adds a guest to the list of invitees
* @param {String} guest - guest email address
*/
GuestsList.prototype.addGuest = function(guest) {
  if(typeof guest === 'string' && !this.guestList.includes(guest)) {
    this.guestList.push(guest);
  }
};

/*
* @description Removes a guest from list of invitees
* @param {String} guest - guest email address
*/
GuestsList.prototype.removeGuest = function(guest) {
  var pos = this.guestList.indexOf(guest);

  if (pos > -1) {
    this.guestList.splice(pos, 1);
  }
};

/*
* @description Clears up and prints list of current guests invited to event
*/
GuestsList.prototype.printList = function() {
  this.guestsUl.empty();

  for (var i in this.guestList) {
    var li = document.createElement('li');
    li.textContent = this.guestList[i];

    var a = window.$('<a class="remove"><i class="glyphicon glyphicon-remove"></i></a>');
    li.appendChild(a.get(0));

    this.guestsUl.append(li);
  }
};

GuestsList.prototype._invalidateEmptyList = function() {
  if(!this.guestList.length) {
    this.input.get(0).setCustomValidity('You should invite at least one person to your event.');
  }
};
