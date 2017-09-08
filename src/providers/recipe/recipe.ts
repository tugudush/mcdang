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

  // gets track time and determines what instruction sequence 
  // it occurs in
  getSequence(curr_time: number){
    console.log("RecipeProvider.getSequence()")
    let jsonObject: any = this.getRecipe_json();
    let ret_seq = 0;
    for(let instruction of jsonObject.recipe.instructions){
      if(curr_time > parseFloat(instruction.timecode_start)){
        ret_seq = instruction.sequence;
      }
    }
    console.log("sequence = " + ret_seq);
    return ret_seq;
  }


  getRecipe_json() {
    let rec_json: any = {
      recipe: {
        id: "0",
        name: "Thai Omelette",
        video_url: "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-523157505716/mcdang/Thai_Omelette.mp4",
        video_type: "video/mp4",
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
          title: "Chef McDang",
          sequence: "0",
          timecode_start: "1",
          timecode_stop: "45",
          info: "Preparation"
        }, {
          title: "Thai Omelette",
          sequence: "1",
          timecode_start: "47",
          timecode_stop: "74",
          info: "Recipe introduction."
        }, {
          title: "Mix Ingredients",
          sequence: "2",
          timecode_start: "76",
          timecode_stop: "143",
          info: "In a mixing bowl, mix together, the eggs, Chinese sweet pickle turnip, chilli and fish sauce."
        }, {
          title: "Heat up wok",
          sequence: "3",
          timecode_start: "145",
          timecode_stop: "228",
          info: "Heat up the wok on a high heat. Put in the oil and wait until smoking hot. Testing scrolling ... "
          + "Testing scrolling ... Testing scrolling ... Testing scrolling ... Testing scrolling ... Testing scrolling ... Testing scrolling ... " 
          + "Testing scrolling ... Testing scrolling ... Testing scrolling ... Testing scrolling ... Testing scrolling ... Testing scrolling ... "
        }, {
          title: "Stir Ingredients",
          sequence: "4",
          timecode_start: "230",
          timecode_stop: "246",
          info: "Pour in the egg from high above and keep stirring to make omelette fluff up."
        }, {
          title:"Cook",
          sequence: "5",
          timecode_start: "248",
          timecode_stop: "335",
          info: "Add Thai sweet basil and flip over. Cook for about 30 seconds or golden brown. Serve immediately. "
        }],
        summary: "This dip is served with fresh or blanched vegetables, such as Thai eggplant, cucumber, Thai wing beans, green onion or cabbage leaves."
      }
    }
    return rec_json;
  }
}
