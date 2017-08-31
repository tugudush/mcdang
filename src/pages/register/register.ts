import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { LoginPage } from '../login/login';
import { RegisterEmailPage } from '../register-email/register-email';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  openLoginPage() {
	this.navCtrl.push(LoginPage);
  }

  openRegisterEmailPage() {
	this.navCtrl.push(RegisterEmailPage);
  }

}
