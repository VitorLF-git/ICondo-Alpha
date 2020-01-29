import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvisoDatabaseService, Aviso } from 'src/app/services/db-services/aviso-database.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

  private avisos: Observable<Aviso[]>;

  constructor(private avisoService: AvisoDatabaseService) { }

  ngOnInit() {
    this.avisos = this.avisoService.getAvisos();
  }

}
