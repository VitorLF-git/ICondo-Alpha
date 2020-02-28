import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { EventCalendario, CalendarioDatabaseService } from './../../services/db-services/calendario-database.service';
import { Observable, from, of, Subscription } from 'rxjs';
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
    morning: false,
    afternoon: false,
    night: false,
    condominio: '',
    creationDate: '',
    apt: '',
  };

  event123: any;

  eventDeletion = {
    id: '',
    title: '',
    desc: '',
    startTime: new Date,
    endTime: new Date,
    allDay: false,
    morning: false,
    afternoon: false,
    night: false,
  };

  eventDeletionCopy = {
    title: '',
    desc: '',
    startTime: new Date,
    endTime: new Date,
    allDay: false,
    morning: false,
    afternoon: false,
    night: false,
    condominio: '',
    creationDate: '',
    apt: '',
  };

  eventDeletionArray = [];
  eventDeletionID : string = '';

  events: Observable<EventCalendario[]>;
  eventsForDeletion: Observable<EventCalendario[]>;

  minDate = new Date().toISOString();
  runOnce: boolean = false;
  eventArray: EventCalendario[];

  blockingArray: string[] = [];
  blockingArrayResult: string[] = [];

  blockingArrayResultMorning: string;
  blockingArrayResultAfternoon: string;
  blockingArrayResultNight: string;

  currentApt: string;

  eventDate: string;

  eventCopyString: string;

  isMorningBlocked: boolean = false;
  isAfternoonBlocked: boolean = false;
  isNightBlocked: boolean = false;

  subscription: Subscription;
  subscriptionDeletion: Subscription;

  collapseCard: boolean = true;
  currentCondo: string = "";
  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, 
  private calendarioDatabaseService: CalendarioDatabaseService, 
  private localDatabaseService: LocalDatabaseService,
  private toastCtrl: ToastController ) { }

  ngOnInit() {



    if (this.runOnce == false) {
      this.resetEvent();
      this.currentCondo = this.localDatabaseService.getCurrentCondominio();
      this.event.condominio = this.currentCondo;
      this.currentApt = this.localDatabaseService.getUserApt();

      this.eventsForDeletion = this.calendarioDatabaseService.getCalendarioByApt(this.currentApt, this.currentCondo);


      this.subscriptionDeletion = this.eventsForDeletion.pipe(
        map(actions => {
          actions.map(a => {

            let eventCopy2 = {
              id: a.id,
              title: a.title,
              startTime: new Date(a.startTime),
              endTime: new Date(a.endTime),
              morning: a.morning,
              afternoon: a.afternoon,
              night: a.night,
              allDay: a.allDay,
              desc: a.desc,
            }

            this.eventDeletionArray.push(eventCopy2);
            console.log("copy");

            console.log(this.eventDeletionCopy);
            console.log("array");

            console.log(this.eventDeletionArray);


          });
        }))
        .subscribe((val) => {
          console.log("subscribe")
        }, (error) => {
          console.log('Error: ', error);
        });






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

      this.subscription = this.events.pipe(
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
    this.runOnce = true;

  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      morning: false,
      afternoon: false,
      night: false,
      allDay: false,
      condominio: this.currentCondo,
      creationDate: '',
      apt: '',
    };
  }

  addEventToDB() {
    this.subscription.unsubscribe();
    this.event.apt = this.localDatabaseService.getUserApt();
    this.calendarioDatabaseService.addCalendario(this.event, this.currentCondo);
    console.log("Add to DB");

    this.addEvent();
    console.log("Add event");


  }
  // Create the right event format and reload source
  addEvent() {

    this.event.endTime = this.event.startTime;

    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      morning: this.event.morning,
      afternoon: this.event.afternoon,
      night: this.event.night,
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
    if (eventCopy.morning) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), 9));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), 14));
    }
    if (eventCopy.afternoon) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), 15));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), 20));
    }
    if (eventCopy.night) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), 21));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), 26));
    }

    this.eventCopyString = eventCopy.startTime.toUTCString();

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    console.log("load events");
    this.blockingArray.push(this.eventCopyString);
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



  dateCheck() {
    console.log(this.blockingArray);
    this.eventDate = new Date(this.event.startTime).toUTCString();
    console.log(this.eventDate.substr(17));

    this.blockingArrayResult = this.blockingArray.filter(s => s.includes(this.eventDate.substr(0, 11)));
    this.blockingArrayResultMorning = this.blockingArrayResult.find(s => s.includes("09:00:00"));
    this.blockingArrayResultAfternoon = this.blockingArrayResult.find(s => s.includes("15:00:00"));
    this.blockingArrayResultNight = this.blockingArrayResult.find(s => s.includes("21:00:00"));
    console.log(this.blockingArrayResult);

    if (this.blockingArrayResult == []) {
      this.isMorningBlocked = false;
      this.isAfternoonBlocked = false;
      this.isNightBlocked = false;
    }

    if (this.blockingArrayResultMorning == undefined) {
      this.isMorningBlocked = false;
      console.log("122");
    }
    else {
      console.log("12");

      console.log(this.blockingArrayResultMorning);
      this.isMorningBlocked = true;
      console.log("12");

    }
    if (this.blockingArrayResultAfternoon == undefined) {
      this.isAfternoonBlocked = false;
      console.log("122");
    }
    else {
      this.isAfternoonBlocked = true;
      console.log("12");

    }
    if (this.blockingArrayResultNight == undefined) {
      this.isNightBlocked = false;
      console.log("122");
    }
    else {
      this.isNightBlocked = true;
      console.log("12");

    }






  }

  deleteEvent(id) {
    this.calendarioDatabaseService.deleteCalendario(id);
    
    this.showToast("Evento apagado com sucesso!");

  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      keyboardClose: true,
      color: "primary",
      showCloseButton: true,
      closeButtonText: "Fechar"
    }).then(toast => toast.present());
  }


}
