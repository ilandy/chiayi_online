import { Injectable }             from '@angular/core';
import { Http, Response }         from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import '../shared/rxjs-operators';
import { BaseAPIURL } from './../shared/global.service';
import { Category, Faq, Reply }   from './faq';

@Injectable()
export class FaqService {
  private categoryUrl: string;
  private faqUrl: string;

  constructor(private http: Http, private baseUrl:BaseAPIURL) {
    this.categoryUrl = this.baseUrl.remoteUrl + 'Category/';
    this.faqUrl = this.baseUrl.remoteUrl + 'FaqQry/';
    // this.faqUrl = this.baseUrl.localUrl + 'data-faq.json';
  }

  getCategories() : Observable<Category[]> {
    return this.http.get(this.categoryUrl)
               .map(this.extractData)
               .catch(this.handleError);
  }

  getFaqs(q = "", kind = "") : Observable<Faq[]> {
    return this.http.get(this.faqUrl + q + '?kind=' + kind)
               .map(this.extractData)
               .catch(this.handleError);
  }

  getReply(organNo: string, seqNo: number) : Observable<Reply> {
    var key = organNo + '-' + seqNo;
    var flag = sessionStorage.getItem(key) ? 'R' : 'N';
    sessionStorage.setItem(key, new Date().toString());
    return this.http.get(this.faqUrl + organNo + '?seqNo=' + seqNo + '&updFlag=' + flag)
               .map(this.extractData)
               .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
