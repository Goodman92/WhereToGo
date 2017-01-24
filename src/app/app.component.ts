import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { MapComponent } from '../pages/map/map';

@Component({
  template: `
<ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>`
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.pages = [
      { title: 'Hello Ionic', component: HomePage },
      { title: 'sataana', component: ListPage },
      { title: 'jee', component: ItemDetailsPage },
      { title: 'perkele', component: MapComponent }
    ];
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}
