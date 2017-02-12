import { Component } from '@angular/core';
import { PLACE_TYPES } from '../../services/mock.service';
import { NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';
import { OnInit } from '@angular/core';
import { ListPage } from '../list/list';
import { PlaceModel } from "./place.model";
import { LocationModel, GeoModel} from "./geo.model";
import { PopoverComponent } from "./popover/popover.component";

@Component({
    selector: 'home-component',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit {

    places: Array<PlaceModel>;
    radius: any;
    homeView: string;
    loading: LoadingController;

    constructor(public navCtrl: NavController, navParams: NavParams, private popoverCtrl: PopoverController, loadCtrl: LoadingController) {
        this.places = new Array<PlaceModel>();
        this.radius = 20;
        this.homeView = "homeButton"
        this.loading = loadCtrl;
    }

    initializeHomeView() {
        for(let entry of PLACE_TYPES) {
            let name = entry.type.replace('_', ' ');
            this.places.push(new PlaceModel(entry.type, name, entry.icon));
        }
    }

    typeTapped(event, type) {
        let load = this.loading.create({
            content: "Getting your location...",
            dismissOnPageChange: true
        });
        load.present();
        Geolocation.getCurrentPosition().then((resp) => {
            let str = resp.coords.latitude + "," + resp.coords.longitude;
            let location = new LocationModel(str, resp.coords.latitude, resp.coords.longitude);
            let geo = new GeoModel(this.radius, type, location);
            this.navCtrl.push(ListPage, geo);

        }).catch((error) => {
            console.log(error);
            load.dismiss();
            Diagnostic.isLocationAvailable()
            .then((enabled) => {
                if(!enabled){
                    alert("Please, turn on your GPS location");
                    Diagnostic.switchToLocationSettings();
                }
                else {
                    alert("Couldn't find your location!");
                }
            });      
        });


    }

    getItems(ev: any) {
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.places = this.places.filter((item) => {
                console.log(item);
                return (item.getType().toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverComponent, {
            distance: this.radius,
            cb: (_data) => {
                this.radius = JSON.stringify(_data);
            }
        });

        popover.present({
            ev: ev
        });

    }

    ngOnInit(): void {
        this.initializeHomeView();
    }

}
