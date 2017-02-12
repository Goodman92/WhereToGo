import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { MapComponent } from "../map/map";
import { Ionic2Rating } from 'ionic2-rating';
import { PlacesService } from '../../providers/places-service/places-service';
import { DetailsModel } from "./details.model";

@Component({
    templateUrl: 'item-details.html',
    selector: 'item-details',
    providers: [PlacesService]
})
export class ItemDetailsPage {
    @ViewChild(MapComponent) mapReference;
    selectedItem: any;
    details: DetailsModel;
    icons: string;
    location: string;

    constructor(public navCtrl: NavController, navParams: NavParams, private platform: Platform, public placesService: PlacesService) {
        this.location = navParams.get('location') || undefined;
        this.selectedItem = navParams.get('item') || 'undefined';
        let distance = this.placesService.getDistance(this.location, this.selectedItem.geometry.location).toFixed(2);
        this.icons = "map";
        this.details = new DetailsModel(false, this.selectedItem.rating, distance);
    }

    showtimes(event, times) {
        this.details.openings = !times;
    }

    mapIsReadyEventHandler(event) {
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
