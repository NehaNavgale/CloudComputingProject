import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  apiURL: String = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) { }
  countries;
  disasterType;

  getCountries() {
    this.http.get('http://127.0.0.1:5000/api/country/getCountries').
    subscribe(countryData => {
      this.countries = countryData;
      console.log(this.countries);
    }, error => {});
  }

  getType() {
    this.http.get('http://127.0.0.1:5000/api/type/getDisasterType').
    subscribe(typeData => {
      this.disasterType = typeData;
      console.log(this.disasterType);
    }, error => {});
  }

  ngOnInit() {
    this.getCountries();
    this.getType();
  }

}
