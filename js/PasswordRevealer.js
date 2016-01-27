function PasswordRevealer(wrapper) {
  this.password = wrapper.querySelector('[type="password"]');
  this.button = wrapper.querySelector('.btn');
}

PasswordRevealer.prototype.enableToggle = function() {
  this.button.addEventListener('click', function() {

    var icon = this.button.querySelector('i');

    icon.classList.toggle('glyphicon-eye-open');
    icon.classList.toggle('glyphicon-eye-close');

    this.password.type = this.password.type === 'password' ? 'text' : 'password';

  }.bind(this));
};
