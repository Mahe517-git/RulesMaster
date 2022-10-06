import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { Task1Component } from './task1/task1.component';

const routes: Routes = [
{ path: "tableView", component: TableComponent },
{ path: "", component: Task1Component },
// {path:"**",redirectTo:"Invoice",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
