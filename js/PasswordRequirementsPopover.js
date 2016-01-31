/**
* @description Displays a floating popover over password field to help with validation
* @constructor
* @param {DOM Element} popover - Element where popover will be attached to
* @param {DOM Element} passwordInput - Input field for password
*/
function PasswordRequirementsPopover (popover, passwordInput) {
  if (!popover || !passwordInput) return;

  this.passwordInput = window.$(passwordInput);
  this.popover = window.$(popover);

  this.requirements = [
    { text: '8 - 100 characters long', valid: false },
    { text: 'Include lowercase characters', valid: false },
    { text: 'Include uppercase characters', valid: false },
    { text: 'Include a number', valid: false },
    { text: 'Include (!, @, #, $, %, ^, &, *)', valid: false }
  ];
}

/*
* @description Enables popover, validates requirement and updates them on key strokes
*/
PasswordRequirementsPopover.prototype.enable = function() {
  // enable popover
  this.popover.popover();

  // validate requirements
  this.validateRequirements(this.passwordInput.val());

  // printRequirements
  this.printRequirements();

  // watch changes to reprint
  this.passwordInput.on('keyup', function() {
    var validPassword = this.validateRequirements(this.passwordInput.val());
    this.printRequirements();
    this.popover.popover('show');
    this.passwordInput.get(0).setCustomValidity(validPassword ? '' : 'Invalid password. Follow the tips above.');
  }.bind(this));
};

/*
* @description Scans requirements for given password
* @param {string} password - string to validate against a stablished list of criteria
* @returns {boolean} True if all requirements are met
*/
PasswordRequirementsPopover.prototype.validateRequirements = function(password) {
  this.requirements[0].valid = password.length >= 8 && password.length <= 100;
  this.requirements[1].valid = !!password.match(/[a-z]/g);
  this.requirements[2].valid = !!password.match(/[A-Z]/g);
  this.requirements[3].valid = !!password.match(/\d/g);
  this.requirements[4].valid = !!password.match(/[\!\@\#\$\%\^\&\*]/g);

  return this.requirements.reduce(function(t, e) { return t && e.valid; }, true);
};

/*
* @description Prints all requirements as an HTML list to display in popover along with a check if it was met or not
*/
PasswordRequirementsPopover.prototype.printRequirements = function() {
  var str = '<ul class="list-unstyled">';

  for (var i in this.requirements) if (this.requirements.hasOwnProperty(i)) {
    var r = this.requirements[i];
    var icon = '<i class="text-' + (r.valid ? 'success' : 'danger') + ' glyphicon glyphicon-' + (r.valid ? 'ok' : 'remove') + '"></i>';
    str += '<li>' + icon + ' ' + r.text + '</li>';
  }

  str += '</ul>';

  this.popover.attr('data-content', str);
};
