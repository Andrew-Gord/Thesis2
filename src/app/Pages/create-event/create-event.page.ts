import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator,Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { CalService } from 'src/app/Services/cal.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createVents:FormGroup;
  ifTimeError:Boolean;

  constructor(public calService:CalService, private fb:FormBuilder,public loadingCtrl:LoadingController) { }

  createFormGroup():FormGroup{
    return new FormGroup({
      Name:new FormControl("",[Validators.required]),
      Days:new FormControl([],[Validators.required]),
      STime: new FormControl("",[Validators.required,Validators.pattern(/([0-12]|1[0-2]):[0-5][0-9] (PM|AM)/i)]),
      ETime: new FormControl("",[Validators.required,Validators.pattern(/([0-12]|1[0-2]):[0-5][0-9] (PM|AM)/i)])
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
      loading.dismiss();
      this.ifTimeError = false;
      this.createVents.reset();
    }

  }

}
