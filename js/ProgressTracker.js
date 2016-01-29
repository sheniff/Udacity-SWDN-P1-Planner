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
Enable every required field to notify when it changes.
Add/Remove it from the list of valid fields to update progress bar.
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

ProgressTracker.prototype.addValidField = function(field) {

  if(this.validFields.indexOf(field) < 0) {
    this.validFields.push(field);
  }

  return this;
};

ProgressTracker.prototype.removeValidField = function(field) {

  if(this.validFields.indexOf(field) > -1) {
    this.validFields.splice(this.validFields.indexOf(field), 1);
  }

  return this;
};

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

ProgressTracker.prototype.updateTracker = function(field) {
  if(field.checkValidity()) {
    this.addValidField(field);
  } else {
    this.removeValidField(field);
  }

  this.updateProgressBar();

  return this;
};
