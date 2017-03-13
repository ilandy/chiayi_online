import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private titleService: Title, private faqService: FaqService, private route: ActivatedRoute) { }
  categories: Category[] = [];
  error: any;
  selectValue:string = '全部';
  selectSwitch:boolean = false;
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  
  getSelectItem () {
    this.selectSwitch = true;
  }

  getCategories() {
    this.faqService
        .getCategories()
        .subscribe(
          category => this.categories = category,
          error => this.error = error);
  }

  ngOnInit() {
    this.setTitle('常見問題 FAQ - 嘉義市政府線上陳情服務平台');
    this.getCategories();
  }

}
