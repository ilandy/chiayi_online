
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Title }             from '@angular/platform-browser';
import { Dist, RecaptchaCode } from '../report/interface/report';
import { ReportService }     from '../report/report.service';
import { QueryService } from './query.service';


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [ReportService,QueryService]
})
export class QueryComponent implements OnInit {

  //  驗證碼
  recaptcha: RecaptchaCode;
  hashCode: string;
  timeStamp: string;
  recaptchaImg: string;

  queryErr: string;
  showDetail: boolean = false;
  queryDetail: any[];
  showLoading: boolean;

  errType: any;

  //form set
  queryForm: FormGroup;
  constructor(
    private titleService: Title,
    private reportService: ReportService,
    private queryService: QueryService,
    private fb: FormBuilder) {

      this.createForm();
      this.showLoading = false;
      this.errType =  {
          notFound: '您查詢的內容不存在，請重新輸入',
          IdErr: '案件編號欄位為錯誤',
          IdEmpty: '案件編號欄位為必填',
          MailEmpty: 'email為必填',
          MailErr: '查詢email有誤，請重新輸入',
          OwnerEmpty: '陳情人為必填',
          RecaptchaEmpty: '驗證碼為必填'
        };
  }

  check (target) {
    let empty = target+'Empty';
    let err = target+'Err';
    if(this.queryForm.get(target).touched) {
      if(this.queryForm.get(target).value === '') {
          return this.errType[empty];
      } else if(this.queryForm.get(target).status === 'INVALID') {
          return this.errType[err];
      };
    }
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.setTitle('案件查詢 - 嘉義市政府線上陳情服務平台');
    this.getRecaptcha();
  }

 // 建立 form model
 createForm (){
   this.queryForm = this.fb.group({
      Id:['',[Validators.required,Validators.pattern("^([A-Z]{1}[-])(\\d{2}[-])(\\d{4}[-])(\\d+)$")]],
      Owner: ['',Validators.required],
      Mail: ['', [Validators.required,Validators.email]],
      Recaptcha: ['',Validators.required]
   });
 }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  closeDetail() {
    this.showDetail = false;
  }

  getRecaptcha() {
    this.reportService
        .getValidationCode()
        .subscribe(
          validation => {
            this.recaptcha = validation;
            this.recaptchaImg = 'data:image/gif;base64,'+ validation.ValidationCode;
          });
  }
  getDetail(){ //人民陳情查詢
    if (this.queryForm.status == 'VALID') {
      this.showLoading = true;
      this.queryService
          .getQuery(this.queryForm.value,this.recaptcha)
          .subscribe( data => {
              this.queryDetail = data;
              this.showDetail = true;
              this.showLoading = false;
          }, error => {
             this.queryErr = "您輸入的資訊查詢不到相符案件";
          });
    }
  }
}
