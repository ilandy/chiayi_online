import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AddressService } from './address.service';
import { Dist } from './report';


@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  providers: [AddressService]
})
export class ReportDetailComponent implements OnInit {
  // formbuilder

  // formsetting



  // test
  roleDef: number;
  ageDef: number;
  distDef: string;
  contactDef: number;


  //other setting
  distSelected= {};
  error: any;
  zoneValue:string = '全部';
  selectSwitch:boolean = false;
  dists: Dist[];
  completeMessg: boolean = false;

  constructor(private titleService: Title, private addressService: AddressService) {
    this.roleDef = 1;
    this.ageDef = 1;
    this.distDef= '1002001000';
    this.contactDef = 1;
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.setTitle('案件陳情 - 嘉義市政府線上陳情服務平台');
    this.getDist();

    // this.distEast = this.dists[0];


  }
   public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  shoeComplete () {
    return true;
  }

  getDist() {
    this.addressService
        .getDist()
        .subscribe(
          dist => {
            this.dists = dist;
            console.log(this.dists);
            this.getSelectDist(0);
          },
          error => this.error = error);
  }
  getSelectZone(target:HTMLElement){
    this.selectSwitch = false;
    this.zoneValue = target.innerHTML;
  }
  getSelectDist(DistNo:number){
    this.selectSwitch = false;
    this.distDef = this.dists[DistNo]['DistrictId'];
    this.distSelected = this.dists[DistNo];
    this.zoneValue = this.dists[DistNo].Zones[0].ZoneName;
  }

  roles = [{
      id:1,
      name: "一般市民"
    },{
      id:2,
      name: "議員"
    },{
      id:3,
      name: "里幹事"
    },{
      id:4,
      name: "里長"
    },{
      id:5,
      name: "公務員"
    },{
      id:6,
      name: "學生"
    },{
      id:7,
      name: "學生"
    }];
    ageRange = [{
      id: 1,
      type:"19 歲以下"
    },
    {
      id: 2,
      type:"20 - 29 歲"
    },
    {
      id: 3,
      type:"30 - 39 歲"
    },
    {
      id: 4,
      type:"40 - 49 歲"
    },
    {
      id: 5,
      type:"50 - 59 歲"
    },
    {
      id: 6,
      type:"60 - 69 歲"
    },
    {
      id: 7,
      type:"70 - 79 歲"
    },
    {
      id: 8,
      type:"80 - 89 歲"
    },
    {
      id: 9,
      type:"90 - 99 歲"
    },
    {
      id: 10,
      type:"100 歲以上"
    }]
    contacts = [{
      id: 1,
      name: "E-Mail 聯繫",
      options: "email"
    },
    {
      id: 2,
      name: "電話聯繫",
      options: "phone"
    },
    {
      id: 3,
      name: "書面聯繫",
      options: "address"
    }];

}
