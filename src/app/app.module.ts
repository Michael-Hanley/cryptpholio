import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DataService } from './../services/data.service';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule, JsonpModule } from '@angular/http';
import { stackValuePipe } from '../pipes/stackValuePipe.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    stackValuePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    DataService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
