import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FCM } from '@ionic-native/fcm/ngx';

import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-predio',
  templateUrl: './predio.page.html',
  styleUrls: ['./predio.page.scss'],
})
export class PredioPage implements OnInit {
  userEmail: string;

  firebaseReply: string = "You'll see Firebase function response here";

  user: User = {

    name: '',
    email: '',
    apt: '',
    garage: '',
    type: 'morador',
    notes: '',
    date: "no date"
  };



  private users: Observable<User[]>;

  private localToken: string = 'notoken';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private userDatabaseService: UserDatabaseService,
    private router: Router,
    private fcm: FCM, 
    public plt: Platform,
    private http: HttpClient,
  ) {
    this.plt.ready()
    .then(() => {
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {

        console.log("Token refresh");
        this.localToken=token;

        // Register your new token in your back-end if you want
        // backend.registerToken(token);
      });
    })
   }
   

   subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {

      console.log("Token " + token);
      this.localToken = token;

      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  callCloudFunction() {
    this.http
      .get(
        'http://localhost:5000/spring-base-250217/us-central1/helloWorld')
      .subscribe((data: any) => {
        console.log(data);
        this.firebaseReply = data.text;
      });
  }



  ngOnInit() {

    this.userEmail = this.authService.userDetails().email;

    this.users = this.userDatabaseService.getUsers();

    this.getToken();

  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
