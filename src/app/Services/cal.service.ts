import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalService {
  public startDay=0;
  public monday = (1-this.startDay)%7;
  public tuesday = (2-this.startDay)%7;
  public wednesday = (3-this.startDay)%7;
  public thursday = (4-this.startDay)%7;
  public friday = (5-this.startDay)%7;
  public saturday = (6-this.startDay)%7;
  public sunday = (7-this.startDay)%7;
  

  constructor() { }

  getWeekday(day:number){
    const weekday = day%7;
    if(weekday == 0){
      return "Sunday";
    }
    if(weekday == 1){
      return "Monday";
    }
    if(weekday == 2){
      return "Tuesday";
    }
    if(weekday == 3){
      return "Wednesday";
    }
    if(weekday == 4){
      return "Thursday";
    }
    if(weekday == 5){
      return "Friday";
    }
    if(weekday == 6){
      return "Saturday";
    }
    else{
      return "Something has gone wrong";
    }
  }

  getEvents(){
    var events = [];
    var date = new Date();

    var startDay = 1;
    var startTime;
    var endTime;
    startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),0,50));
    endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),2,0));
    events.push({
        title: 'Event',
        startTime: startTime,
        endTime: endTime,
        allDay: false
    });
    events.push({
        title: 'Event',
        startTime: new Date(Date.UTC(2024,0,30)),
        endTime: new Date(Date.UTC(2024,0,31)),
        allDay: true
    })

    console.log(this.getWeekday(events[1].endTime.getDate()))
return events;
  }
}
