import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, Events, NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe';
//import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe_data: any;
  private loader: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public events: Events,
    public recipeProvider: RecipeProvider) {
    this.recipe_data = this.recipeProvider.getRecipe_json();

    // subscribe to loading event received from video page
    // subscribe to loading event from RecipePage
    events.subscribe('load-video', (is_loading: boolean) => {
      // is_loading is true when starting to load, false if finished loading
      if(is_loading){
        this.loader = this.loadingCtrl.create({
          content: "loading video..",
          duration: 10000
        });
        this.loader.present();
      } else{
        this.loader.dismiss();
        //this.util.displayToast(this.toastCtrl,'swipe left to view video', 2000);
      }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
