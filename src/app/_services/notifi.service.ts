import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';
import { BehaviorSubject, merge } from 'rxjs';
import { User } from '../_models/registerUser.model';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class NotifiService {
  currentMessage = new BehaviorSubject(null);
  userID: string | null = '';
  newID: string = '';
  person!: User | any;
  person1:any=[];
keys!:string;
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private user: UserServiceService,
    private fire: AngularFirestore,
    private router:Router
  ) {
    this.userID = localStorage.getItem('token');
    if (this.userID) {
      this.newID = this.userID;
    }
    this.user.getuserDoc(this.newID).subscribe((res) => {
      console.log(res.payload.data());
      this.person = res.payload.data();
    });

    let db = this.fire.collection('notifications').snapshotChanges();
    db.subscribe(res=>{res.forEach(res1=>{
    let x:any=  res1.payload.doc.data();
    let x1:any=  res1.payload.doc;
    // console.log(res1.payload.doc.id);

    if(x1.data().sendTo==this.userID&&x1.data().status==="Pending"){
      this.person1.push(x1);
    }
    })})


  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log('Permission granted! Save to the server!', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );


  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((msg) => {
      console.log(msg);
    });
  }

  SendRequest(key: string) {
    // console.log(key);

// this.keys=key;
    let notification = {
      sendTo: key,
      sendFrom: this.person.ID,
      firstname: this.person.firstName,
      lastname: this.person.lastName,
      // photo: '',
      dateTime: new Date().toLocaleString(),
      status: 'Pending',
    };

    this.fire
      .collection('notifications')
      .add(notification)
      // .doc(key)
      // .set(notification,{merge:true})
      .then((res) => {
        // console.log(res);
      });
// this.reloadComponent()

  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}
