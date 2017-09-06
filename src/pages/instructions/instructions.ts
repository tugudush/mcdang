import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { VideoPage } from '../video/video';

@IonicPage()
@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})
export class InstructionsPage {
  public recipe_data: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public recipeProvider: RecipeProvider) {
      this.recipe_data = this.recipeProvider.getRecipe_json();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstructionsPage');
  }


  handleInstructionClick(instruction: any){
    console.log("instruction " + instruction.title);
    this.navCtrl.setRoot(VideoPage, {
      instruction: instruction
    });
  }

}
