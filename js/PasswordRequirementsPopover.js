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
    var invalidPassword = this.validateRequirements(this.passwordInput.val());
    this.printRequirements();
    this.popover.popover('show');
    this.passwordInput.get(0).setCustomValidity(invalidPassword ? 'Invalid password. Follow the tips above.' : '');
  }.bind(this));
};

/*
* @description Scans requirements for given password
* @param {string} password - string to validate against a stablished list of criteria
*/
PasswordRequirementsPopover.prototype.validateRequirements = function(password) {
  var isInvalid = false,
    req = this.requirements;

  isInvalid = (req[0].valid = password.length >= 8 && password.length <= 100) || isInvalid;
  isInvalid = (req[1].valid = !!password.match(/[a-z]/g)) || isInvalid;
  isInvalid = (req[2].valid = !!password.match(/[A-Z]/g)) || isInvalid;
  isInvalid = (req[3].valid = !!password.match(/\d/g)) || isInvalid;
  isInvalid = (req[4].valid = !!password.match(/[\!\@\#\$\%\^\&\*]/g)) || isInvalid;

  return isInvalid;
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
