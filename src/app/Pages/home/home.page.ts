import { Component } from '@angular/core';

import { CalendarComponent } from 'ionic7-calendar';
import { CalendarMode } from 'ionic7-calendar/calendar.interface';
import { Step } from 'ionic7-calendar/calendar.interface';

import { getAuth } from "firebase/auth";

import { FirestoreService } from 'src/app/Services/firestore.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    
  constructor(private eventsService:FirestoreService, private authService:AuthService) {}


  ngOnInit(){
    this.loadEvents();
  }
  eventSource:any;
    viewTitle:any;

    isToday:boolean=true;
    calendar = {
        mode: 'month' as CalendarMode,
        step: 30 as Step,
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };



    async loadEvents() {

        const events =  await this.eventsService.get(this.authService.userID);
        this.eventSource= events;
        //console.log(events);
    }

    onViewTitleChanged(title:String) {
        this.viewTitle = title;
    }

    onEventSelected(event:any) {    
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode:any) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev:any) {
        // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        //     (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    } 

    onRangeChanged(ev:any) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
