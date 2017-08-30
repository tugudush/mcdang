import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(AboutPage),
  ],
})
export class AboutPageModule {}