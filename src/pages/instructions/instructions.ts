import { Component, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Item } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe';
//import { VideoPage } from '../video/video';
import { SuperTabsController } from 'ionic2-super-tabs';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})

export class InstructionsPage {
  public recipe_data: any;
  private instruction_index: number = -1;
  // grab element references of all ion-items generated in the template
  // @ViewChildren('myitem', { read: ElementRef }) items: QueryList<ElementRef>;
  @ViewChildren('myitem') items: QueryList<Item>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public recipeProvider: RecipeProvider,
    public superTabsCtrl: SuperTabsController,
    public events: Events,
    public highlightEvents: Events,
    public viewCtrl: ViewController,
    public renderer: Renderer) {
    this.recipe_data = this.recipeProvider.getRecipe_json();
    events.subscribe('instruction_for_highlight', (instruction_index: number) => {
      console.log("instruction_for_highlight received from VideoPage");
      console.log("Instruction Index: " + instruction_index);
      this.instruction_index = instruction_index;
      // Highlight corresponding instruction
      //console.log("TEST: " + this.items.first);
     // this.renderer.setElementStyle(this.items.first, 'backgroundColor', '#aaa');
    });

    this.viewCtrl.didEnter.subscribe(() => {
        console.log("InstructionsPage -> didEnter event received..");
        this.clearHighlight();
        if(this.instruction_index > -1){
          this.renderer.setElementStyle(this.items.toArray()[this.instruction_index].getElementRef().nativeElement, 'backgroundColor', '#ffe4e1'); //#fff0f5');
        }
        else{
          console.log(" -> No instruction received ..");
        }
      });
  }

  clearHighlight(){
      this.items.forEach(iteminstance => {
        //console.log(iteminstance.getElementRef().nativeElement);
        this.renderer.setElementStyle(iteminstance.getElementRef().nativeElement, 'backgroundColor', '#fff');
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstructionsPage');
  }


  ngAfterViewInit() {
    console.log("Instructions.ngAfterViewInit()");
    //this.items.forEach(iteminstance => console.log(iteminstance));
  }


  handleInstructionClick(instruction: any) {
    console.log("instruction " + instruction.title);
    this.superTabsCtrl.slideTo(2);
    this.events.publish('instruction', instruction);
    //this.navCtrl.setRoot(VideoPage, {
    //  instruction: instruction
    //});
  }



}
