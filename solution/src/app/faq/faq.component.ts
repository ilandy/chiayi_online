
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { FaqService } from './faq.service';
import { Category, Faq, Reply } from './faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FaqService]
})
export class FaqComponent implements OnInit {

  categories: Category[];
  error: any;
  selectValue:string;
  selectSwitch:boolean;
  showDetail: boolean;
  faqList: Faq[];
  keywords: string;
  kind: string;
  reply: Reply;

  page: number;
  pageSize: number;
  totalPage: number;
  sub: any;

  constructor(private titleService: Title, private faqService: FaqService, private activatedRoute: ActivatedRoute) {
      this.selectValue = '全部';
      this.selectSwitch = false;
      this.showDetail = false;
      this.keywords = '';
      this.kind = '';
      this.pageSize = 15;
      this.totalPage = 0;

  }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }



  getSelectItem (tag: HTMLElement, kindNo='') {
    this.selectSwitch = false;
    this.selectValue = tag.innerHTML;
    this.kind = kindNo;
    this.getFaqList();

  }

  getCategories() {
    this.faqService
        .getCategories()
        .subscribe(
          category => this.categories = category,
          error => this.error = error);
  }

  getFaqList() {
    this.faqService
        .getFaqs(this.keywords,this.kind)
        .subscribe (
          faqs => {
             this.faqList = faqs;
              this.totalPage = Math.floor(faqs.length / this.pageSize) + ((faqs.length % this.pageSize === 0) ? 0 : 1)
          },
          error => this.error = error);
  }

  getReply(organNo: string, seqNo: number){
       this.faqService
        .getReply(organNo, seqNo)
        .subscribe(
          reply => {
              this.reply = reply, window.scrollTo(0, 0);
          },
          error => this.error = error);
  }
  closeReply() {
    this.reply = null;
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.setTitle('常見問題 FAQ - 嘉義市政府線上陳情服務平台');
    this.getCategories();
    this.getFaqList();

    this.sub = this.activatedRoute.params.subscribe( params => {
          window.scrollTo(0, 0);
          var queryPage = parseInt(params['page'])-1;

          if (queryPage > this.totalPage){
            this.page = this.totalPage;

          } else if (queryPage < 1){
            this.page = 1;

          } else {
            this.page = params['page']?queryPage:1;

          }
      }
    );
  }

}
