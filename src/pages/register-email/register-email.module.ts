import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterEmailPage } from './register-email';

@NgModule({
  declarations: [
    RegisterEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterEmailPage),
  ],
})
export class RegisterEmailPageModule {}
