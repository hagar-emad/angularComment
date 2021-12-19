import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/registerUser.model';
import { AuthservicesService } from 'src/app/_services/authservices.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {
@ViewChild('selectInput') select!:ElementRef;
  constructor(private auth:AuthservicesService,private rout: Router) { }

  ngOnInit(): void {
  }
  saveEmploye(form:User){
    var a:number=0;
    var b:number=0;
    var c:number=0;
    var regex=/^[a-zA-Z\s]+$/;
    if(regex.test(form.jobTitle)){
      // localStorage.setItem("jobTitle",form.jobTitle);
document.getElementsByTagName("span")[0].innerHTML="";
a=1;
    }else{
      document.getElementsByTagName("span")[0].innerHTML="please enter valid jobTitle";
      document.getElementsByTagName("span")[0].style.color="red";
      a=0;
    }
    if(regex.test(form.company)){
      // localStorage.setItem("company",form.company);
      document.getElementsByTagName("span")[1].innerHTML="";
      b=1;
    }else{
      document.getElementsByTagName("span")[1].innerHTML="please enter valid Company";
      document.getElementsByTagName("span")[1].style.color="red";
      b=0;
    }
    let select1 = (this.select.nativeElement as HTMLSelectElement).value;
    if(select1==""){
      c=0;
      document.getElementsByTagName("span")[2].innerHTML="please enter Choose one";
      document.getElementsByTagName("span")[2].style.color="red";
// this.route.navigate(["/register/employe"]);
    }else{
      console.log(select1);
      form.employmentType=select1;

      // localStorage.setItem("employmentType",select1);
      document.getElementsByTagName("span")[2].innerHTML="";
      c=1;
    }
    if(a==1&&b==1&&c==1){
      this.auth.createUser(form);
      this.rout.navigate(["/login"])
    }
  }
}
