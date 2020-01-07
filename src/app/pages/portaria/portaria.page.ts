import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortariaDatabaseService, Portaria } from 'src/app/services/db-services/portaria-database.service';

@Component({
  selector: 'app-portaria',
  templateUrl: './portaria.page.html',
  styleUrls: ['./portaria.page.scss'],
})
export class PortariaPage implements OnInit {

  private portarias: Observable<Portaria[]>;
 
  constructor(private portariaService: PortariaDatabaseService) { }
 
  ngOnInit() {
    this.portarias = this.portariaService.getPortarias();
  }

}
