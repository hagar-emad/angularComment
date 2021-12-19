import { Injectable } from '@angular/core';
import { footer } from '../_models/footer.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutFooterService {
Footer:footer[]=[
{id:1,name:"About"},
{id:2,name:"Accessibilty"},
{id:3,name:"User Agreement"},
{id:4,name:"Privcy Policy"},
{id:5,name:"Cookie Policy"},
{id:6,name:"Copyright Polict"},
{id:7,name:"Brand Policy"},
{id:8,name:"Guest Controls"},
{id:9,name:"Community Guidelines"},
]
  constructor() { }
  getAllFooter():footer[]{
return [...this.Footer]
  }
}
