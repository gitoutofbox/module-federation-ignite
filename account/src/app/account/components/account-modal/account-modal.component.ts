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
  riskColorCode: any;
  accountDetails: any;

  constructor(private accService: AccountServices) {}

  ngOnInit(): void {
    this.accountDetailsApiCall();
  }

  ngOnChanges(): void {
    // this.accountDetailsApiCall();
  }

  applyRiskColorCode() {
    if (this.riskScore < 50) {
      this.riskColorCode = '#228B22';
    } else if (this.riskScore >= 50 && this.riskScore < 80) {
      this.riskColorCode = '#F09E41';
    } else if (this.riskScore >= 80) {
      this.riskColorCode = '#CE2029';
    } else {
      this.riskColorCode = '#0076cb';
    }
  }

  accountDetailsApiCall() {
    let header = { 'Content-type': 'application/json' };
    this.accountDetailsSubscription = this.accService
      .getData(AppConfig.accountDetailsApi + this.accountId, header)
      .subscribe(
        (rsp) => {
          this.accountDetails = rsp;
          this.riskScore = rsp.riskScore;
          this.applyRiskColorCode();
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
