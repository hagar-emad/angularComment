import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserServiceService } from '../_services/user-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  @ViewChild('msgss') msgss!: ElementRef;
  userID: string | any = '';
  newID: string | null = '';
  ayhaga: any;
  name!: string;
  person1: any[] = [];
  person2: any[] = [];
  person3: any[] = [];

  constructor(
    private fire: AngularFirestore,
    private user: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // this.update=interval(3000).subscribe((val)=>{this.sendMsg()})
    this.person1 = [];
    this.userID = localStorage.getItem('token');
    let db = this.fire.collection('FriendList').get();
    db.subscribe((res) => {
      res.forEach((res1) => {
        let x: any = res1.data();
        // let x1: any = res1.payload.doc;

        if (x.sendTo == this.userID) {
          console.log(x);
          this.user.getuserDoc(x.sendFrom).subscribe((res) => {
            this.person1.push(res.payload.data());
          });
        } else if (x.sendFrom == this.userID) {
          console.log(this.person1);
          this.user.getuserDoc(x.sendTo).subscribe((res) => {
            this.person1.push(res.payload.data());
          });
        }
      });
    });
  }
  show(id: string | any) {
    this.person2 = [];
    this.ayhaga = id;
    console.log(id);
    this.newID = id.ID;
    this.name = id.firstName + ' ' + id.lastName;
    let db1 = this.fire.collection('messages').get();

    db1.subscribe((res) => {
      console.log(res);
      res.forEach((res1) => {
        let x: any = res1.data();
        if (x.sendFrom == this.userID && x.sendto == this.newID) {
          this.person2.push(x);
          this.person2.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        } else if (x.sendFrom == this.newID && x.sendto == this.userID) {
          this.person2.push(x);
          this.person2.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        }
      });
    });

    console.log(this.person2);
  }
  sendMsg() {
    let msg = (this.msgss.nativeElement as HTMLInputElement).value;
    this.person2 = [];
    this.fire
      .collection('messages')
      .add({
        date: new Date().toLocaleString(),
        sendFrom: this.userID,
        sendto: this.newID,
        message: msg,
        name: this.name,
      });

    (this.msgss.nativeElement as HTMLInputElement).value = '';
    this.show(this.ayhaga);
    console.log(this.person2);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
