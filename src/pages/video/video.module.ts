import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPage } from './video';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    VideoPage
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(VideoPage)
  ]
})
export class VideoPageModule {}
