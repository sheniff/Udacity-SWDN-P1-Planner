function DateRange(startId, endId) {
  if(!startId || !endId) {
    return console.error('No IDs provided for start or end date fields!');
  }

  // DOM
  this.startDate = document.querySelector(startId);
  this.endDate = document.querySelector(endId);
}

DateRange.prototype.enable = function() {
  var now = new Date(),
      formatDate = function(d) {
        return new Date(d).toISOString().slice(0, -8)
      },
      minDate = formatDate(now.getTime() - now.getTimezoneOffset() * 60000);

  this.startDate.min = minDate;
  this.startDate.value = minDate;
  this.endDate.min = minDate;
  this.endDate.value = formatDate(new Date(minDate).getTime() + 3600000);

  this.startDate.addEventListener('change', function(event) {
    this.endDate.value = formatDate(new Date(event.target.value).getTime() + 3600000);
  }.bind(this));
};
