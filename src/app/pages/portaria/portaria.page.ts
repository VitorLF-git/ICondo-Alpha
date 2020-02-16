import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortariaDatabaseService, Portaria } from 'src/app/services/db-services/portaria-database.service';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { User, UserDatabaseService } from 'src/app/services/db-services/user-database.service';
import { NavController } from '@ionic/angular';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { map } from 'rxjs/operators';
import { LocalDatabaseService } from './../../services/local/local-database.service';


@Component({
  selector: 'app-portaria',
  templateUrl: './portaria.page.html',
  styleUrls: ['./portaria.page.scss'],
})
export class PortariaPage implements OnInit {

  private portaria: Portaria;

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
    date: "no date"

  };
  private users: Observable<User[]>;
  private date: Date;
  private portarias: Observable<Portaria[]>;
  private userType: string;
  private userCondo: string;
  private confirmedFilter: boolean = false;
  private filterResult: boolean = false;


  constructor(
    private portariaService: PortariaDatabaseService,
    private userDatabaseService: UserDatabaseService,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private localDatabaseService: LocalDatabaseService
  ) { }



  ngOnInit() {

    this.userCondo = this.localDatabaseService.getCurrentCondominio();
    this.userType = this.localDatabaseService.getUserType();

    console.log('Start portarias');
    if (this.userType == 'porteiro') {
      console.log("user is porteiro")
      this.portarias = this.portariaService.getPortariasByCondo(this.userCondo);
    } else {
      console.log("user is not porteiro")
      this.portarias = this.portariaService.getPortarias();
    }

    console.log('Get portarias');

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
    }

    this.users = this.userDatabaseService.getUsers();

    console.log('Finish');


  }

  updateAvisoPorteiro(id: string, message: string) {

    console.log(id);

    this.portariaService.confirmPortariaPorteiro(id, message);

  }

  updateAvisoMorador(id: string, message: string) {

    console.log(id);

    this.portariaService.confirmPortariaMorador(id, message);
  }

  changeConfirmedFilter() {
    if (this.confirmedFilter == true) {
      this.confirmedFilter = false;
    }
    else {
      this.confirmedFilter = true;
    }


  }

  checkFilter(confirmed1: string, confirmed2: string, confirmedFil: boolean) {

    if (confirmed1 == "true" && confirmed2 == "true" && confirmedFil == true) {
      return true;
    }
    if (confirmed1 == "negative" && confirmedFil == true) {
      return true;
    }
    else {
      return false;
    }



  }




}
