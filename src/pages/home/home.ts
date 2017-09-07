import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
//import { RecipePage } from '../recipe/recipe';
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public superTabsCtrl: SuperTabsController,
              public toastCtrl: ToastController,
              private util: UtilProvider) {
    console.log("HomePage.constructor()");
  }
  ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
    //this.superTabsCtrl.setBadge('homeTab', 1);
    this.superTabsCtrl.showToolbar(false);
  }

  slideTorecipe(recipeName: string){
    if(recipeName=="TaiOmelette"){
      // TODO: add Events to pass recipe to RecipePage
      this.superTabsCtrl.slideTo(1);
    }
    else{
      console.log("test");
      this.util.displayToast(this.toastCtrl,"Recipe not available yet!", 2000);
    }
  }
}
