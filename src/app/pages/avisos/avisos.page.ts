import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvisoDatabaseService, Aviso } from 'src/app/services/db-services/aviso-database.service';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';
import { LocalDatabaseService } from './../../services/local/local-database.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

   avisos: Observable<Aviso[]>;
   currentCondominio: string;

  constructor(private avisoService: AvisoDatabaseService,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private localDatabaseService: LocalDatabaseService) { }

  ngOnInit() {
    this.currentCondominio = this.localDatabaseService.getCurrentCondominio();

    this.avisos = this.avisoService.getAvisos(this.currentCondominio);
  }

}
