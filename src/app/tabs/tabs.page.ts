import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage implements OnInit {

  constructor(private route: ActivatedRoute) {}

  todoId = null;

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
  }

}
