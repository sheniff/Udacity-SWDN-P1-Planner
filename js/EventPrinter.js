/**
* @description Print a list of events or default "No events" screen.
* @constructor
* @param {DOM Element} holder - Parent element where list of templates will be printed
* @param {DOM Element} eventTemplate - HTML template to be replicated and populated with every event's data.
* @param {DOM Element} noEventsTemplate - HTML template to show when there are no events to show.
*/
function EventPrinter(holder, eventTemplate, noEventsTemplate) {
  this.parent = holder;
  this.template = eventTemplate;
  this.noEventsTemplate = noEventsTemplate;
}

/**
* @description Prints a list of events after cleaning previous one
* @param {Array} List of event objects to print
*/
EventPrinter.prototype.printEvents = function(events) {
  this.clearEventList();

  if (!(events instanceof Array) || !this.parent || !this.template) {
    return;
  }

  if (!events.length) {
    return this.printNoEvents();
  }

  for (var i = 0; i < events.length; i++) {
    this.printEvent(events[i]);
  }
};

/**
* @description Prints one given event and appends it to the list of events to show
* @param {Object} Event data to display
*/
EventPrinter.prototype.printEvent = function(evt) {
  if (!(evt instanceof Object) || !this.parent || !this.template) {
    return;
  }

  var card = document.createElement('div');
  card.innerHTML = this.template.text;

  this.populate(card, evt);

  this.parent.appendChild(card);
};

/**
* @description Prints default template indicating there are no events to show
*/
EventPrinter.prototype.printNoEvents = function() {
  if (this.noEventsTemplate && this.parent) {
    this.parent.innerHTML = this.noEventsTemplate.text;
  }
};

/**
* @description Cleans up event list
*/
EventPrinter.prototype.clearEventList = function() {
  if(this.parent) {
    this.parent.innerHTML = '';
  }
};

/**
* @description Write all event's data into a given template instance
* @param {DOM Object} Template instance to print event data in
* @param {Object} Event data to display
*/
EventPrinter.prototype.populate = function(card, data) {
  if(card && data instanceof Object) {

    for (var attr in data) if (data.hasOwnProperty(attr)) {
      var tags = card.querySelectorAll( '.' + attr );

      for (var i = 0; i < tags.length; i++) {
        var d = data[attr];

        if(d instanceof Array) {
          d = d.join(', ');
        }

        if(tags[i].dataset && tags[i].dataset.type === 'date') {
          d = new Date(d).toLocaleString();
        }

        tags[i].innerHTML = d;
      }
    }

  }
};
