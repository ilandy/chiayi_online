import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CaseType, SubCaseType } from '../share/case';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [ReportService],
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  caseTypes: CaseType[];
  error: any;
  selectedCaseType: CaseType;
  selectedSubCaseType: SubCaseType;
  screenSize: number;

  constructor(private titleService: Title, private reportService: ReportService) {

    // console.log(this.screenSize)
   }
  
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  getTypes() {
    this.reportService
      .getTypes()
      .subscribe(types => this.caseTypes = types);
  }
  getScreenSize (){
    this.screenSize = screen.availWidth;
  }
  ngOnInit() {
    this.setTitle('案件陳情 - 嘉義市政府線上陳情服務平台');
    this.getTypes();
    this.getScreenSize();
  }

}
