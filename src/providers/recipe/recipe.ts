import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecipeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RecipeProvider {

  constructor(public http: Http) {
    console.log('RecipeProvider');
  }

  getRecipe_json() {
    let rec_json: any = {
      recipe: {
        id: "0",
        name: "Thai Omelette",
        video_url: "..",
        image_url: "..",
        vtt: null,
        ingredients: [{
          amount: "1",
          unit: "Cup",
          name: "Vegetable Oil or Pork Fat",
          extra_info: ""
        }, {
          amount: "3",
          unit: "each",
          name: "Eggs",
          extra_info: ""
        }, {
          amount: "30",
          unit: "Grams",
          name: "slice chinese Sweet Pickle Turnip",
          extra_info: ""
        }, {
          amount: "30",
          unit: "Grams",
          name: "Slice Thai Long Red or Green Chilli",
          extra_info: ""
        }, {
          amount: "30",
          unit: "Grams",
          name: "Thai Sweet Basil",
          extra_info: ""
        }, {
          amount: "2",
          unit: "Table Spoons",
          name: "Fish Sauce",
          extra_info: ""
        }],
        instructions: [{
          timecode_start: "10.00",
          timecode_stop: "30:00",
          info: "In a mixing bowl, mix together, the eggs, Chinese sweet pickle turnip, chilli and fish sauce."
        },{
          timecode_start: "40.00",
          timecode_stop: "60:00",
          info: "Heat up the wok on a high heat. Put in the oil and wait until smoking hot."
        },{
          timecode_start: "70.00",
          timecode_stop: "90:00",
          info: "Pour in the egg from high above and keep stirring to make omelette fluff up."
        },{
          timecode_start: "100.00",
          timecode_stop: "120:00",
          info: "Add Thai sweet basil and flip over. Cook for about 30 seconds or golden brown. Serve immediately. "
        }]
  }


}

  }
}
