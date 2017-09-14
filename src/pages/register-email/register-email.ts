import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { RegistrationService } from '../../providers/user/registration-service';

@IonicPage()
@Component({
  selector: 'page-register-email',
  templateUrl: 'register-email.html',
})
export class RegisterEmailPage {
	loading: Loading;
	registerCredentials = {email: '', password: '', confirm_password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private registerService: RegistrationService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public register() {
    this.showLoading()
    this.registerService.register(this.registerCredentials).subscribe(res => {
      if (res[0]) {
        setTimeout(() => {
          this.showMessage(res[1]);
          this.navCtrl.setRoot('LoginPage')
        });
      } else {
        this.showMessage(res[1]);
      }
    },
    error => {
      this.showMessage(error);
    });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showMessage(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Processing',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
