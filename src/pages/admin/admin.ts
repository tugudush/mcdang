import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { TabsPage } from '../tabs/tabs';
//import { VideoPage } from '../video/video';
//import { InstructionsPage } from '../instructions/instructions';
//import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  returnHome() {
    this.navCtrl.setRoot('TabsPage');
  }

  goToVideoPage(){
    this.navCtrl.setRoot('VideoPage');
  }

  goToInstructionsPage(){
    this.navCtrl.setRoot('InstructionsPage');
  }
  goToRecipePage(){
    this.navCtrl.setRoot('RecipePage');
  }

}
