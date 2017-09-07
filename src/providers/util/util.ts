import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilProvider {

  constructor(public http: Http) {
    console.log('Hello UtilProvider Provider');
  }

  displayAlert(ctrl: AlertController, thisTitle: string, mess: string){
    let alert = ctrl.create({
      title: thisTitle,
      message: mess,
      buttons: [{
        text: 'OK',
        handler: data => {
          console.log('ok clicked');
        }
      }]
    });
    alert.present();
  }

  public displayToast(ctrl: ToastController, mess: string, duration_ms: number) {
    let toast = ctrl.create({
      message: mess,
      duration: duration_ms,
      position: 'bottom'
    });
    toast.present();
  }

}
