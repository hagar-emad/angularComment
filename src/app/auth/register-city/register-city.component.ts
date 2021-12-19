import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/registerUser.model';
import { AuthservicesService } from 'src/app/_services/authservices.service';

@Component({
  selector: 'app-register-city',
  templateUrl: './register-city.component.html',
  styleUrls: ['./register-city.component.scss']
})
export class RegisterCityComponent implements OnInit {
user!:User;
userName=localStorage.getItem("firstName");
  constructor(private route:Router,private auth:AuthservicesService) { }

  ngOnInit(): void {
  }
  saveCountry(form:User){
    var a:number=0;
    var b:number=0;
    var regex=/^[a-zA-Z]{4,10}$/;
    if(regex.test(form.country)){
      // localStorage.setItem("country",form.country);
document.getElementsByTagName("span")[0].innerHTML="";
document.getElementsByTagName("input")[0].classList.remove("is-invalid")

a=1;
    }else{
      document.getElementsByTagName("span")[0].innerHTML="please enter valid Country";
      document.getElementsByTagName("span")[0].style.color="red";
  document.getElementsByTagName("input")[0].classList.add("is-invalid")

      a=0;
    }
    if(regex.test(form.city)){
      // localStorage.setItem("city",form.city);
      document.getElementsByTagName("span")[1].innerHTML="";
document.getElementsByTagName("input")[1].classList.remove("is-invalid")

      b=1;
    }else{
      document.getElementsByTagName("span")[1].innerHTML="please enter valid City";
      document.getElementsByTagName("span")[1].style.color="red";
  document.getElementsByTagName("input")[1].classList.add("is-invalid")

      b=0;
    }
    if(a==1&&b==1){
      this.auth.createUser(form);
this.route.navigate(["/register/employe"]);
    }
  }

}
