/**
* @description Shows/hides password by clicking a button next to password input
* @constructor
* @param {DOM Element} wrapper - Element wrapping password input and button used to toggle password visibility.
                                  Input has to be of type password and button must include class "btn".
*/
function PasswordRevealer(wrapper) {
  this.password = wrapper.querySelector('[type="password"]');
  this.button = wrapper.querySelector('.btn');
}

/*
* @description Enables ability to show/hide password click in the button
*/
PasswordRevealer.prototype.enableToggle = function() {
  this.button.addEventListener('click', function() {

    var icon = this.button.querySelector('i');

    icon.classList.toggle('glyphicon-eye-open');
    icon.classList.toggle('glyphicon-eye-close');

    this.password.type = this.password.type === 'password' ? 'text' : 'password';

  }.bind(this));
};
