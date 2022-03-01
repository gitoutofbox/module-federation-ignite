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
  // distributionList: any = [
  //   {
  //     country: 'USA',
  //     medals: 110,
  //   },
  //   {
  //     country: 'China',
  //     medals: 100,
  //   },
  //   {
  //     country: 'Russia',
  //     medals: 72,
  //   },
  //   {
  //     country: 'Britain',
  //     medals: 47,
  //   },
  //   {
  //     country: 'Australia',
  //     medals: 46,
  //   },
  //   {
  //     country: 'Germany',
  //     medals: 41,
  //   },
  //   {
  //     country: 'France',
  //     medals: 40,
  //   },
  //   {
  //     country: 'South Korea',
  //     medals: 31,
  //   },
  // ];

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
          this.distributionList = rsp.distribution;
          console.log(this.distributionList);
        },
        (error) => {
          console.log('Error occured');
        }
      );
  }

  customizeTooltip = (arg: any) => ({
    text: `${arg.valueText}`,
  });

  ngOnDestroy(): void {
    if (this.accountDetailsSubscription) {
      this.accountDetailsSubscription.unsubscribe();
    }
  }
}
