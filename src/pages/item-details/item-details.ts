import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { MapComponent } from "../map/map";
import { Ionic2Rating } from 'ionic2-rating';
import { PlacesService } from '../../providers/places-service/places-service';

@Component({
    templateUrl: 'item-details.html',
    selector: 'item-details',
    providers: [PlacesService]
})
export class ItemDetailsPage {
    selectedItem: any;
    @ViewChild(MapComponent) mapReference;
    icons: string;
    public details: any;
    location: any;
    distance: any;
    weekday: any;
    showopeningtimes: boolean;
    rating: number;

    constructor(public navCtrl: NavController, navParams: NavParams, private platform: Platform, public placesService: PlacesService) {
        this.location = navParams.get('location') || undefined;
        this.selectedItem = navParams.get('item') || 'undefined';
        this.icons = "map";
        this.distance = this.placesService.getDistance(this.location, this.selectedItem.geometry.location).toFixed(2);
        this.weekday = new Date().getDay() - 1;
        this.showopeningtimes = false;
        this.rating = parseFloat(this.selectedItem.rating);
        console.log("details: constructor");
    }

    showtimes(event, times) {
        if (times == true)
            this.showopeningtimes = false;
        else
            this.showopeningtimes = true;
    }
    ionViewDidEnter() {
        console.log("details: ionViewDidEnter");
        if (this.mapReference) {
      //      this.mapReference.setMapVisibility(true);
        }
    }
    mapIsReadyEventHandler(event) {
        console.log("mapIsReadyEventHandler");
        this.mapReference.setMapVisibility(true);
        this.mapReference.setMarker(this.selectedItem.geometry.location, this.selectedItem.name);
        this.mapReference.moveMapPosition(this.selectedItem.geometry.location.lat, this.selectedItem.geometry.location.lng);
    }
    ionViewWillLeave() {
        if (this.mapReference) {
            this.mapReference.setMapVisibility(false);
        }
    }

}
