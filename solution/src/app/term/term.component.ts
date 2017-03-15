import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  scrollPosition : number;
  fixedList:boolean;
  scrollHeight: number;
  sub: any;
  whichLable = 'privacy';
  getLabelPadding: string = "0";


  constructor(private titleService: Title, private activeRouter: ActivatedRoute) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  scrollTo (targetAnchor:string){
      let offset = document.getElementById(targetAnchor).offsetTop;
      window.scrollTo(0,offset+300);
      this.getLabelPadding = offset +"px";
  }

  onScroll(event: Document) {
    this.scrollHeight = event.body.scrollTop;
    this.getLabelPadding = this.scrollHeight - screen.availHeight/2 +"px";
    if (this.scrollHeight === 0 ){
      this.getLabelPadding = "0";
    }
  }

  // getLableActive (lableName:string){

  //   let offset1 = document.getElementById('private').offsetTop+280,
  //       offset2 = document.getElementById('security').offsetTop+280,
  //       offset3 = document.getElementById('copy').offsetTop+280;
  //   if (this.scrollHeight >= 0 && this.scrollHeight < offset2){
  //         this.whichLable = 'privacy';
  //     } else if(this.scrollHeight >= offset2 && this.scrollHeight < offset3) {
  //         this.whichLable = 'security';
  //     } else if(this.scrollHeight >= offset3) {
  //         this.whichLable = 'copy';
  //     }
  //   return lableName === this.whichLable;
  // }

  ngOnInit() {
    this.setTitle("網站使用規範 - 嘉義市政府線上陳情服務平台");
    // this.sub = this.activeRouter.params.subscribe(params => {
    //     if (params['lable'] !== undefined ) {
    //       this.scrollTo(params['lable']);
    //       window.scrollTo(0, 0);
    //       this.getLabelPadding = 0 +"px";
    //     }
    //   });
    }
}

