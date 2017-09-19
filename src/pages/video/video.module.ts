import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPage } from './video';
import { SuperTabsModule } from 'ionic2-super-tabs';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
//import { SpeechRecognition } from '@ionic-native/speech-recognition'; 

@NgModule({
  declarations: [
    VideoPage
  ],
  imports: [
    SuperTabsModule,
    VgCoreModule, 
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicPageModule.forChild(VideoPage)
  ]
  // providers: [
  //   SpeechRecognition
  // ]
})
export class VideoPageModule {}
