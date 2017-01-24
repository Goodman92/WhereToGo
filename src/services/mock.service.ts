import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http'

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

export const PLACE_TYPES:any = [
    {
        type: "accounting",
        icon: "fa-handshake-o"
    },
    {
        type: "airport",
        icon: "fa-plane"
    },
    {
        type: "amusement_park",
        icon: "fa-child"
    },
    {
        type: "aquarium",
        icon: "fa-paw"
    },
    {
        type: "art_gallery",
        icon: "fa-paint-brush"
    },
    {
        type: "atm",
        icon: "fa-money"
    },
    {
        type: "bakery",
        icon: "fa-bullseye"
    },
    {
        type: "bank",
        icon: "fa-university"
    },
    {
        type: "bar",
        icon: "fa-beer"
    },
    {
        type: "beauty_salon",
        icon: "fa-leaf"
    },
    {
        type: "bicycle_store",
        icon: "fa-bicycle"
    },
    {
        type: "book_store",
        icon: "fa-book"
    },
    {
        type: "bowling_alley",
        icon: "fa-bullseye"
    }, {
        type: "bus_station",
        icon: "fa-bus"
    }, {
        type: "cafe",
        icon: "fa-coffee"
    },
    {
        type: "campground",
        icon: "fa-free-code-camp"
    },
    {
        type: "car_dealer",
        icon: "fa-car"
    },
    {
        type: "car_rental",
        icon: "fa-car"
    }, {
        type: "car_repair",
        icon: "fa-car"
    }, {
        type: "car_wash",
        icon: "fa-car"
    }, {
        type: "casino",
        icon: "fa-dollar"
    },
    {
        type: "cemetery",
        icon: "fa-bullseye"
    },
    {
        type: "church",
        icon: "fa-bullseye"
    },
    {
        type: "city_hall",
        icon: "fa-shopping-cart"
    },
    {
        type: "clothing_store",
        icon: "fa-shopping-cart"
    },
    {
        type: "convenience_store",
        icon: "fa-bullseye"
    },
    {
        type: "courthouse",
        icon: "fa-university"
    },
    {
        type: "dentist",
        icon: "fa-bullseye"
    },
    {
        type: "department_store",
        icon: "fa-bullseye"
    },
    {
        type: "doctor",
        icon: "fa-hospital-o"
    },
    {
        type: "electrician",
        icon: "fa-bolt"
    },
    {
        type: "electronics_store",
        icon: "fa-bolt"
    },
    {
        type: "embassy",
        icon: "fa-university"
    }, {
        type: "fire_station",
        icon: "fa-fire-extinguisher"
    },
    {
        type: "florist",
        icon: "fa-leaf"
    },
    {
        type: "funeral_home",
        icon: "fa-bullseye"
    }, {
        type: "furniture_store",
        icon: "fa-shopping-cart"
    }, {
        type: "gas_station",
        icon: "fa-car"
    }, {
        type: "gym",
        icon: "fa-line-chart"
    },
    {
        type: "hair_care",
        icon: "fa-globe"
    },
    {
        type: "hardware_store",
        icon: "fa-shopping-cart"
    },
    {
        type: "hindu_temple",
        icon: "fa-globe"
    },
    {
        type: "home_goods_store",
        icon: "fa-leaf"
    }, {
        type: "hospital",
        icon: "fa-hospital-o"
    },
    {
        type: "insurance_agency",
        icon: "fa-heart-o"
    },
    {
        type: "jewelry_store",
        icon: "fa-globe"
    },
    {
        type: "laundry",
        icon: "fa-shower"
    },
    {
        type: "lawyer",
        icon: "fa-university"
    },
    {
        type: "library",
        icon: "fa-archive"
    }, {
        type: "liquor_store",
        icon: "fa-glass"
    }, {
        type: "local_government_office",
        icon: "fa-globe"
    }, {
        type: "locksmith",
        icon: "fa-lock"
    },
    {
        type: "lodging",
        icon: "fa-hotel"
    },
    {
        type: "meal_delivery",
        icon: "fa-cutlery"
    }, {
        type: "meal_takeaway",
        ïcon: "fa-cutlery"
    }, {
        type: "mosque",
        icon: "fa-globe"
    },
    {
        type: "movie_rental",
        icon: "fa-film"
    },
    {
        type: "movie_theater",
        icon: "fa-film"
    },
    {
        type: "moving_company",
        icon: "fa-film"
    }, {
        type: "museum",
        icon: "fa-university"
    },
    {
        type: "night_club",
        icon: "fa-glass"
    }, {
        type: "painter",
        icon: "fa-paint-brush"
    }, {
        type: "park",
        icon: "fa-car"
    }, {
        type: "parking",
        icon: "fa-car"
    }, {
        type: "pet_store",
        icon: "fa-bug"
    }, {
        type: "pharmacy",
        icon: "fa-medkit"
    }, {
        type: "physiotherapist",
        icon: "fa-heartbeat"
    }, {

        type: "plumber",
        icon: "fa-globe"
    }, {
        type: "police",
        icon: "fa-globe"
    }, {
        type: "post_office",
        icon: "fa-send-o"
    }, {
        type: "real_estate_agency",
        icon: "fa-handshake-o"
    }, {
        type: "restaurant",
        icon: "fa-glass"
    }, {
        type: "roofing_contractor",
        icon: "fa-snowflake-o"
    }, {
        type: "rv_park",
        icon: "fa-car"
    }, {
        type: "school",
        icon: "fa-child"
    }, {
        type: "shoe_store",
        icon: "fa-globe"
    }, {
        type: "shopping_mall",
        icon: "fa-shopping-cart"
    }, {
        type: "spa",
        icon: "fa-shower"
    }, {
        type: "stadium",
        icon: "soccer-ball-o"
    }, {
        type: "storage",
        icon: "fa-building-o"
    }, {
        type: "store",
        icon: "fa-building-o"
    }, {
        type: "subway_station",
        icon: "fa-subway"
    }, {
        type: "synagogue",
        icon: "fa-globe"
    }, {
        type: "taxi_stand",
        icon: "fa-taxi"
    }, {
        type: "train_station",
        icon: "fa-train"
    }, {
        type: "transit_station",
        icon: "fa-ship"
    }, {
        type: "travel_agency",
        icon: "fa-plane"
    }, {
        type: "university",
        icon: "fa-university"
    },
    {
        type: "veterinary_care",
        icon: "fa-globe"
    }, {type: "zoo", icon: "fa-globe"}
];
@Injectable()
export class MenuService {

    constructor(private http:Http) {
    }

    getPlaces():any {
        var forkArray = [];
        for (var i = 0; i < PLACE_TYPES.length; i++) {
            forkArray.push(this.http
                .get(this.parseUrl(PLACE_TYPES[i].type))
                .map(this.extractData));
        }

        return Observable.forkJoin(forkArray);
    }

    private parseUrl(type:string):string {
        //return "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=61.497452,23.766331&radius=3500&type=" + type + "&key=AIzaSyBcev7KMgZiqmuL3koQyXjOM8TyEvfp-8I";
        return "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=61.497452,23.766331&radius=3500&type=" + type + "&key=AIzaSyBD5vg-bVFxKjF9o4JE6_5olRnQFB9Xe1U";
    }

    extractData(res:Response) {
        console.log(res.json());
        return (res.json().results.length !== 0 ) ? res.json() : null;
    }

    handleError(error:Error | any) {
        console.log("virhe");
    }
}