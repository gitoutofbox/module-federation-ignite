import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/core/core.config';
import { AppConstant } from 'src/core/core.constant';
import { AccountServices } from 'src/core/core.services';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  accounts: any;
  paging: any;
  accountNumFormat: any;
  modalRef?: BsModalRef;
  selectedAccountNumber: any;
  selectedAccountId: any;
  readonly allowedPageSizes = [5, 10, 'all'];
  private accountSubscription?: Subscription;

  constructor(
    private modalService: BsModalService,
    private accService: AccountServices
  ) {}

  ngOnInit(): void {
    this.paging = {
      enabled: true,
      pageSize: AppConstant.PAGE_SIZE,
    };
    this.accountNumFormat = {
      type: 'currency',
      currency: 'USD',
      precision: 2,
    };
    // this.accounts = AppConstant.ACCOUNTS;
    this.accountsApiCall();
  }

  onCellPrepared(e: any) {
    if (e.rowType === 'header') {
      e.cellElement.style.backgroundColor = '#CEE3F6';
      e.cellElement.style.color = '#242424';
      e.cellElement.style.fontWeight = 'bold';
    }
  }

  accountsApiCall() {
    let header = { 'Content-type': 'application/json' };
    this.accountSubscription = this.accService
      .getData(AppConfig.accountsApi, header)
      .subscribe(
        (rsp) => {
          this.accounts = rsp;
        },
        (error) => {
          console.log('Error occured');
        }
      );
  }

  openAccountDetailsModal(template: TemplateRef<any>, data: any) {
    this.selectedAccountNumber = data.accountNumber;
    this.selectedAccountId = data.id;
    let modalConfig: ModalOptions = {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
    };
    this.modalRef = this.modalService.show(template, modalConfig);
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }
}
