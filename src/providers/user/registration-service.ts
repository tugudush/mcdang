import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVars } from '../globalVars';


@Injectable()
export class RegistrationService {
  res: any[];

  constructor(public http: Http, public globalVars: GlobalVars) {

  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.confirm_password === null) {
      return Observable.create(observer => {
        this.res = [false, 'Please fill up the required fields.'];
        observer.next(this.res);
        observer.complete();
      });
    } else if (credentials.password !== credentials.confirm_password) {
      return Observable.create(observer => {
        this.res = [false, 'Password does not match.'];
        observer.next(this.res);
        observer.complete();
      });
    }else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {

        let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
          headers: headers
        });
        // TODO: Encode the values using encodeURIComponent().
        let body = 'email=' + credentials.email 
          + '&password=' + credentials.password;
        
        this.http
        .post(this.globalVars.getServerUrl() + 'users/create', body, options)
        .map(res => res.json())
        .subscribe(
            result => {
              if(result.is_success) {
                this.res = [true, 'You have successfully created an account.'];
                observer.next(this.res);
                observer.complete();
              }else{
                this.res = [false, result.message];
                observer.next(this.res);
                observer.complete();
              }
            },
            err => {
              this.res = [false, 'Unable to register.'];
              observer.next(this.res);
              observer.complete();
            }
        );


      });
    }
  }


}
