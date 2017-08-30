import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipePage } from './recipe';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    RecipePage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(RecipePage),
  ],
})
export class CocktailPageModule {}
