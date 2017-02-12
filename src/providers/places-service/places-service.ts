import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlacesService {

    placesURL: string;
    detailsURL: string;
    data: any;

    constructor(private http: Http) { }

    load(placeType, location, radius) {
        this.placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=" + radius + "&type=" + placeType + "&key=AIzaSyBcev7KMgZiqmuL3koQyXjOM8TyEvfp-8I";

        return new Promise(resolve => {
            this.http.get(this.placesURL)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data.results;
                    resolve(this.data);
                }, error => {
                    console.log(JSON.stringify(error.json()));
                });
        });
    }

    loadDetails(placeId) {
        this.detailsURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyBcev7KMgZiqmuL3koQyXjOM8TyEvfp-8I";

        return new Promise(resolve => {
            this.http.get(this.detailsURL)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data.result;
                    resolve(this.data);
                }, error => {
                    console.log(JSON.stringify(error.json()));
                });
        });
    }

    getDistance(origin, target): number {
        let radlat1 = Math.PI * origin.lat / 180;
        let radlat2 = Math.PI * (target.lat) / 180;
        let theta = origin.lon - (target.lng);
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515 * 1.609344;
        return dist;
    }

}

