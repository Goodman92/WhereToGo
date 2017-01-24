import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'map',
    templateUrl: 'map.html',
})
export class MapComponent {
    map: GoogleMap;
    @Input('id') idRef;
    @Output() mapIsReadyEvent = new EventEmitter();

    constructor(public navCtrl: NavController, public platform: Platform) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }

    public loadMap() {
        let location = new GoogleMapsLatLng(-34.9290, 138.6010);
        this.map = new GoogleMap(this.idRef, {
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                'myLocationButton': true, 'indoorPicker': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            }, 'camera': {
                'latLng': location,
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
            }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            let event = new CustomEvent("touch_start");
            document.dispatchEvent(event);
            this.mapIsReadyEvent.emit();
        },
            error => {
                console.log(error);
            });
    }

    public setMapVisibility(display) {
        if (typeof this.map.setVisible === 'function') {
            this.map.setVisible(display);
        }
    }

    public setMarker(coords, name, id, successCb) {
        let location: GoogleMapsLatLng = new GoogleMapsLatLng(coords.lat, coords.lng);
        let position: CameraPosition = {
            target: location,
            zoom: 18,
            tilt: 30
        };
        let markerOptions: GoogleMapsMarkerOptions = {
            position: location,
            title: name
        };
        this.map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
                marker.showInfoWindow();
                marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(
                    (data) => {
                        successCb(id);
                    }
                );
            });
    }

    public moveMapPosition(lat, lon) {
        let location: GoogleMapsLatLng = new GoogleMapsLatLng(lat, lon);
        let position: CameraPosition = {
            target: location,
            zoom: 15,
            tilt: 10
        };
        this.map.moveCamera(position);
    }

    public removeMap() {
        this.map.remove();
    }
}
