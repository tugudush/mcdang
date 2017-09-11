import { Component } from '@angular/core';
//import { RecipePage } from '../recipe/recipe';
//import { InstructionsPage } from '../instructions/instructions';
//import { HomePage } from '../home/home';
//import { VideoPage } from '../video/video';
import { IonicPage} from 'ionic-angular';
// ref: https://github.com/zyra/ionic2-super-tabs#installation
// ref: https://www.joshmorony.com/adding-swipeable-tabs-to-an-ionic-application/
import { SuperTabsController } from 'ionic2-super-tabs';
@IonicPage()
@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs',
})
export class TabsPage {

  tab1Root: any = 'HomePage';
  tab2Root: any = 'RecipePage';
  tab3Root: any = 'VideoPage';
  tab4Root: any = 'InstructionsPage';
  

  constructor(private superTabsCtrl: SuperTabsController) {
    //this.superTabsCtrl.showToolbar(false);
  }

  ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
    //this.superTabsCtrl.setBadge('homeTab', 1);
    this.hideToolbar();
  }

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }
  
  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }
  
  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    if(ev.index == 2){
    }
  }

  slideToIndex(index: number){
    this.superTabsCtrl.slideTo(index);
  }
}
