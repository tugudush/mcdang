import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { VgAPI } from 'videogular2/core';

// ref: https://github.com/videogular/videogular2/tree/master/docs
// ref: https://www.youtube.com/embed/-wXfJvb9Ae0
// ref: https://forum.ionicframework.com/t/solved-ionic-2-and-videogular-2-scss/89454/3

// ref: https://github.com/videogular/videogular2-showroom/blob/master/src/app/cue-points-player/cue-points-player.component.ts
export interface ICuePoint {
  title: string;
  description: string;
  src: string;
  href: string;
}

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  api: VgAPI;
  cuePointData: ICuePoint = null;
  // config: any;
  // barChartStyle={};
  // textStyle={};
  // chapterSelected={};


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public util: UtilProvider) {
    console.log("VideoPage.constructor()");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit()");

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  // look at available events
  onPlayerReady(api: VgAPI) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
      () => {
        //console.log(".. video can play");
      });
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        //console.log(".. Set the video to the beginning");
        this.api.getDefaultMedia().currentTime = 0;
      }
    );
  }

  // https://github.com/videogular/videogular/blob/master/app/scripts/controllers/cuePoints.js
  // VgCuePoints will add 'cues' property to the track element with all 
  // the VTTCue objects loaded by the 'track' elemenet. 
  // E.g. you can use the 'cues' property to list all the cues 
  // with an *ngFor or to populate the 'VgScrubBarCuewPoints' component.
  // onEnterCuePoint(api: VgAPI) {
    
  //   this.api = api;
  //   // triggered when player time is bigger than 'start' cue point property
  //   console.log(" -> onEnterCuePoint()");
  // }

  // triggered when player time is bigger than 'start' cue point property
  onEnterCuePoint($event) {
    //console.log(" -> onEnterCuePoint()");
   // this.cuePointData = JSON.parse($event.text);
    //console.log(" -> onEnterCuePoint()");
  }

  // triggered when player time moves to a position lower than cue point 'start' property
  onExitCuePoint($event) {
    //this.cuePointData = null;
    //console.log(" -> onExitCuePoint()");
}

  // onExitCuePoint(api: VgAPI) {
  //   this.api = api;
  //   console.log(" -> onExitViewPoint()");
  // }



}

