import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.page.html',
  styleUrls: ['./predio.page.scss'],
})
export class PredioPage implements OnInit {
  userEmail: string;

  user: User = {

    name: '',
    email: '',
    apt: '',
    garage: '',
    type: 'morador',
    notes: '',
  };

  private users: Observable<User[]>;


  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private userDatabaseService: UserDatabaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userEmail = this.authService.userDetails().email;

    this.users = this.userDatabaseService.getUsers();
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
