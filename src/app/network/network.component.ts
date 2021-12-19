import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { req } from '../_models/request.model';
import { NotifiService } from '../_services/notifi.service';
import { UserServiceService } from '../_services/user-service.service';
import { Model } from './Model';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {
  userID: string | null = '';
  person1: any = [];
  newID: string = '';
  ayhaga: number = 0;
  newid!: string;
  newReq!: req;
  array: any = [];
  set = new Set();
  isconnetion: boolean = false;

  model: Model[] = [];
  constructor(
    public ay: NotifiService,
    private fire: AngularFirestore,
    private ayy: UserServiceService,
    private router: Router
  ) {
    // this.array.push(this.ay.person1);
    // this.ayhaga= this.fire.collection("notifications").doc(this.newid).snapshotChanges();S
  }
  ngOnInit(): void {
    // this.array.push(this.ay.person1);

    if (this.array.length > 1) {
      this.isconnetion = true;
    }

    this.userID = localStorage.getItem('token');
    if (this.userID) {
      this.newID = this.userID;
    }

    // let db = this.fire.collection('notifications').snapshotChanges();
    // db.subscribe((res) => {
    //   res.forEach((res1) => {
    //     let x: any = res1.payload.doc.data();
    //     let x1: any = res1.payload.doc;
    //     // console.log(res1.payload.doc.id);

    //     if (x1.data().sendTo == this.userID && x1.data().status === 'Pending') {
    //       this.person1.push(x1);


    //     }
    //   });
    // });
    this.PopulateNotifications()
    console.log(this.person1);
// this.reloadComponent()

  }
  addmodels(models: Model[]) {
    console.log('😂😂😂😂😂😂', models);

    this.model = models;
  }
  isConnectionFunc() {
    this.isconnetion = true;
  }
  PopulateNotifications() {
    let db = this.fire.collection('notifications').get();
    db.subscribe((res) => {
      res.forEach((res1) => {
        // let x: any = res1.data();
        let x1: any = res1;
        // console.log(res1.payload.doc.id);

        if (x1.data().sendTo == this.userID && x1.data().status === 'Pending') {
          this.person1.push(x1);

        }
      });
    });
    // this.reloadComponent()
  }

 Accept(id: string, i: number) {
    this.newid = id;
    console.log(id);
    // let req = this.fire.collection('notifications').doc(id).snapshotChanges();
    let friendList;

this.ayy.acceptRequest(id).subscribe((res)=>{
  this.fire.collection('FriendList').add({sendFrom:res.payload.data().sendFrom,
    sendTo:res.payload.data().sendTo,dataTime:new Date().toLocaleString()});
    this.fire.collection('notifications').doc(id).delete();
    this.reloadComponent();

})
    // req.subscribe(async (res) => {
    //   console.log(res.payload.data());
    //   this.newReq =await res.payload.data() as req;
    // });
    console.log(this.newReq);
    if (this.newReq) {
      friendList = {
        friendID: this.newReq.sendFrom,
        userID: this.newReq.sendTo,
      };
      // this.newReq.status="Accept";
      // this.fire.collection("notifications").doc(id).update(this.newReq)

      // this.fire.collection('FriendList').add(friendList);
    }
  }
  Reject(id: string, i: number) {
    this.ayy.deleteRequest(id);

this.reloadComponent()
    // this.router.navigateByUrl('/refresh',{skipLocationChange:true}).then(()=>{this.router.navigate(["/Network"])})
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
