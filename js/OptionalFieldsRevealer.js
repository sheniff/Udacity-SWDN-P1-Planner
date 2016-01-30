/**
* @description Expands optional fields block in sign up form when focusing a field or clicking the area
* @constructor
* @param {DOM Element} block - collapsed area to show
*/
function OptionalFieldsRevealer(block) {
  if(!block) return;

  this.collapsible = block;
  this.actionable = block.querySelector('input'); // first input
}

/*
* @description Allows optional block to expand when focus or click the area
*/
OptionalFieldsRevealer.prototype.enable = function() {
  this.actionable.addEventListener('focus', function() {
    this.collapsible.classList.remove('collapsed');
  }.bind(this));

  // focus the field when clicking the block
  this.collapsible.addEventListener('click', function() {
    if(this.collapsible.classList.contains('collapsed')) {
      this.actionable.focus();
    }
  }.bind(this));
};
