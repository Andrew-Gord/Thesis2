import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator,Validators } from '@angular/forms';
import { CalService } from 'src/app/Services/cal.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createVents:FormGroup;

  constructor(public calService:CalService, private fb:FormBuilder,) { }

  createFormGroup():FormGroup{
    return new FormGroup({
      Days:new FormControl([],[Validators.required]),
      Time: new FormControl("",[Validators.required])
    })
  }

  ngOnInit() {
    this.createVents= this.createFormGroup();
  }

  enterForm(){
    console.log(this.createVents.value.Days)
    console.log(this.createVents.value.Time)
  }

}
