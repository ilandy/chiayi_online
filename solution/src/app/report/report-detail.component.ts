

import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ReportService } from './report.service';
import { UploadService } from './upload.service';
import { Subscription } from "rxjs";


import { CaseType, SubCaseType } from './../shared/case';
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
  genCaseToken
} from './modules/fileChecker';
import { getFormData, formDataValidation } from './modules/Validation';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  providers: [ReportService,UploadService]
})
export class ReportDetailComponent implements OnInit {
  //CaseToken
  caseToken: string;
  //案件類別
  case: CaseType;
  caseType: string;
  subCaseType: string;
  caseData: any = {};

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
  //是否有立即危險
  showDangerOption: boolean;

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
  sub: any;


  error: any;
  completeMessg: boolean;
  dangerDef: string;



  constructor(
    private titleService: Title,
    private reportService: ReportService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute
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

    this.showDangerOption = false;
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

    this.getCaseType()


  }

  //==== 表單以外的功能 ====//
   public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  shoeComplete () {
    return true;
  }

  //==== 取得 Router ====//
  getCaseType(){
    this.sub = this.activatedRoute.params.subscribe(params => {
        // console.log(params['id'],params['subId'])

        if(params['id'] && params['subId']){
          this.reportService
            .getTypes()
            .subscribe(
              casetype => {
                this.case = casetype[params['id']];
                this.caseType = this.case.ItemName;
                this.subCaseType = this.case.Subitems[params['subId']].SubitemName;
                this.caseData = {
                  Id: this.case.Item,
                  SubId: this.case.Subitems[params['subId']].Subitem
                }

                //01/01, 01/02, 02/02 及 0802
                switch (this.caseData.Id){
                  case '01':
                    this.showDangerOption = this.caseData.SubId == '02' || '01' ? true: false;
                  break;
                  case '02':
                  case '08':
                    this.showDangerOption = this.caseData.SubId == '02' ? true: false;
                  break;
                  default:
                    this.showDangerOption = false;
                  break;

                }
          },
          error => this.error = error);
        }
      });
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

  // Post Formdata
  submitData (formData: any){
    console.log(this.caseData)
    let form = getFormData (formData.value, this.caseData);
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
