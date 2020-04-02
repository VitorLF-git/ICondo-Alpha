import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FCM } from '@ionic-native/fcm/ngx';

import { HttpClient } from '@angular/common/http';
import { LocalDatabaseService } from './../../services/local/local-database.service';
import { CondominioDatabaseService, Condominio } from 'src/app/services/db-services/condominio-database.service';



// this.productStatus = this.product.subscribe(res => console.log(res.status)); NÃO PRESTE MUITA ATENÇÃO PENSEI QUE OS PROGRAMADORES DEVERIAM SE AJUDAR MAS ISSO NÃO É MUITO MENOR QUE O SEU NÃO SE PREOCUPE


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
    token: 'notoken',
    condominio: '',
    sindEmail: '',
    date: "no date"
  };


  condominio: Condominio = {
    name: '',
    code: '',
    email: '',
    tokens: [''],
  }

  condominioSub: Subscription;
  userSub: Subscription;


  runOnceGetToken: string = '1';
  users: Observable<User[]>;
  condominios: Observable<Condominio[]>;


  userId: string = 'noid'
  localToken: string = 'notoken';
  safetyFlag: string = '0';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private userDatabaseService: UserDatabaseService,
    private router: Router,
    private fcm: FCM,
    public plt: Platform,
    private http: HttpClient,
    private localDatabaseService: LocalDatabaseService,
    private condominioDatabaseService: CondominioDatabaseService
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
          this.localToken = token;

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
        'https://us-central1-spring-base-250217.cloudfunctions.net/aranha')
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

  ionViewWillEnter() {

    console.log("view will enter");



  }

  ionViewDidEnter() {
    console.log("view did enter");
    if (this.runOnceGetToken == '1') {

      console.log("run once");
      this.mapUser();

    }

    this.runOnceGetToken = '0';
    console.log("end");


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

  mapUser() {

    this.userSub = this.users.pipe(
      map(actions => {
        actions.map(a => {
          if (this.safetyFlag == '0') {
            this.userId = a.id;
            this.userDatabaseService.updateUserToken(this.userId, this.localToken);

            this.localDatabaseService.setCurrentCondominio(a.condominio);
            this.localDatabaseService.setUserType(a.type);
            this.localDatabaseService.setUserApt(a.apt);
            this.localDatabaseService.setSindEmail(a.sindEmail);
            console.log(a.sindEmail);

            this.condominios = this.condominioDatabaseService.getCondominiosByName(a.condominio);

            this.mapCondominio();
          }
        });
      })).subscribe((val) => {
        console.log("subscribe")
      }, (error) => {
        console.log('Error: ', error);
      });
  }


  mapCondominio() {
    this.condominioSub = this.condominios.pipe(
      map(actions => {
        actions.map(a => {
          if (this.safetyFlag == '0') {
          this.condominio = a
          if(this.condominio.tokens.find(x => x.includes(this.localToken))){

          }
          else{
          this.condominio.tokens.push(this.localToken);
          this.condominioDatabaseService.updateCondominio(this.condominio);
          }
          this.localDatabaseService.setNotificationTokens(this.condominio.tokens);
          this.safetyFlag = "1";
        }
        });
      })).subscribe((val) => {
        console.log("subscribe")
      }, (error) => {
        console.log('Error: ', error);
      });
  }
}
