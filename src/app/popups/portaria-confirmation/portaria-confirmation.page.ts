import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portaria-confirmation',
  templateUrl: './portaria-confirmation.page.html',
  styleUrls: ['./portaria-confirmation.page.scss'],
})
export class PortariaConfirmationPage implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor() { }

  ngOnInit() {
  }

}
