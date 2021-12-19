import { Injectable } from '@angular/core';
import { Model } from '../network/Model';

@Injectable({
  providedIn: 'root'
})
export class PepoleService {
  model:Model[]=[];

  constructor() { }
  GetPepole(){
    for(let i =0;i<8;i++){
      this.model.push({id:i,name:'name'+(i+1),title:"this Job title For linkedin ",isconnect:false,img:"https://picsum.photos/200"})
    }

    return this.model;
  }
}

