import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortariaDatabaseService, Portaria } from 'src/app/services/db-services/portaria-database.service';
import { AuthenticateService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-portaria',
  templateUrl: './portaria.page.html',
  styleUrls: ['./portaria.page.scss'],
})
export class PortariaPage implements OnInit {

  userEmail: string;
  userToken: string = '';


  private portarias: Observable<Portaria[]>;
 
  constructor(
    private portariaService: PortariaDatabaseService,
    private authService: AuthenticateService
    ) { }
 
  ngOnInit() {
    this.portarias = this.portariaService.getPortarias();

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.authService.userDetails().getIdToken;
    }else{
    }
  }

}
