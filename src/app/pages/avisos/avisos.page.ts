import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IdeaService, Idea } from 'src/app/services/idea.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

  private ideas: Observable<Idea[]>;
 
  constructor(private ideaService: IdeaService) { }
 
  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
  }

}
