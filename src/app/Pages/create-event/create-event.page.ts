import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator,Validators } from '@angular/forms';
import { IonDatetime, LoadingController } from '@ionic/angular';
import { ISO_8601 } from 'moment';
import { AuthService } from 'src/app/Services/auth.service';
import { CalService } from 'src/app/Services/cal.service';
import { FirestoreService } from 'src/app/Services/firestore.service';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createVents:FormGroup;
  ifTimeError:Boolean;
  allDays=false;
  date:any;

  constructor(public calService:CalService, private fb:FormBuilder,private loadingCtrl:LoadingController,private firestore: FirestoreService,
    private authService: AuthService) { }
  private timeValidators=[Validators.pattern(/([0-12]|1[0-2]):[0-5][0-9] (PM|AM)/i)];


  createFormGroup():FormGroup{
    return new FormGroup({
      Name:new FormControl("",[Validators.required]),
      Desc:new FormControl("",[Validators.required]),
      Date:new FormControl(new Date().toISOString(),Validators.required),
      AllDay:new FormControl(false,[Validators.required]),
      STime: new FormControl(new Date().toISOString()),
      ETime: new FormControl(new Date().toISOString()),

      
    })
  }
  
 //Create an autofill setting that lets you use last weeks classes, instead of having to repeat it every week.
  
  ngOnInit() {
    this.createVents= this.createFormGroup();

  }
// this.calService.getTotalSeconds(this.createVents.value.STime) >= this.calService.getTotalSeconds(this.createVents.value.ETime)
  async enterForm(){
    const loading = await this.loadingCtrl.create();
    await loading.present(); 
    if(false){
      console.log("Error: End time is before Start time.")
      this.ifTimeError=true;
      loading.dismiss();
    }
    else{
      // Create a model for "event" and then send this form data as an event or events to the calservice

      const event = {
        name:this.createVents.value.Name,
        desc:this.createVents.value.Desc,
        AllDay:this.createVents.value.AllDay,
        Date: this.createVents.value.Date,
        STime:this.createVents.value.STime,
        ETime: this.createVents.value.ETime,
        UserID:this.authService.userID
      }
      this.firestore.createEvent(event);
      loading.dismiss();
      this.ifTimeError = false;
      this.createVents.reset();
    }

  }

  alldayChange(){
    this.allDays=!this.allDays;
  }
}
