import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public superTabsCtrl: SuperTabsController) {
    console.log("HomePage.constructor()");
  }
  ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
    //this.superTabsCtrl.setBadge('homeTab', 1);
    this.superTabsCtrl.showToolbar(false);
  }

}
