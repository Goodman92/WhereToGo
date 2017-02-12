export class LocationModel {
    constructor(public string:string, public lat:number, public lon:number) { }
}

export class GeoModel {
    constructor(public rad:number, public type:string, public location:LocationModel) {

    }
}


