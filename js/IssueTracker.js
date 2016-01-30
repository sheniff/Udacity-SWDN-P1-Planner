/**
* @description Model to store list of issues and return all of them as a long formatted string
* @constructor
*/
function IssueTracker() {
  this.issues = [];
}

IssueTracker.prototype = {
  /*
  * @description Add an issue to tracker
  * @param {string} issue - error string to store
  */
  add: function (issue) {
    this.issues.push(issue);
  },

  /*
  * @description Returns a string with errors to solve
  * @returns {string} Message to show or empty string if no errors
  */
  retrieve: function () {
    var message = '';
    switch (this.issues.length) {
    case 0:
      // do nothing because message is already ""
      break;
    case 1:
      message = 'Please correct the following issue:\n' + this.issues[0];
      break;
    default:
      message = 'Please correct the following issues:\n' + this.issues.join('\n');
      break;
    }
    return message;
  }
};
