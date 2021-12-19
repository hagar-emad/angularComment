import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/registerUser.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthservicesService } from 'src/app/_services/authservices.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
user!:User;
@ViewChild('btnAzmele') btn1!:ElementRef;
  constructor(private route:Router,private authService:AuthservicesService,private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }
  onRegister(form:User){
    var a:number=0;
    var b:number=0;
var regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(regex.test(form.email)){
// localStorage.setItem("email",form.email);
document.getElementsByTagName("span")[0].innerHTML="";
document.getElementsByTagName("input")[0].classList.remove("is-invalid")

a=1;
}else{
  document.getElementsByTagName("span")[0].innerHTML="please enter valid mail";
  document.getElementsByTagName("span")[0].style.color="red";
  document.getElementsByTagName("input")[0].classList.add("is-invalid")

  a=0;
}
// let passw=userForm.password;
var regex1=/^[a-zA-Z0-9]{6,10}$/;
if(regex1.test(form.password)){
// localStorage.setItem("password",form.password);
document.getElementsByTagName("span")[1].innerHTML="";
document.getElementsByTagName("input")[1].classList.remove("is-invalid")

b=1;
}else{
  document.getElementsByTagName("span")[1].innerHTML="please enter valid password between 5-10";
  document.getElementsByTagName("span")[1].style.color="red";
  document.getElementsByTagName("input")[1].classList.add("is-invalid")
  b=0;
}
if(a==1&&b==1){

  this.authService.signupUser(form).then((res)=>{

    console.log(res.user.uid);
    form.ID=res.user.uid;


})
this.route.navigate(["/register/name"]);
}

  }

}
