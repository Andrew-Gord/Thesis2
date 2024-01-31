import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormBuilder, FormControl, FormGroup,Validator,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';  
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logForm:FormGroup;
  constructor(public formBuilder:FormBuilder, public loadingCtrl:LoadingController, public authServ:AuthService, public router:Router) { }
  
  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }

  ngOnInit() {
    this.logForm= this.createFormGroup();
  }


  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.logForm.valid){
      const user = await this.authServ.loginUser(this.logForm.value.email,this.logForm.value.password).catch((error)=>{
        console.log(error);
        loading.dismiss();
      })

      if(user){
        loading.dismiss();
        this.router.navigate(['/home'])
      } else{
        console.log('Provide correct values');
      }
    }
  }
}
