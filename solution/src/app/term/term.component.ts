import { ScrollAnimate } from './../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss'],
  providers: [ScrollAnimate]
})
export class TermComponent implements OnInit {

  scrollPosition : number = window.scrollY;
  fixedList:boolean;
  scrollHeight: number;
  screenWidth: number = screen.availWidth;
  sub: any;
  whichLable = 'privacy';
  getLabelPadding: string = "0";


  constructor(private titleService: Title, private activeRouter: ActivatedRoute, private scrollAnimate: ScrollAnimate) { }

  /* Setting new page title */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }




  /* Geting target offset height and scroll to
     when label be clicked.  */

  scrollTo(targetPanel){
    var target = document.getElementById(targetPanel);
     if (this.screenWidth >= 760 ) {
        if (this.whichLable !== targetPanel) {
          this.scrollAnimate.action(target, 300);
        }
        this.getLabelPadding = target.offsetTop + 370 +"px";
     } else {
       window.scrollTo(0,target.offsetTop+400);
     }
  }

 /* The range of page on scroll start to end.  */
  onScroll(event: Document) {
    this.scrollHeight = event.body.scrollTop;
    this.getLabelPadding = this.scrollHeight - screen.availHeight/2 +"px";

    if (this.scrollHeight === 0 ){
      this.getLabelPadding = "0";
    } else if (this.scrollHeight > 3552 ) {
      this.getLabelPadding = "3352px"
    }

    switch (true) {
      case (this.scrollHeight >= document.getElementById('copy').offsetTop):
        this.whichLable = 'copy';
      break;
      case (this.scrollHeight >= document.getElementById('sucrity').offsetTop):
        this.whichLable = 'sucrity';
      break;
      default:
        this.whichLable = 'privacy';
      break;

    }
    if (this.screenWidth < 760 ) {
      this.getLabelPadding = "0";
    }

  }


  ngOnInit() {
    this.setTitle("網站使用規範 - 嘉義市政府線上陳情服務平台");
    this.sub = this.activeRouter.params.subscribe(params => {
        if (params['lable'] !== undefined ) {
          if (params['lable'] !== 'privacy' ) {
            this.scrollTo(params['lable']);
          } else {
            window.scrollTo(0,0);
          }
        }
      });
    }
}

