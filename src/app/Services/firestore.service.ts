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
  getDocs
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CalEvents } from '../Model/CalEvents';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private eventCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.eventCollection = collection(this.firestore, 'Events');
  }

  

   getAll() {
    return collectionData(this.eventCollection) as Observable<CalEvents[]>;
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

  create(CalEvents: CalEvents) {
    return addDoc(this.eventCollection, CalEvents);
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
