import { Injectable } from '@angular/core';
import { Http, Response }         from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import '../shared/rxjs-operators';
import { RecaptchaCode } from '../report/interface/report';
import { BaseAPIURL } from './../shared/global.service';

@Injectable()
export class QueryService {

  queryUrl: string;
  replyFileUrl: string;
  constructor(private http: Http, private baseUrl: BaseAPIURL) {
    this.queryUrl = this.baseUrl.remoteUrl + 'case/';
    this.replyFileUrl = this.baseUrl.remoteUrl + 'attachfile/';
  }

  getQuery(formData, Recapcha:RecaptchaCode) : Observable<any> {
    let Id = formData.Id.split('-');

    let querys =  Id[0] + "?p1="  + Id[1] + "&p2=" + Id[2] + "&p3=" + Id[3]
                  + "&p4=" + formData.Owner + "&p5=" + formData.Mail
                  + "&p6=" + Recapcha.TimeStamp + formData.Recaptcha + encodeURIComponent(Recapcha.HashCode);
    return this.http.get(this.queryUrl+querys)
               .map(this.extractData)
               .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    let errMsg =  error.status;
    return Observable.throw(errMsg);
  }

}
