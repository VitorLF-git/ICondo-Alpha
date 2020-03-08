import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predio-perfil',
  templateUrl: './predio-perfil.page.html',
  styleUrls: ['./predio-perfil.page.scss'],
})
export class PredioPerfilPage implements OnInit {

  userEmail: string;

  user: User = {

    name: '',
    email: '',
    apt: '',
    garage: '',
    type: 'morador',
    notes: '',
    token: 'notoken',
    condominio: '',
    sindEmail:'',
    date: "no date"

  };
   users: Observable<User[]>;

  constructor(  navCtrl: NavController,
    private authService: AuthenticateService,
    private userDatabaseService: UserDatabaseService,
    private router: Router,) { }

  ngOnInit() {
    this.userEmail = this.authService.userDetails().email;
    this.users = this.userDatabaseService.getUsers();

  }

}
