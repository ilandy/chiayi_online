import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import '../shared/rxjs-operators';

import { BaseAPIURL }     from '../shared/global.service';

import { CaseType }       from '../shared/case';
import { Dist, RecaptchaCode }     from './interface/report';
import { RoleClass }      from './interface/role';
import { age }      from './interface/age';
import { sex } from './interface/sex';
import { contact }      from './interface/contact';
import { Country, District, Zone }      from './interface/sendAddress';

@Injectable()
export class ReportService {

  reportTypesUrl: string;
  addressUrl: string;
  roleUrl: string;
  ageUrl: string;
  contactUrl: string;
  countryUrl: string;
  distUrl: string;
  zoneUrl: string;
  sexUrl: string;
  recaptchaUrl: string;

  constructor(private http: Http, private baseURL: BaseAPIURL ) {
      this.reportTypesUrl = this.baseURL.remoteUrl + 'items/';
      this.addressUrl = this.baseURL.localUrl + 'data-zone.json';
      this.roleUrl = this.baseURL.remoteUrl + 'CommonCode/RT';
      this.ageUrl = this.baseURL.localUrl + 'data-age.json';
      this.sexUrl = this.baseURL.localUrl + 'data-sex.json';
      this.contactUrl = this.baseURL.localUrl + 'data-contact.json';
      this.countryUrl = this.baseURL.remoteUrl + 'addrcode/';
      this.distUrl = this.baseURL.remoteUrl + 'addrcode/2?p1=';
      this.zoneUrl = this.baseURL.remoteUrl + 'addrcode/3?p1=';
      this.recaptchaUrl = this.baseURL.remoteUrl + 'ValidationCode/';
   }
  // report componet
  getTypes() : Observable<CaseType[]> {
    return this.http.get(this.reportTypesUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }
  // report detail component
  getType(id: string) : Observable<CaseType> {
    return this.http.get(this.reportTypesUrl + id)
               .map((res: Response) => res.json()[0])
               .catch(this.handleError);
  }

  getDist() : Observable<Dist[]> {
    return this.http.get(this.addressUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }

  getRole() : Observable<RoleClass[]> {
    return this.http.get(this.roleUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }

  getAge() : Observable<age[]> {
    return this.http.get(this.ageUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }

  getSex() : Observable<sex[]> {
    return this.http.get(this.sexUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }

  getContact() : Observable<contact[]> {
    return this.http.get(this.contactUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }

  getCountory() : Observable<Country[]> {
    return this.http.get(this.countryUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }

  getDistrict(id: string) : Observable<District[]> {
    return this.http.get(this.distUrl + id)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }

  getZone(id: string) : Observable<Zone[]> {
    return this.http.get(this.zoneUrl + id)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }
  getValidationCode() : Observable<RecaptchaCode> {
    return this.http.get(this.recaptchaUrl)
               .map((res: Response) => res.json())
               .catch(this.handleError);
  }


  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
