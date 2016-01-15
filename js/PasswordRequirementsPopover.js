function PasswordRequirementsPopover (popover, passwordInput) {
  if (!popover || !passwordInput) return;

  this.passwordInput = $(passwordInput);
  this.popover = $(popover);

  this.requirements = [
    { text: '8 - 100 characters long', valid: false },
    { text: 'Include lowercase characters', valid: false },
    { text: 'Include uppercase characters', valid: false },
    { text: 'Include a number', valid: false },
    { text: 'Include (!, @, #, $, %, ^, &, *)', valid: false }
  ];
};

PasswordRequirementsPopover.prototype.enable = function() {
  // enable popover
  this.popover.popover();

  // validate requirements
  this.validateRequirements(this.passwordInput.val());

  // printRequirements
  this.printRequirements();

  // watch changes to reprint
  this.passwordInput.on('keyup', function(event) {
    this.validateRequirements(this.passwordInput.val());
    this.printRequirements();
    this.popover.popover('show');
  }.bind(this));
};

PasswordRequirementsPopover.prototype.validateRequirements = function(password) {

  this.requirements[0].valid = password.length >= 8 && password.length <= 100;
  this.requirements[1].valid = password.match(/[a-z]/g);
  this.requirements[2].valid = password.match(/[A-Z]/g);
  this.requirements[3].valid = password.match(/\d/g);
  this.requirements[4].valid = password.match(/[\!\@\#\$\%\^\&\*]/g);
};

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
