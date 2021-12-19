import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/registerUser.model';
import { AuthservicesService } from 'src/app/_services/authservices.service';

@Component({
  selector: 'app-register-name',
  templateUrl: './register-name.component.html',
  styleUrls: ['./register-name.component.scss']
})
export class RegisterNameComponent implements OnInit {
  @ViewChild('test1') btn!:ElementRef;
  @ViewChild('test2') btn1!:ElementRef;

user!:User;
isModal=false
  constructor(private route:Router,private authServ:AuthservicesService,private fire:AngularFireAuth) { }

  ngOnInit(): void {
  }
  saveName(form:User){
    var a:number=0;
    var b:number=0;
    var regex=/^[a-zA-Z]{4,10}$/;
    if(regex.test(form.firstName)){
      // localStorage.setItem("firstName",form.firstName);
document.getElementsByTagName("span")[0].innerHTML="";
document.getElementsByTagName("input")[0].classList.remove("is-invalid")

a=1;
    }else{
      document.getElementsByTagName("span")[0].innerHTML="please enter valid name";
      document.getElementsByTagName("span")[0].style.color="red";
  document.getElementsByTagName("input")[0].classList.add("is-invalid")

      a=0;
    }
    if(regex.test(form.lastName)){
      // localStorage.setItem("lastName",form.lastName);
      document.getElementsByTagName("span")[1].innerHTML="";
document.getElementsByTagName("input")[1].classList.remove("is-invalid")

      b=1;
    }else{
      document.getElementsByTagName("span")[1].innerHTML="please enter valid name";
      document.getElementsByTagName("span")[1].style.color="red";
  document.getElementsByTagName("input")[1].classList.add("is-invalid")

      b=0;
    }
    if(a==1&&b==1){
      this.fire.onAuthStateChanged((id)=>{form.ID=id?.uid})
      this.authServ.createUser(form);
      (this.btn.nativeElement as HTMLButtonElement).setAttribute("data-bs-toggle","modal");
      (this.btn1.nativeElement as HTMLButtonElement).setAttribute("data-bs-dismiss","modal");


    }
  }
  security(form1:User){
    let count=0;
    if(form1.security=="I'm Human"){
      this.route.navigate(["/register/city"]);

      // console.log(form1.security);
      document.getElementsByTagName("span")[2].innerHTML="";

      count=1;

    }else{
      document.getElementsByTagName("span")[2].style.color="red";
      document.getElementsByTagName("span")[2].innerHTML="please write I'm Human";
      count=0;
    }
    if(count==1){

    }

  }


}
