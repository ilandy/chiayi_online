import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";

import { BaseAPIURL } from '../shared/global.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UploadService {
  public uploadStatus: number;
  postReportURL: string;
  constructor (private _http: Http, private baseURL:BaseAPIURL) {
    this.postReportURL = baseURL.remoteUrl + 'Case/';
  }


  public sendFileRequest (url: string, files: File[]): Observable<any> {
    return Observable.create(observer => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }



  public postData(formData: string): Observable<any> {
    //ref: https://scotch.io/tutorials/angular-2-http-requests-with-observables
    //ref: https://developer.mozilla.org/zh-TW/docs/HTTP/Access_control_CORS

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this._http.post(this.postReportURL, formData, options) // ...using post request
      .map((resp: Response) => resp.json())
  }

  private retrieveData(data: Response): boolean {
    let message = data["_body"];
    //console.log(message);
    if (data.status == 200 && data.text().indexOf('登錄個案上傳成功') >= 0){
      return true;
    } else {
      return false;
    }
  }

}
