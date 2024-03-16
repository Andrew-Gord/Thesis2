import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  where,
  query,
  getDocs,
  getDoc
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CalEvents } from '../Model/CalEvents';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public month:number;
  private eventCollection: CollectionReference<DocumentData>;
  private classCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    // var date1 = new Date(Date.UTC(2024,2,12));
    // for(var i = 0;i<12;i++){
    //   var W = ((((date1.getUTCDate())+ Math.floor(2.6*((((date1.getMonth()-1)%12)+12)%12)-0.2)-2*Math.floor(date1.getUTCFullYear()/100)+date1.getUTCFullYear()+Math.floor(date1.getUTCFullYear()/4)+Math.floor((date1.getUTCFullYear()/100)/4))%7)+7)%7
    //   console.log(date1.getUTCDate())
    //   console.log(W);
    //   date1.setDate(date1.getDate()+1);
    // }
    
    this.getMonth();
    this.classCollection = collection(this.firestore,'Classes');
    this.eventCollection = collection(this.firestore, 'Events');
  }

  

   async getMonth() {
    const monthref = doc(this.firestore,"Settings","Month")
    const monthsnap = await getDoc(monthref)
      // console.log(monthsnap.data());
      this.month = monthsnap.data()['month'];

     const date = new Date();
     if(date.getMonth() > this.month || date.getMonth() < this.month){
      updateDoc(monthref,{month:date.getMonth()})
     }
    //  console.log(this.month);
  }

  parseISOStringE(s, n) {
    var b = s.split("T");
    var d = n.split("T");
    const str = d[0].concat(" ",b[1])
    const date = new Date(str);
    // console.log(date);
    return date
  }
  parseISOStringC(s) {
    var b = s.split("T");
    const date = new Date(b[0]);
    // console.log(date);
    return date
  }


  async getEvent(id: string){
    var arr = [];
    const CalEventsDocumentReference = query(collection(this.firestore, "Events"), where("UserID", "==", id||null));
    const querySnapshot = await getDocs(CalEventsDocumentReference);
    querySnapshot.forEach((doc)=>{
      const data = doc.data();
      const newData = {
        //add the date part of data['date'] and the time part of start/end time, and then turn it from iso string to date.
        title:data['name'],
        UserID:data['UserID'],
        startTime:this.parseISOStringE(data['STime'],data['Date']),
        endTime:this.parseISOStringE(data['ETime'],data['Date']),
        Desc:data['desc'],
        allDay:data['allDay'],
      }
      arr.push(newData);
    //  console.log(newData.startTime);
    })
    return arr ;
  }

  async getClass(id: string){
    var arr = [];
    const CalEventsDocumentReference = query(collection(this.firestore, "Classes"), where("UserID", "==", id||null));
    const querySnapshot = await getDocs(CalEventsDocumentReference);
    querySnapshot.forEach((doc)=>{
      const data = doc.data();
      var date1=this.parseISOStringC(data['startDate']);
      var date2 = this.parseISOStringC(data['endDate']);
      date2.setDate(date2.getDate()+1)
      while(date1<date2){
        var W = ((((date1.getUTCDate()-1) + Math.floor(2.6*((((date1.getMonth()-1)%12)+12)%12)-0.2)-2*Math.floor(date1.getUTCFullYear()/100)+date1.getUTCFullYear()+Math.floor(date1.getUTCFullYear()/4)+Math.floor((date1.getUTCFullYear()/100)/4))%7)+7)%7
        data['repDays'].forEach((day)=>{
          if(W==day){
            const newData = {
              title:data['name'],
              UserID:data['UserID'],
              startTime:this.parseISOStringE(data['STime'],date1.toISOString()),
              endTime:this.parseISOStringE(data['ETime'],date1.toISOString()),
              Desc:data['Desc'],
      
              allDay:data['allDay']
            }
            arr.push(newData);
          }
        })
        date1.setDate(date1.getDate() + 1)
      }
      
     // console.log(newData);
    })
    return arr ;
  }

  createClass(CalEvents:any) {
    return addDoc(this.classCollection, CalEvents);
  }
  createEvent(data:any){
    return addDoc(this.eventCollection,data);
  }

  update(CalEvents: CalEvents) {
    const CalEventsDocumentReference = doc(
      this.firestore,
      `Events/${CalEvents.UserID}`
    );
    return updateDoc(CalEventsDocumentReference, { ...CalEvents });
  }

  // delete(id: string) {
  //   const CalEventsDocumentReference = doc(this.firestore, `CalEvents/${id}`);
  //   return deleteDoc(CalEventsDocumentReference);
  // }
}
