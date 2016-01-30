/**
* @description Prepopulates form's username field with email's user
* @constructor
* @param {DOM Element} form - Form DOM where email input and username input fields should be
*/
function NamePrepopulator(form) {
  if(!form) {
    return window.console.error('No form provided!');
  }

  this.email = form.querySelector('[type="email"]');
  this.name = form.querySelector('input#inputName');
}

/*
* @description Adds event listener to auto populate username when email field is left
*/
NamePrepopulator.prototype.enable = function() {
  this.email.addEventListener('blur', function() {

    if(this.email.checkValidity() && !this.name.value.length) {
      this.name.value = this.email.value.split('@')[0];

      // trigger name checker to verify proper name
      if ('createEvent' in document) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        this.name.dispatchEvent(evt);
      }
      else this.name.fireEvent('onkeyup');
    }

  }.bind(this));
};
