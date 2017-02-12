export class DetailsModel {
    private date: number;
    constructor(public openings: boolean, public rating: number, public distance: string) {
        this.date = this.parseDate();
     }

    private parseDate() {
        return new Date().getDay() - 1;
    }
}

