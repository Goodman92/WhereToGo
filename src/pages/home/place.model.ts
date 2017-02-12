export class PlaceModel {

    constructor(private type: string, private name: string, private icon: string) { }

    public getType() {
        return this.type;
    }
}
