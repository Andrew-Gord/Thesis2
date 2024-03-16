import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public authService:AuthService) {}

  logout(){
    console.log(this.authService.signout);
    
  }
}
