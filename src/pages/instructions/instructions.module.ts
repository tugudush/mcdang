import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstructionsPage } from './instructions';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    InstructionsPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(InstructionsPage),
  ],
})
export class InstructionsPageModule {}
