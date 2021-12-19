import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifiService } from 'src/app/_services/notifi.service';
import { UserServiceService } from 'src/app/_services/user-service.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
arr:any=[]
  constructor(private active:ActivatedRoute,private user:UserServiceService,private router:Router,private nof: NotifiService,) { }

  ngOnInit(): void {
const query =this.active.snapshot.params.query;
this.user.getallUsers().subscribe(res=>{
  res.forEach(res1=>{
    let x:any=res1.data();
   if(x.firstName.toUpperCase()===query.toUpperCase()){
     this.arr.push(x);
   }

  })
})


  }
  updateConnecting(i:string) {

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
