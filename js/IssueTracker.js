function IssueTracker() {
  this.issues = [];
}

IssueTracker.prototype = {
  add: function (issue) {
    this.issues.push(issue);
  },
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
