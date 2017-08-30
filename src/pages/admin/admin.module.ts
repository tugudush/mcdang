import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPage } from './admin';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    AdminPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(AdminPage),
  ],
})
export class AdminPageModule {}
