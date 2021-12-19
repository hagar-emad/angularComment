import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/_models/registerUser.model';
import { UserServiceService } from 'src/app/_services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userID: string | null = '';
  newID: string = '';
  person!: User|any;
  // newPerson:object={}
  constructor(
    private user: UserServiceService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.userID = localStorage.getItem('token');
    if (this.userID) {
      this.newID = this.userID;
    }
    // this.auth.onAuthStateChanged((user)=>{this.userID!=user?.uid});
    this.user.getuserDoc(this.newID).subscribe(res => {
      console.log(res.payload.data());
      this.person=res.payload.data();
    });
    console.log(this.person);

    // console.log(this.user.getuserDoc("ePsjAmsaqShDbam0TWrzuCGcAiF2"));


    //  this.user.getuserDoc("ePsjAmsaqShDbam0TWrzuCGcAiF2");
  }
  // ngDoCheck():void{
  //   console.log(this.person.firstName);
  //   // if(this.person){
  //   //   this.newPerson=this.person
  //   // }
  // }
}
