function OptionalFieldsRevealer(block) {
  if(!block) return;

  this.collapsible = block;
  this.actionable = block.querySelector('input'); // first input
}

OptionalFieldsRevealer.prototype.enable = function() {
  this.actionable.addEventListener('focus', function() {
    this.collapsible.classList.remove('collapsed');
  }.bind(this));
};
