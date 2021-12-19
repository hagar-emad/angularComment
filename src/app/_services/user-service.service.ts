import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../_models/registerUser.model';
import { Observable } from 'rxjs';

// import { Userk } from '../models/userk.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
private users!:User[];
// private users:Userk[]=[
//   {id:1,name:'khalil Emad',imgUrl:'../assets/Images/img.jpg'},
//   {id:2,name:'Muhammed Yousef',imgUrl:'../assets/Images/img.jpg'},
//   {id:3,name:'Hager Emad',imgUrl:'../assets/Images/img.jpg'},
//   {id:4,name:'Mostafa Abdellah',imgUrl:'../assets/Images/img.jpg'},
// ]

  constructor(private fire:AngularFirestore) { }
  getuserDoc(id:string){
    return this.fire.collection("Users").doc(id).snapshotChanges();
  }
  getallUsers(){
    return this.fire.collection("Users").get();
  }
  getReqDoc(id:string):Observable<any>{
    return this.fire.collection("notifictions").doc(id).snapshotChanges();
  }
  deleteRequest(id:string){
    return this.fire.collection("notifications").doc(id).delete();
  }
  acceptRequest(id:string):Observable<any>{
    return this.fire.collection("notifications").doc(id).snapshotChanges();
  }


}
