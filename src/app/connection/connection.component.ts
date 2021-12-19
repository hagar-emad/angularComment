import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  constructor(private route: ActivatedRoute,private fire: AngularFirestore,private user:UserServiceService) { }
  model:any;
  userID: string | null = '';
  person1: any = [];

  ngOnInit(): void {
    this.userID=localStorage.getItem("token");
    let db = this.fire.collection('FriendList').snapshotChanges();
    db.subscribe((res) => {
      res.forEach((res1) => {
        let x: any = res1.payload.doc.data();
        let x1: any = res1.payload.doc;


        if (x1.data().sendTo == this.userID) {
          console.log(x1);
this.user.getuserDoc(x1.data().sendFrom).subscribe(res=>{this.person1.push(res.payload.data());
})


        }else if(x1.data().sendFrom == this.userID){
          console.log(this.person1);
          this.user.getuserDoc(x1.data().sendTo).subscribe(res=>{ this.person1.push(res.payload.data());
          })
        }
      });
    });
  }
}
