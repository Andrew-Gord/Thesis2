import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator,Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { CalService } from 'src/app/Services/cal.service';
import { FirestoreService } from 'src/app/Services/firestore.service';

@Component({
  selector: 'app-createclasses',
  templateUrl: './createclasses.page.html',
  styleUrls: ['./createclasses.page.scss'],
})
export class CreateclassesPage implements OnInit {

  createVents:FormGroup;
  ifTimeError:Boolean;
  allDays:Boolean;

  constructor(public calService:CalService, private fb:FormBuilder,private loadingCtrl:LoadingController,private firestore: FirestoreService) { }
  private timeValidators=[Validators.pattern(/([0-12]|1[0-2]):[0-5][0-9] (PM|AM)/i)];


  createFormGroup():FormGroup{
    return new FormGroup({
      Name:new FormControl("",[Validators.required]),
      Desc:new FormControl("",[Validators.required]),
      Days:new FormControl([],[Validators.required]),
      STime: new FormControl("",this.timeValidators),
      ETime: new FormControl("",this.timeValidators),
      EndDate:new FormControl("",[Validators.required]),
      
    })
  }
  
 //Create an autofill setting that lets you use last weeks classes, instead of having to repeat it every week.
  
  ngOnInit() {
    this.createVents= this.createFormGroup();

  }

  async enterForm(){
    const loading = await this.loadingCtrl.create();
    await loading.present(); 
    if(this.calService.getTotalSeconds(this.createVents.value.STime) >= this.calService.getTotalSeconds(this.createVents.value.ETime)){
      console.log("Error: End time is before Start time.")
      this.ifTimeError=true;
      loading.dismiss();
    }
    else{
      // Create a model for "event" and then send this form data as an event or events to the calservice
      console.log(this.calService.getTotalSeconds(this.createVents.value.STime));
      console.log(this.calService.getTotalSeconds(this.createVents.value.ETime));
      this.firestore.createClass(this.createVents.value);
      loading.dismiss();
      this.ifTimeError = false;
      this.createVents.reset();
    }

  }
  alldayChange(){
    this.allDays=!this.allDays;
  }

}
