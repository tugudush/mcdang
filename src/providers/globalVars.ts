import { Injectable } from '@angular/core';

/*const URL = 'http://192.168.0.19/mcdang/';
const API_URL = 'http://192.168.0.19/mcdang/api/index.php/';*/

const URL = 'http://theshiftleft.com/mcdang/';
const API_URL = 'http://theshiftleft.com/mcdang/api/index.php/';

@Injectable()
export class GlobalVars {
  myGlobalVar: string;
  
  constructor() {
    this.myGlobalVar = "";
  }

  setMyGlobalVar(value) {
    this.myGlobalVar = value;
  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }

  getServerUrl() {
  	return API_URL;
  }

  getUrl() {
    return URL;
  }

}
