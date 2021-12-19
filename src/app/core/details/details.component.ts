import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/registerUser.model';
import { UserServiceService } from 'src/app/_services/user-service.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  person!: User|any;

  constructor(private acivatedRoute:ActivatedRoute,private user: UserServiceService,
    private auth: AngularFireAuth) { }

  ngOnInit(): void {
    // console.log(this.acivatedRoute.snapshot.params.id);

const id =this.acivatedRoute.snapshot.params.id

const us =this.user.getuserDoc(id).subscribe(res1=>{
  this.person=res1.payload.data();
})
  }

}
