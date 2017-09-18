import { Injectable } from "@angular/core";

@Injectable ()

export class ScrollAnimate {
  public handler: any;
  speed: number = 50;

  action (target:HTMLElement, space:number){
    var scrollNow = document.body,
        targetPosition = target.offsetTop+space;

    if(scrollNow.scrollTop < targetPosition) {
        scrollNow.scrollTop+= this.speed;
        this.handler = window.requestAnimationFrame(()=>{
          this.action(target,space)
        });
    } else {
      scrollNow.scrollTop = targetPosition;
    }
  }
}

export class BaseAPIURL {
  public readonly remoteUrl = 'https://CYWebAPI.chiayi.gov.tw/API/'; //'http://ndemo.tw-futaba.com.tw/ChiayiWAPI/api/'
  public readonly localUrl  = './assets/data/';
}
