import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator,Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
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
  

  constructor(public calService:CalService, private fb:FormBuilder,private loadingCtrl:LoadingController,private firestore: FirestoreService,
    private authService:AuthService) { }



  createFormGroup():FormGroup{
    return new FormGroup({
      Name:new FormControl("",[Validators.required]),
      Desc:new FormControl("",[Validators.required]),
      Days:new FormControl([],[Validators.required]),
      STime: new FormControl(new Date().toISOString(),Validators.required),
      ETime: new FormControl(new Date().toISOString(),Validators.required),
      startDate:new FormControl(new Date().toISOString(),Validators.required),
      endDate:new FormControl(new Date().toISOString(),Validators.required),
      
    })
  }
  
 //Create an autofill setting that lets you use last weeks classes, instead of having to repeat it every week.
  
  ngOnInit() {
    this.createVents= this.createFormGroup();

  }

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
        startDate: this.createVents.value.startDate,
        endDate: this.createVents.value.endDate,
        STime:this.createVents.value.STime,
        ETime: this.createVents.value.ETime,
        UserID:this.authService.userID,
        repDays:this.createVents.value.Days
      }
      console.log(this.createVents.value);
      console.log(event);
      this.firestore.createClass(event);
      loading.dismiss();
      this.ifTimeError = false;
      this.createVents.reset();
    }

  }


}
