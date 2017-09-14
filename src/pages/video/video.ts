import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { VgAPI } from 'videogular2/core';
// enables calling another component using events
import { Events } from 'ionic-angular';

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
  json: JSON = JSON;
  is_init: boolean = true;
  public recipe_data: any;
  public is_event: boolean = false; // indicate that event has been fired
  public curr_instruction: any;
  public curr_instruction_index: number;
  public curr_time: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    //public loadingCtrl: LoadingController,
    public util: UtilProvider,
    public recipeProvider: RecipeProvider,
    public events: Events) {
      console.log("VideoPage.constructor()");
      this.recipe_data = this.recipeProvider.getRecipe_json();
      // subscribe to event called from Instructions page 
    // to reset the video
    this.events.subscribe('instruction', (instruction: any) => {
      console.log("Instruction received from InstructionsPage");
      this.curr_instruction = instruction;
      this.curr_instruction_index = instruction.sequence;
      this.setVideo();
      //this.setVideo(instruction);
    });
    // NOTE: Following Observables hould really be in ionViewDidLoad() but makes page unstable
    this.viewCtrl.didLeave.subscribe(
      () => {
        console.log("VideoPage -> didLeave event received..");
        if (!this.is_init && this.api != null) {
          this.api.pause();
        }
        else {
          console.log("ERROR: videogular api was not ready!")
        }
        console.log("publishing instruction_for_highlight event");
        this.events.publish('instruction_for_highlight', this.curr_instruction_index);
        //this.events.publish('instruction_for_highlight', this.curr_instruction.sequence);
      });

    this.viewCtrl.didEnter.subscribe(
      () => {
        console.log("VideoPage -> didEnter event received..");
        // get data if instruction has been clicked in InstructionsPage
        //let instruction = navParams.get('instruction');
        //console.log("event=" + this.is_event);
        if (!this.is_init) {
          console.log(" -> is_init is false");
          if (this.api != null) { //} && this.is_event == false) {
            this.setVideo();
          }
          else {
            console.log("ERROR: videogular api was not ready!")
          }
        } else {
          console.log(" -> Preload by supertabs .. Ignore!");
          this.is_init = false;
          this.curr_instruction_index = 0;  // start condition
          // true when starting, false when finishing:
          this.events.publish('load-video', true);
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  public setVideo() {
    console.log("setVideo()");
    //this.is_event = true;
    if (this.curr_instruction != null) {
      console.log("received instruction " + this.curr_instruction.title);
      this.is_init = false;
      //this.api.pause();
      //this.createCueData();
      this.api.getDefaultMedia().currentTime = this.curr_instruction.timecode_start;
      this.api.play();
      this.curr_instruction = null;
      //this.is_event = false;
    }
    else {
      console.log(" -> No instruction allocated");
      //this.createCueData();
      this.api.play();
    }
  }

  restartVideo() {
    this.api.getDefaultMedia().currentTime = 0;
    this.api.play();
  }

  public handleVideo() {
    console.log("VideoPage.handleVideo()");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit()");

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
        console.log(" -> media can play");
        this.events.publish('load-video', false);
        //this.util.displayToast(this.toastCtrl,"Video is ready to play!", 1000);
        this.createCueData();
      });
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        console.log(".. Set the video to the beginning?");
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
    console.log("VideoPage.onEnterCuePoint()");
    // console.log(" -> Event.text data: " + JSON.stringify($event.text));
    this.cuePointData = JSON.parse($event.text);
    // need to determine sequence number of instruction here
    this.curr_time = this.api.getDefaultMedia().currentTime;
    //TODO: calculate which instruction we are in
    this.curr_instruction_index = this.recipeProvider.getSequence(this.curr_time);
    //console.log(" -> curr_time = " + this.curr_time);
  }

  // triggered when player time moves to a position lower than cue point 'start' property
  onExitCuePoint($event) {
    //console.log(" -> onExitCuePoint()");
    this.cuePointData = null;

  }

  onScrubBarTouchMove($event) {
    console.log("-> touched control...");
  }

  createCueData() {
    console.log("createCueData()");
    for (let instruction of this.recipe_data.recipe.instructions) {
      var jsonData = { title: instruction['title'], description: instruction['info'] };
      //console.log("title: item['title']")
      var jsonTxt = JSON.stringify(jsonData);
      this.track.addCue(new VTTCue(parseFloat(instruction['timecode_start']), parseFloat(instruction['timecode_stop']), jsonTxt));
    }
  }
}

// "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/videogular.mp4" 
    // "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/pale-blue-dot-es.vtt"
    // https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/pale-blue-dot.vtt