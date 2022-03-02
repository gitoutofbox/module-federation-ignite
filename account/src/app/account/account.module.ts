import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import {
  DxBulletModule,
  DxButtonModule,
  DxChartModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxTemplateModule,
  DxTreeViewModule,
  DxPieChartModule,
  DxCircularGaugeModule,
} from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AccountServices } from 'src/core/core.services';
import { AccountModalComponent } from './components/account-modal/account-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
];

@NgModule({
  declarations: [ListComponent, AccountModalComponent],
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
    DxPieChartModule,
    DxCircularGaugeModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  providers: [BsModalService, AccountServices],
})
export class AccountModule {}
