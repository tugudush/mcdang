import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { RecipePage } from '../pages/recipe/recipe';
import { InstructionsPage } from '../pages/instructions/instructions';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { AdminPage } from '../pages/admin/admin';
import { VideoPage } from '../pages/video/video';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UtilProvider } from '../providers/util/util';
import { HttpModule } from '@angular/http';
import { SuperTabsModule } from 'ionic2-super-tabs';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';




@NgModule({
  declarations: [
    MyApp,
    RecipePage,
    InstructionsPage,
    HomePage,
    VideoPage,
    TabsPage,
    AboutPage,
    AdminPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    VgCoreModule, 
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipePage,
    InstructionsPage,
    HomePage,
    VideoPage,
    TabsPage,
    AboutPage,
    AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilProvider
  ]
})
export class AppModule {}
