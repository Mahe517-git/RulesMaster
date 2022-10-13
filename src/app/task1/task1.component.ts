import { AfterContentInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
//import { MainServiceService } from './main-service.service';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.css']
})
export class Task1Component implements OnInit, AfterContentInit {
  fileNameList: any[] = []
  ruledata: any[] = []
  sheet: any[] = [];
  columns: any[] = [];
  selectedColumns: any[] = [];
  selectedRules: any[] = []
  searchfile: string = '';
  searchSheet: string = '';
  searchColumn: string = '';
  selectedFileName: any;
  selectedSheet: any;
  //selectedRules:any;
  isChekedAll: boolean = false;
  isChekedAllRules: boolean = false;
  isAll: boolean = false;
  acendingFileName: boolean = true;
  acendingSheets: boolean = true;


  @ViewChildren("checkbox") checkbox: any;
  @ViewChildren("rulescheckbox") rulescheckbox: any;

  constructor(private data: DataService,private router:Router) { }

  ngAfterContentInit(): void {
    console.log(this.checkbox)
  }

  ngOnInit(): void {
    this.loadData();
    this.loadRules();
  }

  loadData() {
    this.data.getData().subscribe(data => {
      this.fileNameList = data;
    })
  }

  loadRules() {
    this.data.getRules().subscribe(rules => {
      this.ruledata = rules;
    })
  }

  OriginalSheets: any[] = []
  onSelectFileName(selectFile: any) {
    this.sheet = [];
    this.columns = [];
    this.OriginalSheets = [];
    this.isChekedAll = false;
    selectFile.sheet.forEach((item: any) => {
      this.sheet.push(item)
    });
    this.OriginalSheets = Array.from(this.sheet)
  }
  OriginalColumns: any[] = []
  onSelectSheet(selectSheet: any) {
    this.columns = [];
    this.columns = [...Object.keys(selectSheet.columns)];
    this.OriginalColumns = [...Object.keys(selectSheet.columns)]
  }

  fileSearch() {
    if (this.searchfile == "") {
      this.loadData();
    } else {
      this.fileNameList = this.fileNameList.filter(ele => ele.fileName.toLowerCase().match(this.searchfile.toLowerCase()))
    }
  }

  sheetSearch() {
    if (this.searchSheet == "") {
      this.sheet = this.OriginalSheets;
    } else {
      this.sheet = this.sheet.filter(ele => ele.sheetName.toLowerCase().match(this.searchSheet.toLowerCase()))
    }
  }

  columnSearch() {
    if (this.searchColumn == "") {
      this.columns = this.OriginalColumns;
    } else {
      this.columns = this.columns.filter(ele => ele.toLowerCase().match(this.searchColumn.toLowerCase()))
    }
  }

  onClickAllRules(event: any) {
    this.selectedRules = []
    if (event.checked) {
      this.ruledata.forEach(item => this.selectedRules.push(item));

      this.rulescheckbox._results.forEach((element: any) => {
        element.nativeElement.checked = true;
      });
      this.isChekedAllRules = true;
    } else {

      this.rulescheckbox._results.forEach((element: any) => {
        element.nativeElement.checked = false;
      });
      this.isChekedAllRules = false;

      this.selectedRules = []
    }
  }

  onClickAll(event: any) {
    this.selectedColumns = [];
    if (event.checked) {
      this.isChekedAll = true;
    } else {
      this.isChekedAll = false;
    }

    if (this.isChekedAll) {
      this.columns.forEach(item => this.selectedColumns.push(item));

      this.checkbox._results.forEach((element: any) => {
        element.nativeElement.checked = true;
      });

      this.checkAll();
    } else {

      this.checkbox._results.forEach((element: any) => {
        element.nativeElement.checked = false;
      });

      this.selectedColumns = []
    }

  }
  onChangeCheckBox(item: any, event: any, index: any) {
    // console.log(item,index,event.checked)
    if (event.checked) {
      this.selectedColumns.push(item);
      this.checkAll();
    } else {
      var index1=this.selectedRules.findIndex(ele=>ele===item)
      this.selectedColumns.splice(index1, 1);
      this.checkAll();
    }

  }

  onChangeCheckBoxRules(item: any, event: any, index: any) {
    if (event.checked) {
      this.selectedRules.push(item);
      this.checkRulesAll();
    } else {
      var index1=this.selectedRules.findIndex(ele=>ele.ruleid==item.ruleid)
      this.selectedRules.splice(index1, 1);
      this.checkRulesAll();
    }
  }


  checkRulesAll() {
    if (this.selectedRules.length === this.ruledata.length) {
      this.isChekedAllRules = true;
    } else {
      if (this.isChekedAllRules) {
        this.isChekedAllRules = false;
      }
    }
  }

  checkAll() {
    if (this.selectedColumns.length === this.columns.length) {
      this.isChekedAll = true;
    } else {
      this.isChekedAll = false;
    }
  }

  submit() {
    let payload = {
      "selectFileName": this.selectedFileName,
      "selectedSheet": this.selectedSheet,
      "selectedColumns": this.selectedColumns,
      "selectedRules": this.selectedRules
    }
    console.log(payload)
  }

  // submit1() {
  //   let payload = {
  //     "selectFileName": this.selectedFileName,
  //     "selectedSheet": this.selectedSheet,
  //     "selectedColumns": this.selectedColumns,
  //     ColumnsLevelRules:[{column:Address,roles:[1,2,3]}]
  //   }
  //   console.log(payload)
  // }



  goToDQ(){
    let payload = {
      "selectFileName": this.selectedFileName,
      "selectedSheet": this.selectedSheet,
      "selectedColumns": this.selectedColumns,
      "selectedRules": this.selectedRules
    }
    this.data.passMapingDetails(payload);
    this.router.navigate(['/tableView']);
  }

  sortFileName(){
    this.acendingFileName=!this.acendingFileName
      if(this.acendingFileName){
        this.fileNameList.sort((a,b)=>a['fileName'].toLowerCase()>b['fileName'].toLowerCase()?1:-1);
        }else{
          this.fileNameList.sort((a,b)=>a['fileName'].toLowerCase()<b['fileName'].toLowerCase()?1:-1);
        }
  }

  sortSheet(){
    this.acendingSheets=!this.acendingSheets
      if(this.acendingSheets){
        this.sheet.sort((a,b)=>a['sheetName'].toLowerCase()>b['sheetName'].toLowerCase()?1:-1);
        }else{
          this.sheet.sort((a,b)=>a['sheetName'].toLowerCase()<b['sheetName'].toLowerCase()?1:-1);
        }
  }

}
