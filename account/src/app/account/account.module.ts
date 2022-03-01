import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DxBulletModule, DxButtonModule, DxChartModule, DxDataGridModule, DxDropDownBoxModule, DxDropDownButtonModule, DxTemplateModule, DxTreeViewModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxButtonModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    DxBulletModule,
    DxTemplateModule,
    HttpClientModule,
    DxChartModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
