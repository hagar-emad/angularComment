import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Model } from '../network/Model';
import { User } from '../_models/registerUser.model';
import { NotifiService } from '../_services/notifi.service';
import { UserServiceService } from '../_services/user-service.service';
import { PepoleService } from './pepole.service';

@Component({
  selector: 'app-connect-card',
  templateUrl: './connect-card.component.html',
  styleUrls: ['./connect-card.component.css'],
})
export class ConnectCardComponent implements OnInit {
  userID: string | null = '';
  newID: string = '';
  person!: User|any;
  person1:any=[];
  users: User[] | any = [];
  users1: User[] | any = [];
  model: Model[] = [];
  friendmodel: Model[] = [];
  friendlen: number = 0;
  @Output() newItemEvent = new EventEmitter<Model[]>();
  constructor(
    private _pepoleService: PepoleService,
    private user: UserServiceService,
    private nof: NotifiService,
    private fire:AngularFirestore,
    private router:Router
  ) {}

  ngOnInit(): void {


    this.model = this._pepoleService.GetPepole();
    this.model.forEach((res) => {
      if (res.isconnect == true) {
        this.friendmodel.push(res);
      }
    });
    this.user.getallUsers().subscribe((res) => {
      console.log(res);

      res.forEach((us) => {
        this.users.push(us.data());
      });
    });

    this.userID = localStorage.getItem('token');
    if (this.userID) {
      this.newID = this.userID;
    }
    this.user.getuserDoc(this.newID).subscribe(res => {
      // console.log(res.payload.data());
      this.person=res.payload.data();
    });
    // this.users1=this.users.filter((nw:any)=>nw==this.person)

  }

  updateConnecting(i:string) {
// this.reloadComponent()
    this.nof.SendRequest(i);
this.reloadComponent();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }


}
