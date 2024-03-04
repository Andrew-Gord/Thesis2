import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalEvents } from '../Model/CalEvents';
import { JsonPipe } from '@angular/common';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
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
  
 

  constructor( private authService:AuthService,private http:HttpClient, private errorService:ErrorHandlerService) { }

  getHour(input:String){
    const hour = input.split(":")[0];
    return hour;
  }
  getMinute(input:String){
    const min = input.split(":")[1].split(" ")[0];
    return min;
  }
  getTotalSeconds(input:String){
    const hour = parseInt(input.split(":")[0])*3600;
    const min = parseInt(input.split(":")[1].split(" ")[0])*60;
    var seconds = hour+min;
    if(input.split(":")[1].split(" ")[1].toLowerCase()=== "pm"){
      seconds = seconds + 43200;
    }
    return seconds
  }

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

   
}
