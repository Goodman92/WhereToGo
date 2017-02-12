import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { HomePage } from '../pages/home/home';
import {PopoverComponent } from "../pages/home/popover/popover.component";
import { MapComponent } from '../pages/map/map';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    MyApp,
    ListPage,
    ItemDetailsPage,
    HomePage,
    MapComponent,
    PopoverComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
      Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ItemDetailsPage,
    HomePage,
    MapComponent,
    PopoverComponent
  ],
  providers: []
})
export class AppModule {}
