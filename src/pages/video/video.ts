import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

// export interface IWikiCue {
//   startTime: number;
//   endTime: number;
//   title: string;
//   description: string;
//   src: string;
//   href: string;
// }

declare var VTTCue;

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  api: VgAPI;
  cuePointData: ICuePoint = null;
  track: TextTrack;
  showCuePointManager = false;
  // newCue: IWikiCue = {
  //   startTime: 40,
  //   endTime: 50,
  //   title: 'Thai Omelette',
  //   description: 'Chef McDang(/ˈseɪɡən/; November 9, 1934 – December 20, 1996) is a Thai chef.',
  //   src: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Carl_Sagan_Planetary_Society.JPG',
  //   href: 'https://en.wikipedia.org/wiki/Carl_Sagan'
  // };

  json: JSON = JSON;
  is_init: boolean = true;
  video_src: Object;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public util: UtilProvider) {
    console.log("VideoPage.constructor()");
    this.video_src = {
      src: "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/Thai_Omelette.mp4",
      type: "video/mp4"
    };

    this.viewCtrl.didLeave.subscribe(
      () => {
        console.log("VideoPage -> didLeave event received..");
        if (!this.is_init && this.api != null) {
          this.api.pause();
        }
        else {
          console.log("ERROR: videogular api was not ready!")
        }
      });
    this.viewCtrl.didEnter.subscribe(
      () => {
        console.log("VideoPage -> didEnter event received..");
        if (this.is_init) {
          console.log(" -> Preload by supertabs .. Ignore!");
          this.is_init = false;
        }
        else {
          if (this.api != null) {
            //this.api.getDefaultMedia().currentTime = 50;
            this.addData();
            this.api.play();
          }
          else {
            console.log("ERROR: videogular api was not ready!")
          }
        }
      });
  }

  public handleVideo() {
    console.log("VideoPage.handleVideo()");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit()");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  // look at available events
  onPlayerReady(api: VgAPI) {
    console.log("VideoPage.onPlayerReady()");
    console.log(" -> allocating api ..");
    this.api = api;
    this.track = this.api.textTracks[0];


    // test: text tracks
    // TextTracks are accessible once the load event has fired–and not before.
    //var textTracks = this.api.textTracks; // Track (TextTrack) List
    // get English track
    //var textTrack = textTracks[0];
    //var cue: TextTrackCue = new TextTrackCue(1.783, 2.612, 'dog bark');
    //textTrack.addCue(cue);
    //console.log("...Added new cue");
    //this.api.
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
      () => {
        //console.log(" -> media can play");
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
  // with an *ngFor or to populate the 'VgScrubBarCuePoints' component.
  // onEnterCuePoint(api: VgAPI) {

  //   this.api = api;
  //   // triggered when player time is bigger than 'start' cue point property
  //   console.log(" -> onEnterCuePoint()");
  // }

  // triggered when player time is bigger than 'start' cue point property
  onEnterCuePoint($event) {
    //console.log(JSON.stringify($event.text));

    this.cuePointData = JSON.parse($event.text);
  }

  // triggered when player time moves to a position lower than cue point 'start' property
  onExitCuePoint($event) {
    //console.log(" -> onExitCuePoint()");
    this.cuePointData = null;

  }

  onScrubBarTouchMove($event){
    console.log("-> touched control...");
  }

  addData() {
    console.log("addData()");
    const jsonData1 = {
      title: "Chef McDang - Thai Chef",
      description: "Preparation for TV shooting in Korat.",
      src: "",
      href: ""
    };
    const jsonText1 = JSON.stringify(jsonData1);
    this.track.addCue(
      new VTTCue(0, 45, jsonText1)
    );

    const jsonData2 = {
      title: "Thai Omelette",
      description: "Recipe introduction",
      src: "",
      href: ""
    };
    const jsonText2 = JSON.stringify(jsonData2);
    this.track.addCue(
      new VTTCue(47 , 74, jsonText2)
    );

    const jsonData3 = {
      title: "Mix ingredients",
      description: "In a mixing bowl, mix together, the eggs, Chinese sweet pickle turnip, chilli and fish sauce.",
      src: "",
      href: ""
    };
    const jsonText3 = JSON.stringify(jsonData3);
    this.track.addCue(
      new VTTCue(76, 143, jsonText3)
    );

    const jsonData4 = {
      title: "Heat up wok",
      description: "Heat up the wok on a high heat. Put in oil and wait until smoking hot",
      src: "",
      href: ""
    };  // 2:25
    const jsonText4 = JSON.stringify(jsonData4);
    this.track.addCue(
      new VTTCue(145, 228, jsonText4)
    );

    const jsonData5 = {
      title: "Stir Ingredients",
      description: "Pour in the egg from high above and keep stirring to make omelette fluff up",
      src: "",
      href: ""
    };
    const jsonText5 = JSON.stringify(jsonData5);
    this.track.addCue(  // 3:50
      new VTTCue(230, 246, jsonText5)
    );

    const jsonData6 = {
      title: "Cook",
      description: "Adding Thai sweet basil and flip in over. Cook it for 30 second or golden and ready to serve on a plate",
      src: "",
      href: ""
    };
    const jsonText6 = JSON.stringify(jsonData6);
    this.track.addCue(//4:08 to 5:35
      new VTTCue(248, 335, jsonText6)
    );
  }
}

// "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/videogular.mp4" 
    // "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/pale-blue-dot-es.vtt"
    // https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/pale-blue-dot.vtt