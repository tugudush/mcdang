import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVars } from '../globalVars';

export class User {
  email: string;
  firstname: string;
  lastname: string;
  middlename: string;
  contact_number: string;
 
  constructor(email: string, firstname: string, lastname: string, middlename: string, contact_number: string) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.middlename = middlename;
    this.contact_number = contact_number;
  }
}

@Injectable()
export class AuthService {
	currentUser: User;
  res: any[];

  constructor(public http: Http, public globalVars: GlobalVars) {

  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let headers = new Headers({
					'Content-Type': 'application/x-www-form-urlencoded',
				});
				let options = new RequestOptions({
					headers: headers
				});
				// TODO: Encode the values using encodeURIComponent().
				let body = 'email=' + credentials.email + '&password=' + credentials.password;
				
        this.http
        .post(this.globalVars.getServerUrl() + 'users/login', body, options)
        .map(res => res.json())
        .subscribe(
            result => {
              if(result.is_success) {
                let access = true;
                this.currentUser = new User(
                  result.data.email,
                  result.data.firstname,
                  result.data.lastname,
                  result.data.middlename,
                  result.data.contact_number
                );
                observer.next(access);
                observer.complete();
              }else{

                let access = false;
                observer.next(access);
                observer.complete();
              }
            },
            err => {
              console.log("ERROR!: ", err);
              let access = false;
              observer.next(access);
              observer.complete();
            }
        );
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
