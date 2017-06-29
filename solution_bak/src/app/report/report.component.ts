import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CaseType, SubCaseType } from '../shared/case';
import { ReportService } from './report.service';
import { ScrollAnimate } from '../shared/global.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [ReportService, ScrollAnimate],
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  caseTypes: CaseType[];
  error: any;
  selectedCaseType: CaseType;
  selectedSubCaseType: SubCaseType;
  screenSize: number;
  handler: any;

  constructor(private titleService: Title, private reportService: ReportService, private scrollAnimate: ScrollAnimate) {

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

  onSelected(id: string, subId: string){
     this.reportService
        .getType(id)
        .subscribe(type => {
          this.selectedCaseType = type;
          this.selectedSubCaseType = type.Subitems.filter(item => item.Subitem == subId)[0];
        });
  }
  scrollTo(targetPanel){
    targetPanel = document.getElementById(targetPanel);
    this.scrollAnimate.action(targetPanel,0);
  }



  ngOnInit() {
    document.body.scrollTop = 0;
    this.setTitle('首頁 - 嘉義市政府線上陳情服務平台');
    this.getTypes();
  }

}
