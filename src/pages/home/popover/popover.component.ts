import { Component } from '@angular/core';
import { NavParams} from 'ionic-angular';

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
export class PopoverComponent {
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
        this.callback(this.distance);
    }
}