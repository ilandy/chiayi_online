import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(private titleService: Title, private faqService: FaqService) {
      this.selectValue = '全部';
      this.selectSwitch = false;
      this.showDetail = false;
      this.keywords = '';
      this.kind = '';

  }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }



  getSelectItem (tag: HTMLElement, kindNo='') {
    this.selectSwitch = false;
    this.selectValue = tag.innerHTML;
    this.kind = kindNo;

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
          faqs => this.faqList = faqs,
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
    document.body.scrollTop = 0;
    this.setTitle('常見問題 FAQ - 嘉義市政府線上陳情服務平台');
    this.getCategories();
    this.getFaqList();
  }

}
