import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ToastController, Events, NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe_data: any;
  //private loader: Loading;
  private is_alive: boolean;  // flag to indicate user is seeing this page

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public util: UtilProvider,
    public events: Events,
    public recipeProvider: RecipeProvider) {
      this.recipe_data = this.recipeProvider.getRecipe_json();
      // NOTE: Following Observables hould really be in ionViewDidLoad() but makes page unstable
      this.viewCtrl.didEnter.subscribe(
        () => {
          this.is_alive = true;
        });
      this.viewCtrl.didLeave.subscribe(
        () => {
          this.is_alive = false;
        });
        // subscribe to loading event received from video page
      // subscribe to loading event from RecipePage
      this.events.subscribe('load-video', (is_loading: boolean) => {
        // is_loading is true when starting to load, false if finished loading
        if (is_loading) {
            //this.util.displayToast(this.toastCtrl, 'Video loading ...', 2000);
          // this.loader = this.loadingCtrl.create({
          //   content: "loading video..",
          //   duration: 10000
          // });
          // this.loader.present();
        } else {
          //this.loader.dismiss();
          if(this.is_alive){
            this.util.displayToast(this.toastCtrl, 'Video loaded - swipe left to start viewing', 2000);
          }
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
    
  }

}
