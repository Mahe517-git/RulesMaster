import { Component, OnInit, ViewChild, NgZone, ElementRef, ViewChildren, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MainServiceService } from '../Services/main-service.service';
import { DataService } from '../Services/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
   selector: 'app-table',
   templateUrl: './table.component.html',
   styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterContentInit {
   invoiceForm: any = FormGroup

   formAddRule: FormGroup;

   isSelectAll: boolean = false;
   title = 'dataTableDemo';

   dtOptions: DataTables.Settings = {};
   posts: any;
   valueField: any;
   category: any;
   version: any;
   valueCheck: any;
   attribute: any = []
   chipsList: any = []
   @ViewChildren("checkbox") checkbox: any;
   @ViewChildren("tr") tr: any;
   @ViewChild("all") all: any;

   ruledata: any = [];

   selectedDataColumns: any;
   newAttribute: any = {};
   isDisplayRow: boolean = false;
   addNewRow() {
      this.isDisplayRow = true

      //   this.ruledata.unshift(this.newAttribute)
      this.newAttribute = {};
      //   this.isDisplayRow == false
      // console.log("this.isDisplayRow", this.isDisplayRow);

   }

   constructor(private fb: FormBuilder, private http: HttpClient, private mainService: MainServiceService, private data: DataService,private toastr: ToastrService) {

   }

   ngOnInit(): void {
      this.invoiceForm = this.fb.group({
         newAttribute: [''],

      });
      this.dtOptions = {
         pagingType: 'full_numbers',
         pageLength: 5,
         processing: true
      };


      this.formAddRule = this.fb.group(
         {
            ruleid: [null],
            rule: [],
            ruleDescription: [],
            valueField: ['', Validators.required],
            valueCheck: ['', Validators.required],
            category: ['', Validators.required],
            version: ['', Validators.required],
            isSelected: [false]
         })

      this.loadRules();
      this.data.behaviorSubject.subscribe((res: any) => {
         this.selectedDataColumns = res;
         this.selectedDataColumns.selectedColumns.forEach((item: any) => {
            var obj = {
               "id": null,
               "columnname": item,
               "mappedRule": [],
               "chipsList": []
            }
            this.attribute.push(obj);
         });
         // console.log(this.attribute)
      })



      for (let index = 0; index < this.attribute.length; index++) {
         const element = this.attribute[index];

         for (let j = 0; j < element.mappedRule.length; j++) {
            const newElement = element.mappedRule[j];
            if (this.chipsList.length <= 4) {
               this.chipsList.push(newElement)
               // console.log("newElement", newElement);
            }
         }
         this.attribute[index].chipsList = this.chipsList
         this.chipsList = []

      }
      // console.log("this.chipsList", this.chipsList);
      // console.log("this.attribute", this.attribute)

   }

   loadRules() {
      this.data.getRules().subscribe(rules => {
         this.ruledata = rules;
      })
   }

   ngAfterContentInit(): void {
      console.log(this.all)
   }
   // public assignRules(id:any){

   // }
   selectedData: any;
   addFieldValue(post: any) {
      //console.log("post", post)
      this.selectedRules = [];
      this.selectedData = post;
      this.checkbox._results.forEach((element: any) => {
         element.nativeElement.checked = false;
      });
      // this.AllCheckbox.nativeElement.checked = false;

      this.mainService.tooggleModal('information_modal', 'show');
      this.all.nativeElement.checked = false;
      //console.log(this.checkedList, "this.checkedList");

   }
   displayChipsList(post: any) {
      this.selectedData = post;
      // console.log("this.selectedData", this.selectedData);

      this.mainService.tooggleModal('Chips_modal', 'show');

   }
   closeModel() {
      this.mainService.tooggleModal('information_modal', 'hide');
      this.mainService.tooggleModal('Chips_modal', 'hide');
   }

   // checklist:any;
   checkedList: any = [];
   masterSelected: boolean = false;

   checkUncheckAll() {
      for (var i = 0; i < this.ruledata.length; i++) {
         this.ruledata[i].isSelected = this.masterSelected;
      }
      this.getCheckedItemList();
   }

   // Check All Checkbox Checked
   isAllSelected() {
      this.masterSelected = this.ruledata.every(function (field: any) {
         field.isSelected == true;
      })

      this.getCheckedItemList();

   }

   // Get List of Checked Items
   getCheckedItemList() {
      this.checkedList = [];
      for (var i = 0; i < this.ruledata.length; i++) {
         if (this.ruledata[i].isSelected)
            this.checkedList.push(this.ruledata[i]);
      }
      // console.log("this.checkedList", this.checkedList);


   }

   assignList() {
      var index = this.attribute.findIndex((ele: any) => ele.columnname === this.selectedData.columnname);
      this.attribute[index].mappedRule = [];
      this.attribute[index].chipsList = [];
      this.selectedRules.forEach((item: any) => {
         this.attribute[index].mappedRule.push(item);
         this.attribute[index].chipsList.push(item);
      })

      //console.log("this.attribute", this.attribute);
      // for (var i in this.attribute) {
      //    if (this.attribute[i].id == this.selectedData.id) {
      //       this.attribute[i].mappedRule = this.checkedList;
      //       break; //Stop this loop, we found it!
      //    }
      // }


      this.mainService.tooggleModal('information_modal', 'hide');
   }

   isAllChecked: boolean = false;
   selectedRules: any = []
   checkBoxAll(event: any) {
      if (event.checked) {
         this.ruledata.forEach((item: any) => this.selectedRules.push(item));
         this.checkbox._results.forEach((element: any) => {
            element.nativeElement.checked = true;
         });
      } else {
         this.checkbox._results.forEach((element: any) => {
            element.nativeElement.checked = false;
         });
         this.selectedRules = []
      }
   }

   changeCheckBox(item: any, event: any, index: any) {
      if (event.checked) {
         this.selectedRules.push(item);
         this.checkAll();
      } else {
         var index1 = this.selectedRules.findIndex((ele: any) => ele.ruleid == item.ruleid)
         this.selectedRules.splice(index1, 1);
         this.checkAll();
      }
   }

   checkAll() {
      if (this.selectedRules.length === this.ruledata.length) {
         this.isAllChecked = true;
         this.all.nativeElement.checked = true;
      } else {
         this.isAllChecked = false;
         this.all.nativeElement.checked = false;
      }
   }
   submited: boolean = false;
   addRule() {
      this.submited = true;
      const payload= {
         ruleid: null,
         rule: this.formAddRule.value.valueField,
         ruleDescription: this.formAddRule.value.valueField,
         valueField: this.formAddRule.value.valueField,
         valueCheck: this.formAddRule.value.valueCheck,
         category: this.formAddRule.value.category,
         version:  this.formAddRule.value.version,
         isSelected: false
      }

      if (this.formAddRule.valid) {
         this.data.saveRule(payload).subscribe(res => {
            this.formAddRule.controls.valueField.patchValue('');
            this.formAddRule.controls.category.patchValue('customer');
            this.formAddRule.controls.version.patchValue('');
            this.formAddRule.controls.valueCheck.patchValue('');
            this.loadRules();
            this.toastr.success("Rule saved successfully.")
         });
        // this.isDisplayRow=false;

      }
   }

   get f() {
      return this.formAddRule.controls
   }

   editRule(i:number,field:any){

      field.isSelected=!field.isSelectedfield;
      // console.log(this.tr._results[i])
      // console.log(this.tr._results[i].nativeElement.children)
      var trChildern=this.tr._results[i].nativeElement.children
      for(var i=0;i<trChildern.length;i++){
         var span=trChildern[i].querySelector("span");
         var input=trChildern[i].querySelector("input")
         if(span!=null){
            input.value=span.innerText;
           span.style.display='none';
           input.style.display='block'
         }
      }
   }

   close(i:number,item:any){
      item.isSelected=false;
      var trChildern=this.tr._results[i].nativeElement.children
      for(var i=0;i<trChildern.length;i++){
         var span=trChildern[i].querySelector("span");
         var input=trChildern[i].querySelector("input")
         if(span!=null){
           span.style.display='block';
           input.style.display='none'
         }
      }
   }


   cancelAdd(){
      this.isDisplayRow=false;
   }

   ruleUpdate(i:number,item:any){

      var trChildern=this.tr._results[i].nativeElement.children
      for(var i=0;i<trChildern.length;i++){
         var input=trChildern[i].querySelector("input")
            if(i===1) { 
              var valueField=input.value;    
            } 
            if(i===2){ 
               var category=input.value;
            } 
            if(i===3) { 
               var version=input.value;
            } 
            if(i===4){ 
               var valueCheck=input.value;
            } 
         }

      const payload= {
         ruleid: null,
         rule: item.rule,
         ruleDescription: item.ruleDescription,
         valueField: valueField,
         valueCheck: valueCheck,
         category: category,
         version: version,
         isSelected: false,
         id:item.id
       }

       this.data.update(payload).subscribe(data=>{
         for(var i=0;i<trChildern.length;i++){
            var span=trChildern[i].querySelector("span");
            var input=trChildern[i].querySelector("input")
            if(span!=null){
              span.style.display='block';
              input.style.display='none'
            }
         }
         this.loadRules();
         this.toastr.success("Rule is updated successfully.")
         //alert("Rule is updated successfully");
       })

   }

   deleteRule(i:any,item:any){
       this.data.deleteRule(item.id).subscribe(res=>{
         this.toastr.success("Rule deleted successfully.");
         this.loadRules();
       })
   }
}
