import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UtilProvider } from '../providers/util/util';
import { HttpModule } from '@angular/http';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { RecipeProvider } from '../providers/recipe/recipe';
import { GlobalVars } from '../providers/globalVars';
import { RegistrationService } from '../providers/user/registration-service';
import { AuthService } from '../providers/user/auth-service';
// import { VideoPage } from '../pages/video/video';
// import {VgCoreModule} from 'videogular2/core';
// import {VgControlsModule} from 'videogular2/controls';
// import {VgOverlayPlayModule} from 'videogular2/overlay-play';
// import {VgBufferingModule} from 'videogular2/buffering';


@NgModule({
  declarations: [
    MyApp,
    //VideoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // VgCoreModule, 
    // VgControlsModule,
    // VgOverlayPlayModule,
    // VgBufferingModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //VideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilProvider,
    RecipeProvider,
    GlobalVars,
    RegistrationService,
    AuthService
  ]
})
export class AppModule {}
