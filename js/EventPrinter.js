function EventPrinter(holder, eventTemplate, noEventsTemplate) {
  this.parent = holder;
  this.template = eventTemplate;
  this.noEventsTemplate = noEventsTemplate;
}

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

EventPrinter.prototype.printEvent = function(evt) {
  if (!(evt instanceof Object) || !this.parent || !this.template) {
    return;
  }

  card = document.createElement('div');
  card.innerHTML = this.template.text;

  this.populate(card, evt);

  this.parent.appendChild(card);
};

EventPrinter.prototype.printNoEvents = function() {
  if (this.noEventsTemplate && this.parent) {
    this.parent.innerHTML = this.noEventsTemplate.text;
  }
};

EventPrinter.prototype.clearEventList = function() {
  if(this.parent) {
    this.parent.innerHTML = '';
  }
};

EventPrinter.prototype.populate = function(card, data) {
  if(card && data instanceof Object) {

    for (var attr in data) if (data.hasOwnProperty(attr)) {
      var tags = card.querySelectorAll( '.' + attr );

      for (var i = 0; i < tags.length; i++) {
        var d = data[attr];

        if(d instanceof Array) {
          d = data.join(', ');
        }

        if(tags[i].dataset && tags[i].dataset.type === 'date') {
          d = new Date(d).toLocaleString();
        }

        tags[i].innerHTML = d;
      }
    }

  }
};
