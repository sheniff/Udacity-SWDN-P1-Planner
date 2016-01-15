function OptionalFieldsRevealer(block) {
  if(!block) return;

  this.collapsible = block;
  this.actionable = block.querySelector('input'); // first input
}

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
