import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor() { }
  
  items = [1,2,3,4,5,6,7,8,8,9,0,1,2,3,4,5,6,7,8,9,0];

  ngOnInit() {
  }

}
