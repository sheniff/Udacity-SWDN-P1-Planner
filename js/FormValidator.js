function FormValidator (form) {
  if (!form) return;

  this.passwordInput = form.querySelector('input[type="password"]');
  this.requiredFields = form.querySelectorAll('input[required]');
  this.submit = form.querySelector('[type="submit"]');
}

FormValidator.prototype.validateOnChange = function() {

  for (var i = 0; i < this.requiredFields.length; i++) {
    var field = this.requiredFields[i];

    field.addEventListener('keyup', function(event) {
      this.parentNode.classList[event.target.validity.valid ? 'add' : 'remove']('valid');
    }.bind(field));
  }

};

FormValidator.prototype.enablePasswordValidation = function() {
  var validatePassword = function () {

    var pass = this.passwordInput.value;
    var issuesTracker = new window.IssueTracker();

    // check requirements are met for pass
    this.checkRequirements(pass, issuesTracker);

    // set validity for password input
    this.passwordInput.setCustomValidity(issuesTracker.retrieve());
  }.bind(this);

  // enable when clicking submit
  this.submit.addEventListener('click', validatePassword);
  this.passwordInput.addEventListener('keyup', validatePassword);
};

/*
This steps through all of the requirements and adds messages when a requirement fails.
Just checks the first password because the second should be the same when it runs.
 */
FormValidator.prototype.checkRequirements = function(password, tracker) {
  if (password.length < 8) {
    tracker.add('fewer than 8 characters');
  } else if (password.length > 100) {
    tracker.add('greater than 100 characters');
  }

  if (!password.match(/[\!\@\#\$\%\^\&\*]/g)) {
    tracker.add('missing a symbol (!, @, #, $, %, ^, &, *)');
  }

  if (!password.match(/\d/g)) {
    tracker.add('missing a number');
  }

  if (!password.match(/[a-z]/g)) {
    tracker.add('missing a lowercase letter');
  }

  if (!password.match(/[A-Z]/g)) {
    tracker.add('missing an uppercase letter');
  }

  var illegalCharacterGroup = password.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
  if (illegalCharacterGroup) {
    illegalCharacterGroup.forEach(function (illegalChar) {
      tracker.add('includes illegal character: ' + illegalChar);
    });
  }
};
