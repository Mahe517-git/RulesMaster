import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{BehaviorSubject, Observable,Subject} from 'rxjs'
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class DataService {

  behaviorSubject=new BehaviorSubject({})

  constructor(private http:HttpClient) { }

  getData(){
   return this.http.get<any[]>('http://localhost:3000/fileNameList')
  }

  getRules(){
    return this.http.get<any[]>('http://localhost:3000/ruledata1')
   }

   saveRule(payload:any){
      return this.http.post('http://localhost:3000/ruledata1',payload)
   }

   update(payload:any){
    return this.http.put(`http://localhost:3000/ruledata1/${payload.id}`,payload)
   }

   deleteRule(id:number){
    return this.http.delete(`http://localhost:3000/ruledata1/${id}`)
   }

  passMapingDetails(obj:any){
    this.behaviorSubject.next(obj)
  }

 
}
