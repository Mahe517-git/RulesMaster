import { Injectable,NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpEvent, HttpEventType } from '@angular/common/http';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor( private http: HttpClient,) { }

  
  tooggleModal($id:any,$action:any){
    return $(`#${$id}`).modal($action);
   }
}
