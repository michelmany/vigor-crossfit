function initMap() {
  var marker;
  var activeMarker;

  var infowindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(265, 150),
  });

  var iconDefault = {
    url: "/wp-content/themes/vigor-crossfit/src/images/Pin@2x.png",
    scaledSize: new google.maps.Size(81, 75),
  };
  var iconSelected = {
    url: "/wp-content/themes/vigor-crossfit/src/images/Selected@2x.png",
    scaledSize: new google.maps.Size(81, 75),
  };

  var locations = [
    {
      title: "Vigor XF in Financial District",
      lat: 37.794334,
      lng: -122.40023,
      address: {
        address: "4046 Balboa St",
        city: "San Francisco",
        postcode: "CA 94121",
        country: "USA",
      },
    },
    {
      title: "Vigor XF in Lower Haight",
      lat: 37.771414,
      lng: -122.428655,
      address: {
        address: "4046 Balboa St",
        city: "San Francisco",
        postcode: "CA 94121",
        country: "USA",
      },
    },
    {
      title: "Vigor XF in Outer Richmond",
      lat: 37.7759918,
      lng: -122.4945536,
      address: {
        address: "4046 Balboa St",
        city: "San Francisco",
        postcode: "CA 94121",
        country: "USA",
      },
    },
  ];

  var mapOptions = {
    center: { lat: 37.7873489, lng: -122.4501188 },
    zoom: 14,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  var googlemap = new google.maps.Map(document.getElementById("map"), mapOptions);

  for (var i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      map: googlemap,
      icon: iconDefault,
      title: locations[i].title,
      address: locations[i].address,
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          var html =
            '<div class="info-window">' +
            '<h3 class="info-window__title">' +
            marker.title +
            "</h3>" +
            '<div class="info-window__body">' +
            "<p>" +
            marker.address.address +
            ", " +
            marker.address.city +
            ",<br /> " +
            marker.address.postcode +
            ", " +
            marker.address.country +
            "</p>" +
            '<div class="info-window__gallery">' +
            '<div class="info-window__gallery-item">Item 03</div>' +
            "</div>" +
            "</div>" +
            "</div>";

          infowindow.setContent(html);
          infowindow.open(map, marker);

          // check to see if activeMarker is set
          // if so, set the icon back to the default
          activeMarker && activeMarker.setIcon(iconDefault);

          // set the icon for the clicked marker
          marker.setIcon(iconSelected);

          // update the value of activeMarker
          activeMarker = marker;
        };
      })(marker, i)
    );
  }
}
