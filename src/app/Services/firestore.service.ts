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
    this.getMonth();
    this.classCollection = collection(this.firestore,'Classes');
    this.eventCollection = collection(this.firestore, 'Events');
  }

  

   async getMonth() {
    const monthref = doc(this.firestore,"Settings","Month")
    const monthsnap = await getDoc(monthref)
      console.log(monthsnap.data());
      this.month = monthsnap.data()['month'];

     const date = new Date();
     if(date.getMonth() > this.month || date.getMonth() < this.month){
      updateDoc(monthref,{month:date.getMonth()})
     }
     console.log(this.month);
  }


  async give(data:CalEvents){

  }

  async get(id: string){
    var arr = [];
    const CalEventsDocumentReference = query(collection(this.firestore, "Events"), where("UserID", "==", id));
    const querySnapshot = await getDocs(CalEventsDocumentReference);
    querySnapshot.forEach((doc)=>{
      const data = doc.data();
      const newData = {
        title:data['name'],
        UserID:data['UserID'],
        startTime:data['startTime'].toDate(),
        endTime:data['endTime'].toDate(),
        Desc:data['Desc'],
        RepDays:data['RepDays'],
        RepWeek:data['RepWeek'],
        allDay:data['allDay']
      }
      arr.push(newData);
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
