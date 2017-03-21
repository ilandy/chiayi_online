import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.scss']
})
export class QueryDetailComponent implements OnInit {

  constructor() { }

  @Output() closeDetail = new EventEmitter();

  goBack() {
    this.closeDetail.emit();
    // console.log(123)
  }

  ngOnInit() {
  }

}
