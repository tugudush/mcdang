import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { AdminPage } from '../pages/admin/admin';
//import { RegisterPage } from '../pages/register/register';
//import { InstructionsPage } from '../pages/instructions/instructions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;//RegisterPage; //RegisterPage;  //TabsPage;
  public pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    menuCtrl: MenuController,
    private splashScreen: SplashScreen) {
    // Handle Menu
    this.pages = [
      { title: 'About', component: AboutPage, icon: 'information-circle' },
      { title: 'McDang', component: TabsPage, icon: 'apps' },
      { title: 'Admin Only', component: AdminPage, icon: 'build' }
    ];
    menuCtrl.enable(true, 'myMenu');
    platform.ready().then(() => {
      // splashscreen should have been shown up till now - Hide it.
      this.hideSplashScreen();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    platform.pause.subscribe(() => {
      console.log('[INFO] App paused');
      this.hideSplashScreen();
    });

    platform.resume.subscribe(() => {
      console.log('[INFO] App resumed');
      //this.hideSplashScreen();
      //this.initialiseApp();
      //this.util.reloadApp(this.alertCtrl,"Restart to upload latest data ...")
      //window.location.reload();
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