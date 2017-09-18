import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { TabsPage } from '../pages/tabs/tabs';
//import { AboutPage } from '../pages/about/about';
//import { AdminPage } from '../pages/admin/admin';
//import { RegisterPage } from '../pages/register/register';
//import { InstructionsPage } from '../pages/instructions/instructions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = 'RegisterPage';//RegisterPage; //RegisterPage;  //TabsPage;
  public pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public alertCtrl: AlertController, 
    public app: App,
    statusBar: StatusBar,
    menuCtrl: MenuController,
    private splashScreen: SplashScreen) {
    // Handle Menu
    this.pages = [
      { title: 'About', component: 'AboutPage', icon: 'information-circle' },
      { title: 'McDang', component: 'TabsPage', icon: 'apps' },
      { title: 'Admin Only', component: 'AdminPage', icon: 'build' }
    ];
    menuCtrl.enable(true, 'myMenu');
    platform.ready().then(() => {
      // splashscreen should have been shown up till now - Hide it.
      this.hideSplashScreen();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.registerBackButton();
    });

    platform.pause.subscribe(() => {
      console.log('[INFO] App paused');
      console.log(" -> closing app ..");
      platform.exitApp();
      //this.hideSplashScreen();
    });

    platform.resume.subscribe(() => {
      console.log('[INFO] App resumed');
      //this.rootPage = 'TabsPage';
      //this.registerBackButton();
      //this.hideSplashScreen();
      //this.initialiseApp();
      //this.util.reloadApp(this.alertCtrl,"Restart to upload latest data ...")
      //window.location.reload();
    });
  }

  registerBackButton(){
    console.log("App.registerBackButton()");
    //Registration of push in Android and Windows Phone
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()){ //Can we go back?
          console.log(" --> can go back, popping");
          nav.pop();
        }else{
          let alert = this.alertCtrl.create({
            title: "EXIT McDang?",
            message: " Do you want to exit McDang?",
            buttons: [{
              text: 'YES',
              handler: data => {
                console.log(" --> exiting");
                this.platform.exitApp(); //Exit from app;
              }
            }, {
              text: 'NO',
              handler: data => {
                console.log(" --> Do Nothing");
                //nav.setRoot('TabsPage');
              }
            }]
          });
          alert.present();   
        }
      });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}