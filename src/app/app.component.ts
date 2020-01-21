import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

/** Firebase Auto authentication */
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private loadingController: LoadingController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.presentLoading();


    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Verificando Usuário...'
    });
    await loading.present();
    this.fireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(["/app"]);
        this.splashScreen.hide();
        this.statusBar.styleDefault();
      }
      else {

      }
    })
    loading.dismiss();
  }

}
