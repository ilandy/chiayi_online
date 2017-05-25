import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reply } from './faq';


@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['../query/query-detail.component.scss']
})
export class FaqDetailComponent {

  @Input() reply: Reply;

  @Output() closeReply = new EventEmitter;

  constructor() { }

  goBack (){
    this.closeReply.emit();
    window.scrollTo(0, 0);
  }



}
