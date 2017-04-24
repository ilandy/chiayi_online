import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FaqService } from './faq.service';
import { Category } from './faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FaqService]
})
export class FaqComponent implements OnInit {

  constructor(private titleService: Title, private faqService: FaqService) { }
  categories: Category[] = [];
  error: any;
  selectValue:string = '全部';
  selectSwitch:boolean = false;
  showDetail: boolean = false;

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getSelectItem (tag: HTMLElement) {
    this.selectSwitch = false;
    this.selectValue = tag.innerHTML
  }

  getCategories() {
    this.faqService
        .getCategories()
        .subscribe(
          category => this.categories = category,
          error => this.error = error);
  }
  getDetail() {
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
  }


  ngOnInit() {
    document.body.scrollTop = 0;
    this.setTitle('常見問題 FAQ - 嘉義市政府線上陳情服務平台');
    this.getCategories();
  }

}
