import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReportService } from './report.service';
import { Dist, RecaptchaCode } from './interface/report';
import { RoleClass } from './interface/role';
import { age } from './interface/age';
import { contact } from './interface/contact';
import { Country, District, Zone } from './interface/sendAddress';


@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  providers: [ReportService]
})
export class ReportDetailComponent implements OnInit {
  // 角色相關的變數
  roles: RoleClass[];
  roleDef: string;

  // 年齡相關變數
  ageRange: age[];
  ageDef: number;

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
  files: any[];

  // 尚未分類


  error: any;
  completeMessg: boolean;

  constructor(private titleService: Title, private reportService: ReportService) {
    this.roleDef = '1';

    this.ageDef = 1;

    this.eventDistDef = '1002001000';
    this.eventSelectedDist = {};
    this.eventTownshipDef = '全部';
    this.eventSlider = false;

    this.contactDef = '1';
    this.completeMessg = false;
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.setTitle('案件陳情 - 嘉義市政府線上陳情服務平台');
    this.getDist();
    this.getRole();
    this.getAge();
    this.getContact();

    this.getCtcCountry();
  }

  //==== 表單以外的功能 ====//
   public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  shoeComplete () {
    return true;
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
  triggerFileBtn (){
    let fileInput: HTMLElement = document.getElementById('Files');
    fileInput.click();
    console.log(fileInput);
  }

  filesUpload(uploadInput:any){
    this.files = uploadInput.files;
    // debugger;


    console.log(uploadInput.files);

  }

}
