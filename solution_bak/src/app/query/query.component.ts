import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Title }             from '@angular/platform-browser';
import { Dist, RecaptchaCode } from '../report/interface/report';
import { ReportService }     from '../report/report.service';


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [ReportService]
})
export class QueryComponent implements OnInit {

  //  驗證碼
  recaptcha: RecaptchaCode;
  hashCode: string;
  timeStamp: string;
  recaptchaImg: string;

  error: any;

  queryVErr: string;
  showDetail: boolean = false;

  errType = {
    notFound: '您查詢的內容不存在，請重新輸入。',
    numErr: '案件編號欄位為必填',
    mailErr: '查詢email有誤。請重新輸入。',
    yearErr: '案件編號-年份有誤。請重新輸入。',
    keyErr: '案件編號有誤。請重新輸入。',
    nameErr: '來電時的姓名有誤。請重新輸入。'
  };

  //form set
  queryForm: FormGroup;
  constructor(
    private titleService: Title,
    private reportService: ReportService,
    private fb: FormBuilder) {
      this.createForm();
  }


  ngOnInit() {
    document.body.scrollTop = 0;
    this.setTitle('案件查詢 - 嘉義市政府線上陳情服務平台');
    this.getRecaptcha();
  }

 // 建立 form model
 createForm (){
   this.queryForm = this.fb.group({
      Id:'',
      Owner: '',
      Mail: '',
      Recaptcha: ''
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
            this.hashCode = encodeURIComponent(validation.HashCode);
            this.timeStamp = validation.TimeStamp;
            this.recaptchaImg = 'data:image/gif;base64,'+ validation.ValidationCode;
          },
          error => this.error = error);
  }
  getDetail(){ //人民陳情查詢
    this.showDetail = true;


    //
    // this.queryVErr = "";
    // if (this.vyear == null || this.vyear.toString().length < 4){
    //   return this.queryVErr = this.errType.yearErr;
    // }
    // if (this.vp3 == null || this.vp3.length == 0){
    //   return this.queryVErr = this.errType.keyErr;
    // }
    // if (this.callerName == null || this.callerName.length == 0){
    //   return this.queryVErr = this.errType.nameErr;
    // }

    // this.subscriptions.push(
    //   //this.vp1 = 'AK';
    //   this.qService.getVResult(this.vp0, this.vp1, this.vyear, this.vp3, this.callerName, this.recaptchaCode2.TimeStamp+this.aCapcha+this.recaptchaCode2.HashCode).subscribe(data => {
    //     this.searchCase = data;
    //     //console.log(data);
    //     this.displayDetail = true;
    //     this.isCivilianSuggest = true;
    //     this.searchCase.isCivilianSuggest = true;
    //   }, (err: any) => {
    //     if (err.status == 404){
    //       return this.queryVErr = this.errType.notFound;
    //     } else if (err.status == 400){
    //       return this.queryVErr = err.json();
    //     }
    //   })
    // );
  }

}
