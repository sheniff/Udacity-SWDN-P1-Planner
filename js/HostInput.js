/**
* @description Allows event host to be populated from list of existing users or using current user
* @constructor
* @param {String} DOM id for parent tag that groups all host HTML
*/
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

/*
* @description Enables component functionality
*/
HostInput.prototype.enable = function() {
  this.enableClickToChooseMyself();
  this.populateDatalist();
};

/*
* @description Allows user to choose him/herself just by clicking a button
*/
HostInput.prototype.enableClickToChooseMyself = function() {
  this.myselfButton.off().on('click', function() {
    this.input.val(this.me.email);
  }.bind(this));
};

/*
* @description Populates datalist of suggested hosts for event based on current platform users
*/
HostInput.prototype.populateDatalist = function() {
  this.datalist.empty();

  for (var user in this.usersList) {
    var option = document.createElement('option');
    option.value = user;
    this.datalist.append(option);
  }
};
