import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { HomePage, PopoverPage } from '../pages/home/home';
import { MapComponent } from '../pages/map/map';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    MyApp,
    ListPage,
    ItemDetailsPage,
    HomePage,
    MapComponent,
    PopoverPage
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
    MapComponent,PopoverPage
  ],
  providers: []
})
export class AppModule {}
