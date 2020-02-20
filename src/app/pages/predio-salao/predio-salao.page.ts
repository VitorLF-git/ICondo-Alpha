import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { EventCalendario, CalendarioDatabaseService } from './../../services/db-services/calendario-database.service';
import { Observable, from, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { LocalDatabaseService } from './../../services/local/local-database.service';

@Component({
  selector: 'app-predio-salao',
  templateUrl: './predio-salao.page.html',
  styleUrls: ['./predio-salao.page.scss'],
})
export class PredioSalaoPage implements OnInit {

  event: EventCalendario = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
    condominio: '',
    creationDate: '',
  };
  events: Observable<EventCalendario[]>;
  minDate = new Date().toISOString();

  eventArray: EventCalendario[];

  collapseCard: boolean = true;
  currentCondo: string = "";
  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private calendarioDatabaseService: CalendarioDatabaseService, private localDatabaseService : LocalDatabaseService) { }

  ngOnInit() {
    this.resetEvent();
    this.currentCondo = this.localDatabaseService.getCurrentCondominio();
    this.event.condominio = this.currentCondo;

    this.events = this.calendarioDatabaseService.getCalendarios(this.currentCondo);
    console.log(this.events);
    // const getData = (param) => {
    //   return of(`retrieved new data with param ${param}`).pipe(
    //     delay(1000)
    //   )
    // }
    
    // // using a regular map
    // from([1,2,3,4]).pipe(
    //   map(param => getData(param))
    // ).subscribe(val => val.subscribe(data => console.log(data)));
    
    this.events.pipe(
      map(actions => {
        actions.map(a => {
          console.log("inside Pipe salao")
          this.event = a;
          this.addEvent();
          const id = '1';
          this.resetEvent();
        });
      }))
      .subscribe((val) => {
        console.log("subscribe")
      }, (error) => {
        console.log('Error: ', error);
      });
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      condominio: this.currentCondo,
      creationDate: '',
    };
  }

  addEventToDB(){
    this.calendarioDatabaseService.addCalendario(this.event, this.currentCondo);

    this.addEvent();
  }
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc,
      eventColor: 'red'
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'De: ' + start + '<br><br>Até: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

}
