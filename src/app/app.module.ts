import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { NgCalendarModule } from 'ionic7-calendar';

import { AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthInterceptorService } from './Services/auth-interceptor.service';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      NgCalendarModule,
      AngularFireModule.initializeApp(environment.firebase),
      HttpClientModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ncfcalendar-2355c","appId":"1:511490840568:web:affce205c2dfb4c3dae80d","storageBucket":"ncfcalendar-2355c.appspot.com","apiKey":"AIzaSyBvRVWJ7GnEnKMWId5fNQULOticA_AmnDE","authDomain":"ncfcalendar-2355c.firebaseapp.com","messagingSenderId":"511490840568","measurementId":"G-QE9Z9B0ZGE"})), provideAuth(() => getAuth()),
  AngularFireAuthModule,
  provideFirestore(() => getFirestore())],
  providers: [{ provide:  RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
