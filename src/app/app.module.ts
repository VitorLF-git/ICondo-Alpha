import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthenticateService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
 
import { FCM } from '@ionic-native/fcm/ngx';


import {HttpClientModule, HttpClient} from '@angular/common/http';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    /** Firebase Auth Modules */
    AngularFireAuthModule, ReactiveFormsModule,
    /** Firebase Auth Modules end */
    HttpClientModule,
    /** Firebase Db Modules */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule],
    /** Firebase Db Modules end */
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticateService,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    FCM
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
