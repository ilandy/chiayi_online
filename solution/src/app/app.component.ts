import { Component, Input }   from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  screenWidth: number = screen.availWidth;
  mb: boolean = false;

  getMenuActive (){
    if (this.screenWidth < 1100) {
      this.mb = !this.mb;
    }
  }

  public constructor() {
  }

  ngOnInit() {

  }
}
