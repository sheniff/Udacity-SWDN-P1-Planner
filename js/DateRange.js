/**
* @description Takes 2 date inputs (start and end) and initializes them to convenient values for user (now).
*               It also makes endDate to automatically take startDate + 1 hour.
* @constructor
* @param {string} startId - DOM id for startDate input field
* @param {string} endId - DOM id for endDate input field
*/
function DateRange(startId, endId) {
  if(!startId || !endId) {
    return window.console.error('No IDs provided for start or end date fields!');
  }

  // DOM
  this.startDate = document.querySelector(startId);
  this.endDate = document.querySelector(endId);
}

/**
* @description Enables DateRange by initializing default dates. It updates "endDate" to just one hour later than "startDate" by default.
*/
DateRange.prototype.enable = function() {
  var now = new Date(),
    formatDate = function(d) {
      return new Date(d).toISOString().slice(0, -8);
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
