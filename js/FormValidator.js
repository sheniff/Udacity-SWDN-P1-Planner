function FormValidator (form) {
  if (!form) return;

  this.emailInput = form.querySelector('input[type="email"]');
  this.passwordInput = form.querySelector('input[type="password"]');
  this.submit = form.querySelector('[type="submit"]');
};

// ToDo: Find a way to do this!!
// Investigate: How to show default validation messages when focus out/blur
// FormValidator.prototype.validateOnBlur = function() {
//   this.emailInput.addEventListener('blur', function(event) {

//     if(!event.target.validity.valid) {
//       this.submit.click();
//     }

//   }.bind(this));
// };

FormValidator.prototype.enablePasswordValidation = function() {
  var validatePassword = function () {

    var pass = this.passwordInput.value;
    var issuesTracker = new IssueTracker();

    // check requirements are met for pass
    this.checkRequirements(pass, issuesTracker);

    // set validity for password input
    this.passwordInput.setCustomValidity(issuesTracker.retrieve());
  }.bind(this);

  // enable when clicking submit
  this.submit.addEventListener('click', validatePassword);
  // this.passwordInput.addEventListener('blur', validatePassword);
};

/*
This steps through all of the requirements and adds messages when a requirement fails.
Just checks the first password because the second should be the same when it runs.
 */
FormValidator.prototype.checkRequirements = function(password, tracker) {
  if (password.length < 8) {
    tracker.add("fewer than 8 characters");
  } else if (password.length > 100) {
    tracker.add("greater than 100 characters");
  }

  if (!password.match(/[\!\@\#\$\%\^\&\*]/g)) {
    tracker.add("missing a symbol (!, @, #, $, %, ^, &, *)");
  }

  if (!password.match(/\d/g)) {
    tracker.add("missing a number");
  }

  if (!password.match(/[a-z]/g)) {
    tracker.add("missing a lowercase letter");
  }

  if (!password.match(/[A-Z]/g)) {
    tracker.add("missing an uppercase letter");
  }

  var illegalCharacterGroup = password.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)
  if (illegalCharacterGroup) {
    illegalCharacterGroup.forEach(function (illegalChar) {
      tracker.add("includes illegal character: " + illegalChar);
    });
  }
};
