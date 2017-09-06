import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { VideoPage } from '../video/video';
import { SuperTabsController } from 'ionic2-super-tabs';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})
export class InstructionsPage {
  public recipe_data: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public recipeProvider: RecipeProvider,
              public superTabsCtrl: SuperTabsController,
              public events: Events) {
      this.recipe_data = this.recipeProvider.getRecipe_json();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstructionsPage');
  }


  handleInstructionClick(instruction: any){
    console.log("instruction " + instruction.title);
    this.superTabsCtrl.slideTo(2);
    this.events.publish('instruction', instruction);
    //this.navCtrl.setRoot(VideoPage, {
    //  instruction: instruction
    //});
  }

}
