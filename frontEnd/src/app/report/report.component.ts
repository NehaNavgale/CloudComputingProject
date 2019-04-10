import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Data} from '../countryData';
import {range} from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  // apiURL: String = 'http://ec2-18-224-228-120.us-east-2.compute.amazonaws.com/api';
  countryDropDownValue = 'India';
  disasterDropdownValue = 'Earthquake';
  apiURL: String = 'http://127.0.0.1:5000/api';
  constructor(private http: HttpClient) {}
  filterData;
  fromValue = 2010;
  toValue = 2018;
  // dropdowns
  countries;
  disasterType;
  yearData;
  // schema
  data: Data[];
  // data from api
  totalDeaths = [];
  totalOccurance = [];
  economyDamage = [];
  totalPeopleAffected = [];
  // chart options
  occuranceOptions = {
    responsive: true
  };
  deathOptions = {
    responsive: true
  };
  economyOptions = {
    responsive: true
  };
  affectedOptions = {
    responsive: true
  };
  // chart data
  occuranceData = [];
  deathData = [];
  economyData = [];
  affectedData = [];
  // chart labels
  occuranceLabels = [];
  deathLabels = [];
  economyLabels = [];
  affectedLabels = [];

  // test
  lookup = {};
  result = [];
  name;
  chartColors: Array<any> = [
    { // first color
      backgroundColor: '#2980B9',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

    peoplechartColors: Array<any> = [
    { // first color
      backgroundColor: '#EC7063',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
    // ,
    // { // second color
    //   backgroundColor: 'rgba(225,10,24,0.2)',
    //   borderColor: 'rgba(225,10,24,0.2)',
    //   pointBackgroundColor: 'rgba(225,10,24,0.2)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    // }

  onChartClick(event) {
    console.log(event);
  }
  countryDropdownChange(country) {
    this.countryDropDownValue = country;
    this.getRange();
  }
  disasterDropdownChange(type) {
    this.disasterDropdownValue = type;
    this.getRange();
  }
  onToYearChange(to) {
   this.toValue = to;
    this.getRange();
  }
  onFromYearChange(from) {
    this.fromValue = from;
    this.getRange();
  }
  getCountries() {
    this.http.get(this.apiURL + '/country/getCountries').
    subscribe(countryData => {
      this.countries = countryData;
      // console.log(this.countries);
    }, error => {});
  }

  getType() {
    this.http.get(this.apiURL + '/type/getDisasterType').
    subscribe(typeData => {
      this.disasterType = typeData;
      // console.log(this.disasterType);
    }, error => {});
  }

  getYear() {
    this.http.get(this.apiURL + '/year/getYear').
    subscribe(yearData => {
      this.yearData = yearData;
      // console.log(this.disasterType);
    }, error => {});
  }
  getRange() {
      // this.fromValue = 2000;
      // this.toValue = 2018;
      console.log('country: ' + this.countryDropDownValue + ' type: ' + this.disasterDropdownValue);
    this.http.get(this.apiURL + '/yearRange?from=' + this.fromValue + '&to=' + this.toValue + '&country=' +
      this.countryDropDownValue + '&type=' + this.disasterDropdownValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
      rangeData.forEach(y => {
      //     this.name = y.disasterType;
      //     if (!(this.name in this.lookup)) {
      //       this.lookup[this.name] = 1;
      //       this.result.push(this.name);
      //     }
      // });
      // this.result.forEach(type => {
      //   this.filterData.forEach(y => {
          this.occuranceLabels.push(y.year);
          this.deathLabels.push(y.year);
          this.economyLabels.push(y.year);
          this.affectedLabels.push(y.year);
          this.totalDeaths.push(y.totalDeaths);
          this.totalOccurance.push(y.occurrence);
          this.economyDamage.push(y.totalDamage);
          this.totalPeopleAffected.push(y.totalAffected);
        // });
      });
      this.deathData = [{data: this.totalDeaths, label: this.disasterDropdownValue}];
      this.occuranceData = [{data: this.totalOccurance, label: this.disasterDropdownValue}];
      this.economyData = [{data: this.economyDamage, label: this.disasterDropdownValue}];
      this.affectedData = [{data: this.totalPeopleAffected, label: this.disasterDropdownValue}];
      // console.log(this.fromValue);
    }, error => {});
  }
  generateGraph() {
    this.getRange();
  }
  ngOnInit() {
    this.getCountries();
    this.getType();
    this.getYear();
    this.getRange();
  }

}
