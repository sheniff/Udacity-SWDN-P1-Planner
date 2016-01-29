function HostInput(groupId) {
  if(!groupId) {
    return window.console.error('No ID for group where host input is has been provided!');
  }

  // DOM
  this.group = window.$(groupId);
  this.myselfButton = this.group.find('.choose-myself');
  this.input = this.group.find('input');
  this.datalist = this.group.find('datalist');

  // Data
  this.dataStore = new window.DataStore();
  this.usersList = this.dataStore.getUsers();
  this.me = this.dataStore.userInfo();
}

HostInput.prototype.enable = function() {
  this.enableClickToChooseMyself();
  this.populateDatalist();
};

HostInput.prototype.enableClickToChooseMyself = function() {
  this.myselfButton.off().on('click', function() {
    this.input.val(this.me.email);
  }.bind(this));
};

HostInput.prototype.populateDatalist = function() {
  this.datalist.empty();

  for (var user in this.usersList) {
    var option = document.createElement('option');
    option.value = user;
    this.datalist.append(option);
  }
};
