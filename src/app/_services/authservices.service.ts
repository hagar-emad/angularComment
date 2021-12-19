import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { User } from '../_models/registerUser.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor(private afAuth:AngularFireAuth,private AngularFire:AngularFirestore) { }
  signupUser(user: User): Promise<any> {
console.log(user);

    return this.afAuth.createUserWithEmailAndPassword(user.email,user.password)

}
loginUser(user:User): Promise<any> {
  return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
}

// getUserDoc(id:User){return this.AngularFire.collection("users").doc(id.ID).valueChanges()}

createUser(user:User){
  this.afAuth.onAuthStateChanged((users)=>{
    console.log(users?.uid);

    return new Promise<any>((resolve,reject)=>{
      this.AngularFire.collection("Users").doc(users?.uid).set(user,{merge:true}).then((res)=>{console.log(res);
      })
    })

  })
 ;


}

}
