function LocationInput(inputId) {
  if(!inputId) {
    return window.console.error('No ID for input where to place location!');
  }

  // DOM
  this.input = window.$(inputId);
  this.datalist = this.input.next('datalist');
}

LocationInput.prototype.enable = function() {
  if(window.google && window.google.maps && window.google.maps.places) {
    this.printList(['Finding places nearby...']);
    window.google.maps.event.addDomListener(window, 'load', this.initGooglePlaces.bind(this));
  }
};

LocationInput.prototype.updateLocationList = function(position) {
  var printResults = function(results, status) {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      this.printList(results.map(function(r) { return r.name; }));
    } else {
      this.printList(['No suggestions found']);
    }
  };

  this.googlePlaces.nearbySearch(
    {
      location: new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      radius: '500'
    },
    printResults.bind(this)
  );

  this.printList(['Finding places...']);
};

LocationInput.prototype.getLocation = function(cb, errCb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb, errCb);
  } else {
    window.console.log('WARNING: Geolocation not supported by this browser...');
  }
};

LocationInput.prototype.printList = function(places) {
  this.datalist.empty();

  if (places instanceof Array) {
    for (var p in places) {
      var option = document.createElement('option');
      option.value = places[p];
      this.datalist.append(option);
    }
  }
};

LocationInput.prototype.initGooglePlaces = function() {
  this.googlePlaces = new window.google.maps.places.PlacesService(new window.google.maps.Map(document.getElementById('map')));

  // prepare input to request current locations when focus
  this.input.off().on('focus', function() {
    this.getLocation(this.updateLocationList.bind(this));
  }.bind(this));
};
