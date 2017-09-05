import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe_data: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public recipeProvider: RecipeProvider) {
      this.recipe_data = this.recipeProvider.getRecipe_json();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CocktailPage');
  }

}
