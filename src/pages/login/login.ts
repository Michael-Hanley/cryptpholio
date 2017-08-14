import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


import { HomePage } from '../home/home';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,
    private fb: Facebook, private platform: Platform) { }
/*
  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        console.log(res);
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          this.navCtrl.setRoot(HomePage)
          console.log(res);
        })
    }
  }
*/
  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => this.navCtrl.setRoot(HomePage));
  }
  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res => this.navCtrl.setRoot(HomePage));
  }

  skip(){
    this.navCtrl.setRoot(HomePage)
  }
  signOut() {
//    this.afAuth.auth.signOut();
  }

}
