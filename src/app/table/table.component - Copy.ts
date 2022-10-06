import { Component, OnInit, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup,Validators,FormControl} from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  invoiceForm: any = FormGroup
  // isSelectAll: boolean = false;
  // title = 'dataTableDemo';
 
  // dtOptions: DataTables.Settings = {};
  // posts: any;

  fieldArray: Array<any> = [{
    "sno": "123455",
    "code": "7895255",
    "contry": "India",
    "goods": "84616463",
    "commodity": "6894",
    "quality": "120",
    "packageType": "testing",
    "status":"Active"
},{
  "sno": "123456",
  "code": "7895255",
  "contry": "India",
  "goods": "84616463",
  "commodity": "6894",
  "quality": "120",
  "packageType": "testing",
  "status":"Inactive"
},{
  "sno": "123457",
  "code": "7895255",
  "contry": "India",
  "goods": "84616463",
  "commodity": "6894",
  "quality": "120",
  "packageType": "testing",
  "status":"Inactive"
}];
  newAttribute: any = {};
  isDisplayRow:boolean=false;
    addFieldValue() {
      this.isDisplayRow == true
      
      this.fieldArray.unshift(this.newAttribute)
      this.newAttribute = {};
      this.isDisplayRow == false
      console.log("this.fieldArray", this.fieldArray);
      
    }
  
    deleteFieldValue() {
        // this.fieldArray.splice(i, 1);
    }
 
  constructor(private fb:FormBuilder,private http: HttpClient, ) {
 
    // this.http.get('http://jsonplaceholder.typicode.com/posts')
    //   .subscribe(posts => {
    //     this.posts = posts;
    // }, error => console.error(error));
  }
 
  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      newAttribute: [''],
      
    });
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
  }

  

  
  selectedProduct:any = [];
  isSelectedAll : boolean = false;
  isSelectAll:boolean =false;

  selectAll(isChecked:any){
    if(isChecked){ 
      console.log("selectAll event", isChecked);
      
      this.selectedProduct = [];
      for (let i = 0; i < this.fieldArray.length; i++) {
        const element = this.fieldArray[i];
        this.selectedProduct.push(element.sno);      
      }

      if(this.fieldArray.length == this.selectedProduct.length){
        this.isSelectAll = true;
        this.isSelectedAll = true;
      } else {
        this.isSelectAll = false;
        this.isSelectedAll = false;
      }
      console.log("this.selectedProduct", this.selectedProduct);
      
    } else{
      this.isSelectAll = false;
      this.selectedProduct = [];
    }

    
    
  }
  checkCheckBoxvalue(isChecked: any, ord: any){
    if(isChecked){
      console.log("checkCheckBoxvalue event", isChecked);
      if (this.selectedProduct.length == 0) {
        this.selectedProduct.push(ord);
      } else{        
        console.log("this.selectedProduct.length", this.selectedProduct.length);
        
        for (let index = 0; index < this.selectedProduct.length; index++) {
          console.log("index", index);
          
          const element = this.selectedProduct[index];
          console.log("element", element, ord);
          
          if (element == ord) {

            this.selectedProduct.splice(element);
          } else{
            this.selectedProduct.push(ord);
          }
        }
      }
      

    }else{
      // let removeIndex = this.selectedProduct.findIndex(pid => pid===ord);
      if(ord !== -1)
        this.selectedProduct.splice(ord,1);
    }
    console.log("this.selectedProduct", this.selectedProduct)

  }


}
