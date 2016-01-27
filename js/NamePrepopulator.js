function NamePrepopulator(form) {
  if(!form) {
    return console.error('No form provided!');
  }

  this.email = form.querySelector('[type="email"]');
  this.name = form.querySelector('input#inputName');
}

NamePrepopulator.prototype.enable = function() {
  this.email.addEventListener('blur', function() {

    if(this.email.checkValidity() && !this.name.value.length) {
      this.name.value = this.email.value.split('@')[0];
    }

  }.bind(this));
};
