
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReportService } from './report.service';
import { UploadService } from './upload.service';
import { Subscription } from "rxjs";

import { Dist, RecaptchaCode }     from './interface/report';
import { ReportData } from './interface/reportData';
import { RoleClass }      from './interface/role';
import { age }      from './interface/age';
import { sex } from './interface/sex';
import { contact }      from './interface/contact';
import { Country, District, Zone }      from './interface/sendAddress';
import {
  checkFilesSize,
  checkTotalFilesSize,
  checkFileName,
  checkExtName,
  checkFilenameIsExist,
  joinUploadedFileName,
  genCaseToken,
  getFormData
} from './modules/fileChecker'


@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  providers: [ReportService,UploadService]
})
export class ReportDetailComponent implements OnInit {
  //CaseToken
  caseToken: string;

  // 角色相關的變數
  roles: RoleClass[];
  roleDef: string;

  // 年齡相關變數
  ageRange: age[];
  ageDef: string;

  // 性別相關變數
  sex: sex[];
  sexDef: string;

  // 事件地點相關變數
  eventDists: Dist[];
  eventDistDef: string;
  eventSelectedDist: any;
  eventTownshipDef:string;
  eventTownshipVal:string;
  eventSlider:boolean;

  // 回覆方式
  contacts: contact[];
  contactDef: string;

  ctcCountrys: Country[];
  ctcCountryDef: string;
  ctcCountryVal: string;
  ctcCountrySlider: boolean;

  ctcDists: District[];
  ctcDistDef: string;
  ctcDistVal: string;
  ctcDistSlider: boolean;

  ctcZones: Zone[];
  ctcZoneDef: string;
  ctcZoneVal: string;
  ctcZoneSlider: boolean;

  // 檔案
  uploadFiles= [];
  filesCount: number;
  filesName: string;

  //  驗證碼
  recaptcha: RecaptchaCode;
  hashCode: string;
  timeStamp: string;
  recaptchaImg: string;

  // 尚未分類
  formValidationComplate: boolean;


  error: any;
  completeMessg: boolean;
  dangerDef: string;

  constructor(
    private titleService: Title,
    private reportService: ReportService,
    private uploadService: UploadService,
  ) {
    this.formValidationComplate = false;
    this.caseToken = genCaseToken(12);

    this.roleDef = '1';

    this.ageDef = '1';
    this.sexDef = '1';

    this.eventDistDef = '1002001000';
    this.eventSelectedDist = {};
    this.eventTownshipDef = '全部';
    this.eventSlider = false;

    this.contactDef = '1';
    this.completeMessg = false;

    this.filesCount = 0;
    this.filesName = "";
    this.dangerDef = "N";
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.setTitle('案件陳情 - 嘉義市政府線上陳情服務平台');
    this.getDist();
    this.getRole();
    this.getAge();
    this.getSex();
    this.getContact();
    this.getRecaptcha();
    this.getCtcCountry();
  }

  //==== 表單以外的功能 ====//
   public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  shoeComplete () {
    return true;
  }

  //==== 取得驗證碼 ====//
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

  //==== 角色選擇功能 ====//
  getRole() {
    this.reportService
        .getRole()
        .subscribe(
          role => {
            this.roles = role;
            // console.log(this.roles);
          },
          error => this.error = error);
  }

  //==== 年齡選擇功能 ====//
  getAge() {
    this.reportService
        .getAge()
        .subscribe(
          age => {
            this.ageRange = age;
          },
          error => this.error = error);
  }
  //==== 年齡選擇功能 ====//
  getSex() {
    this.reportService
        .getSex()
        .subscribe(
          sex => {
            this.sex = sex;
          },
          error => this.error = error);
  }

  //==== 事件地點功能 ====//
  // 訂閱 reportService getDist 取得遠端資源
  getDist() {
    this.reportService
        .getDist()
        .subscribe(
          dist => {
            this.eventDists = dist;
            // console.log(this.eventDists);
            this.getSelectDist(0);
          },
          error => this.error = error);
  }
  // 取的被選取的里別

  // 取得選取區域並置換相關功能的內容
  getSelectDist(DistNo:number){
    this.setSlideUp('0');
    this.eventDistDef = this.eventDists[DistNo]['DistrictId'];
    this.eventSelectedDist = this.eventDists[DistNo];
    this.eventTownshipVal = this.eventDists[DistNo].Zones[0].ZoneName;
    this.eventTownshipDef = this.eventDists[DistNo].Zones[0].ZoneCode;
  }

  //==== 事件地點功能 ====//
  // 訂閱 reportService getDist 取得遠端資源
  getContact() {
    this.reportService
        .getContact()
        .subscribe(
          contacts => {
            this.contacts = contacts;
          },
          error => this.error = error);
  }
  //==== 書面寄送地址 ====//
  // 訂閱 reportService getDist 取得遠端資源
  getCtcCountry() {
    this.reportService
        .getCountory()
        .subscribe(
          data => {

            this.ctcCountrys = data;
            this.ctcCountryVal = this.ctcCountrys[0].CountyName;
            this.ctcCountryDef = this.ctcCountrys[0].CountyCode;
            this.getCtcDist();
          },
          error => this.error = error);
  }

  getCtcDist() {
    this.reportService
        .getDistrict(this.ctcCountryDef)
        .subscribe(
          data => {
            this.ctcDists = data;
            this.ctcDistVal = this.ctcDists[0].DistrictName;
            this.ctcDistDef = this.ctcDists[0].DistrictCode;
            this.getCtcZone();
          },
          error => this.error = error);
  }

  getCtcZone() {
    this.reportService
        .getZone(this.ctcDistDef)
        .subscribe(
          data => {
            this.ctcZones = data;
            this.ctcZoneVal = this.ctcZones[0].ZoneName;
            this.ctcZoneDef = this.ctcZones[0].ZoneCode;
          },
          error => this.error = error);
  }

  getSliderItem(target:string, name:string, id:string){
    let val = target + 'Val',
        def = target + 'Def';
    this.setSlideUp('0');
    this[val] = name;
    this[def] = id;
  }

 setSlideUp(target:string){
   this.eventSlider = false;
   this.ctcCountrySlider = false;
   this.ctcDistSlider = false;
   this.ctcZoneSlider = false;
  }
  //==== 上傳檔案功能 ====//
  //

  private subscribes: Subscription[] = [];
  triggerFileBtn (){
    let fileInput: HTMLElement = document.getElementById('Files');
    fileInput.click();
    // console.log(fileInput);
  }


  private checkFiles(files: File[]): boolean {
    let r0 = checkTotalFilesSize(files);
    if (!r0)
      return false;

    for(let i=0; i<files.length; i++){
      let f = files[i];
      let r1 = checkFilesSize(f);
      if (!r1)
        return false;

      let r2 = checkFileName(f);
      if (!r2)
        return false;

      let r3 = checkExtName(f);
      if (!r3)
        return false;
    }
    return true;
  }

  filesUpload(uploadInput:any){

      // uploadInput.files.forEach(element => {
      //   this.files.push(element.name);
      // });

    // debugger;

    if (uploadInput.files) {
      //console.log(fi.files);

      let refiles = checkFilenameIsExist(uploadInput.files, this.uploadFiles);

      if (!refiles || refiles.length <= 0)
        return;

      let check = this.checkFiles(refiles);
      if (!check)
        return;

      for(let i=0; i < refiles.length; i++){
        this.uploadFiles.push(refiles[i]);
      }

    }
    this.filesCount = this.uploadFiles.length;
    this.filesName = joinUploadedFileName(this.uploadFiles)
  }
  formDataValidation (formData: ReportData){
    let validationMsg = {
      needName :         '請輸入姓名',
      needLocation :     '請輸入事件地址',
      needContnt :       '請輸入陳情案件內容',
      needEmail :        '請輸入Email',
      needPhone :        '您選擇的回覆方式為「電話回覆」，電話或行動電話請擇一輸入',
      needAddr :         '您選擇的回覆方式為「書面回覆」，請輸入書面寄送地址',
      needRecaptcha :    '請輸入驗證碼',
    };

    //   姓名必填
    if (!formData.Sugg_Name){
      alert(validationMsg.needName);
    }

    //   案件地址必填
    if (!formData.Subj_Location){
      alert(validationMsg.needLocation);
    }
    //   陳請內容必填
    if (!formData.Subj_Content){
      alert(validationMsg.needContnt);
    }
    //   Email 必填 (格式為 Email)
    if (!formData.Sugg_Email){
      alert(validationMsg.needEmail);
    }
    //   回覆方式為 2 時 Mobile or Telno 則一必填 (格式為純數字)
    if (formData.Sugg_ReplyWay === '2' && (!formData.Sugg_Mobile||!formData.Sugg_Telno)){
      alert(validationMsg.needPhone);
    }
    //   回覆方式為 3 時 Addr1,2,4 必填
    if (formData.Sugg_ReplyWay === '3' && (!formData.Sugg_Addr1||!formData.Sugg_Addr2||!formData.Sugg_Addr4)){

      alert(validationMsg.needAddr);
    }
    //   驗證碼必填 (A-z0-9 Rxp)
    if (formData.Input_ValidationCode){

      alert(validationMsg.needRecaptcha);
    }

  }
  // Post Formdata
  submitData (formData: string){

    let form = getFormData (formData);
    this.uploadService
        .postData(form)
        .subscribe(
          data => {
            if(data){
              this.completeMessg = !this.completeMessg;
            } else {
              alert(`資料上傳不成功。請檢查！`);
            }

          },err => {
            console.log(err.status)
            if(err.status === 400){
              //dddd
            } else {
              console.log(err);
            }
        });
  }

}
