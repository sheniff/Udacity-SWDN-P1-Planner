/**
* @description Prints progress bar based on number of required fields in form that are valid already.
* @constructor
* @param {DOM Element} progressBar - DOM element to display progress
* @param {DOM Element} form - Form where to look for required fields
* @param {Boolean} disableSubmit - if true, disables submit button until progress is 100% (all validations met)
*/
function ProgressTracker(progressBar, form, disableSubmit) {
  if(!progressBar) {
    return window.console.error('No progressBar provided!');
  }

  if(!form) {
    return window.console.error('No form provided!');
  }

  this.progressBar = progressBar;
  this.requiredFields = form.querySelectorAll('input[required]');
  this.validFields = [];
  this.submit = form.querySelector('[type="submit"]');
  this.disableSubmit = disableSubmit; // when not ready
}

/*
* @description Enable every required field to notify when it changes.
*               Add/Remove it from the list of valid fields to update progress bar.
*/
ProgressTracker.prototype.enable = function() {

  for (var i = 0; i < this.requiredFields.length; i++) {
    var field = this.requiredFields[i];

    field.addEventListener('keyup', function(event) {
      this.updateTracker(event.target);
    }.bind(this));
  }

  this.updateProgressBar();
};

/*
* @description Adds field to list of valid fields (should it wasn't there already)
* @param {DOM Element} field - Valid field
*/
ProgressTracker.prototype.addValidField = function(field) {

  if(this.validFields.indexOf(field) < 0) {
    this.validFields.push(field);
  }

  return this;
};

/*
* @description Removes field from list of valid fields
* @param {DOM Element} field - Invalid field
*/
ProgressTracker.prototype.removeValidField = function(field) {

  if(this.validFields.indexOf(field) > -1) {
    this.validFields.splice(this.validFields.indexOf(field), 1);
  }

  return this;
};

/*
* @description Updates progress bar value based on number of valid fields vs total number of required fields.
*               If disableSubmit is enabled, will enable/disable submit action depending of progress.
*/
ProgressTracker.prototype.updateProgressBar = function() {
  this.progressBar.max = this.requiredFields.length;
  this.progressBar.value = this.validFields.length;

  if(this.disableSubmit) {
    if(this.progressBar.value === this.progressBar.max) {
      this.submit.removeAttribute('disabled');
    } else {
      this.submit.setAttribute('disabled', 'disabled');
    }
  }

  return this;
};

/*
* @description Adds/removes field from list of valid fields depending on its current validity
* @param {DOM Element} field - Field to check validity
*/
ProgressTracker.prototype.updateTracker = function(field) {
  if(field.checkValidity()) {
    this.addValidField(field);
  } else {
    this.removeValidField(field);
  }

  this.updateProgressBar();

  return this;
};
