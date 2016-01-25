function GuestsList(groupId) {
  if(!groupId) {
    return console.error('No ID for group where guests list is has been provided!');
  }

  // DOM
  this.group = $(groupId);
  this.input = this.group.find('input');
  this.datalist = this.group.find('datalist');
  this.addGuestBtn = this.group.find('.btn');
  this.guestsUl = this.group.find('ul');

  // Data
  this.dataStore = new DataStore();
  this.usersList = this.dataStore.getUsers();
  this.guestList = [];
}

GuestsList.prototype.enable = function() {
  this.populateDatalist();
  this.enableGuestsList();
};

GuestsList.prototype.populateDatalist = function() {
  this.datalist.empty();

  for (var user in this.usersList) {
    var option = document.createElement('option');
    option.value = user;
    this.datalist.append(option);
  }
};

GuestsList.prototype.enableGuestsList = function() {
  var _addCurrentGuest = function() {
    var guest = this.input.val();

    if(typeof guest === 'string' && this.input.is(':valid')) {
      this.addGuest(guest);
      this.input.val('');
      this.printList();
    }
  };

  var _removeGuest = function(event) {
    var guest = $(event.target).closest('li').text();
    this.removeGuest(guest);
    this.printList();
  };

  this.addGuestBtn.off().on('click', _addCurrentGuest.bind(this));
  this.input.off().on('change', _addCurrentGuest.bind(this));
  this.guestsUl.off().on('click', 'a.remove', _removeGuest.bind(this));
};

GuestsList.prototype.addGuest = function(guest) {
  if(typeof guest === 'string' && !this.guestList.includes(guest)) {
    this.guestList.push(guest);
  }
};

GuestsList.prototype.removeGuest = function(guest) {
  var pos = this.guestList.indexOf(guest);

  if (pos > -1) {
    this.guestList.splice(pos, 1);
  }
};

GuestsList.prototype.printList = function() {
  this.guestsUl.empty();

  for (var i in this.guestList) {
    var li = document.createElement('li');
    li.textContent = this.guestList[i];

    var a = $('<a class="remove"><i class="glyphicon glyphicon-remove"></i></a>');
    li.appendChild(a.get(0));

    this.guestsUl.append(li);
  }
};
