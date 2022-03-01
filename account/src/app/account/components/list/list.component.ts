import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';
// import shared from '@common/data-access';

class Complaints {
  complaint: string = '';

  count: number = 0;
}
class ComplaintsWithPercent {
  complaint: string = '';

  count: number = 0;

  cumulativePercent: number=0;
}
const complaintsData: Complaints[] = [
  { complaint: 'Cold pizza', count: 780 },
  { complaint: 'Not enough cheese', count: 120 },
  { complaint: 'Underbaked or Overbaked', count: 52 },
  { complaint: 'Delayed delivery', count: 1123 },
  { complaint: 'Damaged pizza', count: 321 },
  { complaint: 'Incorrect billing', count: 89 },
  { complaint: 'Wrong size delivered', count: 222 },
];
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    // '../../../../../node_modules/devextreme/dist/css/dx.light.css', 
    './list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: DataSource;
  dataSource1: ComplaintsWithPercent[];

  
  collapsed = false;
  ngOnInit(): void {
      
  }
  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  customizeTooltip = (pointsInfo: any) => ({ text: `${parseInt(pointsInfo.originalValue)}%` });

  constructor() {
    this.dataSource = this.getDataSource();
    this.dataSource1 = this.getComplaintsData();
    // shared.getValue();
  }

  getDataSource() {
    return new DataSource({
      store: {
        type: 'odata',
        url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
        key: 'Id',
        beforeSend(request) {
          request.params.startDate = '2020-05-10';
          request.params.endDate = '2020-05-15';
        },
      },
    });
  }
  

  getComplaintsData(): ComplaintsWithPercent[] {
    const data = complaintsData.sort((a, b) => b.count - a.count);
    const totalCount = data.reduce((prevValue, item) => prevValue + item.count, 0);
    let cumulativeCount = 0;
    return data.map((item, index) => {
      cumulativeCount += item.count;
      return {
        complaint: item.complaint,
        count: item.count,
        cumulativePercent: Math.round(cumulativeCount * 100 / totalCount),
      };
    });
  }
  customizeLabelText = (info: any) => `${info.valueText}%`;
}
