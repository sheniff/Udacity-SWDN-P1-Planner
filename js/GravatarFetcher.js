// Requires md5.js

function GravatarFetcher(emailField) {
  if(!emailField) {
    return window.console.error('No email field provided!');
  }

  this.email = emailField;
}

GravatarFetcher.prototype.attachTo = function(img) {
  if(!img) return window.console.error('No img object given to attach gravatar!');

  this.img = img;

  this.email.addEventListener('blur', function() {

    if(this.email.checkValidity()) {
      this.showGravatar(this.email.value, this.img);
    }

  }.bind(this));
};

GravatarFetcher.prototype.showGravatar = function(email, imgHook) {

  var hash = window.MD5(email);
  window.console.log('hash!', hash, email);
  imgHook.src = 'http://www.gravatar.com/avatar/' + hash + '?s=300';

};
