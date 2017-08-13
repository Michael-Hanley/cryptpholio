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

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAvPyiIZ04PeEjVv1XjnU7Q-jge3XmRvcg",
  authDomain: "cryptpholio-97a78.firebaseapp.com",
  databaseURL: "https://cryptpholio-97a78.firebaseio.com",
  projectId: "cryptpholio-97a78",
  storageBucket: "cryptpholio-97a78.appspot.com",
  messagingSenderId: "442983174048"
};

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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
