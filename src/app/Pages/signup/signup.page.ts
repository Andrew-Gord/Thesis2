import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';  

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUp:FormGroup;
  constructor(public formBuilder:FormBuilder, public loadingCtrl:LoadingController, public authServ:AuthService, public router:Router) { }
  
  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }
  ngOnInit() {
    this.signUp=this.createFormGroup();
  }

  get errorControl(){
    return this.signUp.controls;
  }

  async signup(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.signUp.valid){
      const user = await this.authServ.registerUser(this.signUp.value.email,this.signUp.value.password).catch((error)=>{
        console.log(error);
        loading.dismiss();
      })

      if(user){
        loading.dismiss();
        this.router.navigate(['/login'])
      } else{
        console.log('Provide correct values');
      }
    }
  }

}
