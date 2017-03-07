import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  constructor(private titleService: Title) { }
  
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.setTitle('案件查詢 - 嘉義市政府線上陳情服務平台');
  }

}
