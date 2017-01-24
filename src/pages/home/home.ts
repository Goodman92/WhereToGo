import { Component } from '@angular/core';
import { MenuService, PLACE_TYPES } from '../../services/mock.service';
import { NavController, NavParams, Platform, PopoverController, LoadingController } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';
import { OnInit } from '@angular/core';
import { ListPage } from '../list/list';

@Component({
    template: `
    <ion-item>
      <ion-range min="0" max="50" [(ngModel)]="distance" (click)="setDistance()">
        <ion-icon range-left small name="distance"></ion-icon>
        <ion-icon range-right name="distance"></ion-icon>
      </ion-range>
    </ion-item>
    <p style="padding-left:16px;"> Radius: {{this.distance}} km</p>
  `
})
export class PopoverPage {
    distance: number = 0;
    callback: any;
    constructor(private navParams: NavParams) {
        this.callback = this.navParams.get('cb');
    }


    ngOnInit() {
        if (this.navParams.data) {
            this.distance = this.navParams.data.distance;
        }
    }

    setDistance() {
        console.log(this.distance);
        this.callback(this.distance);
    }
}

@Component({
    selector: 'home-component',
    templateUrl: 'home.html',
    providers: [MenuService]
})

export class HomePage implements OnInit {

    places: Array<any>;
    placesOriginal: Array<any>;
    radius: any;
    homeView: string;
    location: {};
    loading: LoadingController;
    testi: any;

    constructor(private menuService: MenuService, public navCtrl: NavController, navParams: NavParams, private platform: Platform, private popoverCtrl: PopoverController, loadCtrl: LoadingController) {
        this.places = new Array();
        this.radius = 20;
        this.homeView = "homeButton"
        this.loading = loadCtrl;
        console.log(typeof (<any>window).Testi);
    }

    goCordova() {
        this.testi = new (<any>window).Testi();
        this.testi.doSomething("anttijee", () => {
            console.log("success");
        }, () => {
            console.log("error");
        });
    }

    initializeHomeView() {
        for (var i = 0; i < PLACE_TYPES.length; i++) {
            this.places.push({
                type: PLACE_TYPES[i].type,
                name: PLACE_TYPES[i].type.replace('_', ' '),
                icon: PLACE_TYPES[i].icon
            });
        }
        this.placesOriginal = this.places;
    }

    typeTapped(event, type) {
        let load = this.loading.create({
            content: "Getting your location...",
            dismissOnPageChange: true
        });
        load.present();
        Geolocation.getCurrentPosition().then((resp) => {
            this.location = {
                string: resp.coords.latitude + "," + resp.coords.longitude,
                lat: Number(resp.coords.latitude),
                lon: Number(resp.coords.longitude)
            };

            this.navCtrl.push(ListPage, {
                rad: this.radius,
                type: type,
                location: this.location
            });

        }).catch((error) => {
            console.log('Error getting location', error);
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
            }).catch((err) => {
                console.log("Diagnostic error", err);
            })        
        });


    }

    getItems(ev: any) {
        this.initializeItems();
        let val = ev.target.value;
        console.log(val);
        if (val && val.trim() != '') {
            this.places = this.places.filter((item) => {
                console.log(item);
                return (item.type.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    initializeItems(): void {
        this.places = this.placesOriginal;
    }

    presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverPage, {
            distance: this.radius,
            cb: (_data) => {
                this.radius = JSON.stringify(_data);
                console.log(this.radius);
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
