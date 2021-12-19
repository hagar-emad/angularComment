import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/registerUser.model';
import { AuthservicesService } from 'src/app/_services/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user!:User
mail=localStorage.getItem("email");
Pw=localStorage.getItem("password");
  constructor(private authService:AuthservicesService,private adAuth: AngularFireAuth,private router:Router) { }

  ngOnInit(): void {
this.adAuth.onAuthStateChanged((user)=>{
  if (localStorage.getItem("token")) {this.router.navigate(["/home"])}
})
  }
  onLogin(form:User){
// if(form.email==this.mail){
//   alert("same mail")
// }else{
//   alert("your mail wrong")
// }

// if(form.password==this.Pw){
//   alert("same pw");
// }else{
//   alert("wrong pw");
// }
this.authService.loginUser(form).then((res)=>{
  console.log(res.user.uid);
  localStorage.setItem("token",res.user.uid)
  this.router.navigate(["/home"])

})

  }

}
