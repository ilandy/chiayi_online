import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['../query/query-detail.component.scss']
})
export class FaqDetailComponent implements OnInit {

  constructor() { }

  @Output() closeDetail = new EventEmitter;

  goBack (){
    this.closeDetail.emit();
  }

  ngOnInit() {
    document.body.scrollTop = 0;
  }

}
