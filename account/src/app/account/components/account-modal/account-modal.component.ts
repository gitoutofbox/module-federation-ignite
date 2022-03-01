import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/core/core.config';
import { AccountServices } from 'src/core/core.services';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() accountId: any;

  private accountDetailsSubscription?: Subscription;
  distributionList: any;
  riskScore: any;

  constructor(private accService: AccountServices) {}

  ngOnInit(): void {
    this.accountDetailsApiCall();
  }

  ngOnChanges(): void {
    // this.accountDetailsApiCall();
  }

  accountDetailsApiCall() {
    let header = { 'Content-type': 'application/json' };
    this.accountDetailsSubscription = this.accService
      .getData(AppConfig.accountDetailsApi + this.accountId, header)
      .subscribe(
        (rsp) => {
          this.riskScore = rsp.riskScore;
          rsp.distribution.forEach((item: any) => {
            item['percentage'] = item.accountDistribution.percentage;
          });
          this.distributionList = rsp.distribution;
        },
        (error) => {
          console.log('Error occured');
        }
      );
  }

  // customizeTooltip(e: any) {
  //   console.log(e);
  //   return `${e.percentText}`;
  // }

  customizeLabel(e: any) {
    return `${e.percentText}`;
  }

  ngOnDestroy(): void {
    if (this.accountDetailsSubscription) {
      this.accountDetailsSubscription.unsubscribe();
    }
  }
}
