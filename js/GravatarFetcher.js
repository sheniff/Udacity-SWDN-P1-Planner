/**
* @description Detects changes on email input field and fetches correspoding avatar from Gravatar
* @constructor
* @requires md5.js (MD5 library)
* @param {DOM Element} Field to listen to for changes
*/
function GravatarFetcher(emailField) {
  if(!emailField) {
    return window.console.error('No email field provided!');
  }

  this.email = emailField;
}

/*
* @description Sets where to attach gravatar's fetched image
* @param {DOM Element} img - <img> tag where gravatar url will be attached to
*/
GravatarFetcher.prototype.attachTo = function(img) {
  if(!img) return window.console.error('No img object given to attach gravatar!');

  this.img = img;

  this.email.addEventListener('blur', function() {

    if(this.email.checkValidity()) {
      this.showGravatar(this.email.value, this.img);
    }

  }.bind(this));
};

/*
* @description Shows a gravatar picture based on given email and a img tag where to place it to
* @param {String} email - email address to use to fetch gravatar image
* @param {DOM Element} - <img> tag to place gravatar url
*/
GravatarFetcher.prototype.showGravatar = function(email, imgHook) {

  var hash = window.MD5(email);
  imgHook.src = 'http://www.gravatar.com/avatar/' + hash + '?s=300';

};
