import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortariaDatabaseService, Portaria } from 'src/app/services/db-services/portaria-database.service';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-portaria',
  templateUrl: './portaria.page.html',
  styleUrls: ['./portaria.page.scss'],
})
export class PortariaPage implements OnInit {

  userEmail: string;
  
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

  private portarias: Observable<Portaria[]>;
 
  constructor(
    private portariaService: PortariaDatabaseService,
    private userDatabaseService: UserDatabaseService,
    private authService: AuthenticateService,
    private navCtrl: NavController
    ) { }
 
  ngOnInit() {

    
    this.portarias = this.portariaService.getPortarias();
    

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
    }

    this.users = this.userDatabaseService.getUsers();
  }

}
