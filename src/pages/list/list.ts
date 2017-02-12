import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { PlacesService } from '../../providers/places-service/places-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MapComponent } from '../map/map';
import { LocationModel } from "../home/geo.model";
import _ from 'underscore';

@Component({
    templateUrl: 'list.html',
    selector: 'list-page',
    providers: [PlacesService]
})
export class ListPage {
    selectedType: any;
    places: any;
    information: string;
    radius: any;
    location: LocationModel
    loading: LoadingController;

    @ViewChild(MapComponent) mapReference;

    constructor(public navCtrl: NavController, navParams: NavParams, public placesService: PlacesService, loadCtrl: LoadingController) {
        this.loading = loadCtrl;
        this.location = navParams.get('location');
        this.selectedType = navParams.get('type');
        this.radius = navParams.get('rad') * 1000;
        this.information = "list";
        this.loadPlaces(this.selectedType.type);

    }

    ionViewWillEnter() {
        this.mapVisibility(true);
    }

    ionViewWillLeave() {
        this.mapVisibility(false);
    }

    mapVisibility(trigger) {
        if (this.mapReference) {
            this.mapReference.setMapVisibility(trigger);
        }
    }

    itemTapped(event, item) {
        this.placeSelected(item.place_id);
    }


    placeSelected(placeId) {
        let load = this.loading.create({
            content: "Getting your location...",
            dismissOnPageChange: true
        });
        load.present();
        this.placesService.loadDetails(placeId)
            .then(data => {
                this.navCtrl.push(ItemDetailsPage, {
                    item: data,
                    location: this.location
                });
            });

    }

    mapIsReadyEventHandler(event) {
        for (var place in this.places) {
            this.mapReference.setMarker(this.places[place].geometry.location, this.places[place].name, this.places[place].place_id, (id) => {
                this.placeSelected(id);
            });
        }
        this.mapReference.moveMapPosition(this.location.lat, this.location.lon)
    }

    loadPlaces(placeType) {
        let load = this.loading.create({
            content: "Loading places..."
        });
        load.present();
        this.placesService.load(placeType, this.location.string, this.radius)
            .then(data => {
                load.dismiss().then(() => {
                    this.places = data;
                    this.setDistances();
                });
            });
    }

    setDistances() {
        for (var place in this.places) {
            this.places[place].distance = this.placesService.getDistance(this.location, this.places[place].geometry.location).toFixed(2);
        }
        this.places = this.places.sort((a, b) => {
            return a.distance - b.distance
        });
    }

}
