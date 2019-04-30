import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Data} from '../countryData';
import {range} from 'rxjs';

@Component({
  selector: 'app-emperical-view',
  templateUrl: './emperical-view.component.html',
  styleUrls: ['./emperical-view.component.css']
})
export class EmpericalViewComponent implements OnInit {

  apiURL: String = 'http://127.0.0.1:5000/api';
  reportedEventData = [];
  reportedEventLabels = [];

  economyDamageData = [];
  economyDamageLabels = [];
  filterData;
  data: Data[];
  constructor(private http: HttpClient) { }
  chartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    }
  };
  chartColors: Array<any> = [
    { // first color
      backgroundColor: '#2980B9',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
  onChartClick(event) {
    console.log(event);
  }
  getData() {
    this.reportedEventLabels = [];
    this.economyDamageLabels = [];
    const eventData = [];
    const damageData = [];
    this.http.get(this.apiURL + '/getReportedEvents').
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
      rangeData.forEach(y => {
        this.reportedEventLabels.push(y.year);
        this.economyDamageLabels.push(y.year);
        eventData.push(y.occurrence);
        damageData.push(y.totalDamage);
      });
      console.log(eventData);
      console.log(this.reportedEventLabels);
      this.reportedEventData = [{data: eventData, label: 'Total Events'}];
      this.economyDamageData = [{data: damageData, label: 'Total Damage'}];
    }, error => {});
  }

  ngOnInit() {
    this.getData();
  }

}
