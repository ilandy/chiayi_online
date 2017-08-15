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
  favoriteList: any;

  constructor(private titleService: Title, private reportService: ReportService, private scrollAnimate: ScrollAnimate) {
    this.favoriteList = [{
      item: 9,
      subitem: 2,
      title: "違規停車",
      itemPic: "icon-1.png"
    },{
      item: 5,
      subitem: 8,
      title: "違規小廣告",
      itemPic: "icon-2.png"
    },{
      item: 7,
      subitem: 1,
      title: "號誌故障",
      itemPic: "icon-3.png"
    },{
      item: 0,
      subitem: 1,
      title: "路燈不亮",
      itemPic: "icon-4.png"
    },{
      item: 4,
      subitem: 2,
      title: "溝蓋破損",
      itemPic: "icon-5.png"
    },{
      item: 1,
      subitem: 1,
      title: "道路凹陷坑洞",
      itemPic: "icon-6.png"
    }]
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
