import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  role: any = 1;
  dist: any = 1;
  contact: any = 0;
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  constructor(private titleService: Title) { }
  
  ngOnInit() {
    this.setTitle('案件陳情 - 嘉義市政府線上陳情服務平台');
  }

}
