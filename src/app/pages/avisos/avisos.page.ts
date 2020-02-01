import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvisoDatabaseService, Aviso } from 'src/app/services/db-services/aviso-database.service';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

  private avisos: Observable<Aviso[]>;

  constructor(private avisoService: AvisoDatabaseService,
    private authService: AuthenticateService,
    private navCtrl: NavController) { }

  ngOnInit() {
    
    this.avisos = this.avisoService.getAvisos();
  }

}
