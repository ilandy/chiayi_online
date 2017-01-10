import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { QueryComponent } from './query/query.component';
import { FaqComponent } from './faq/faq.component';
import { TermComponent } from './term/term.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    QueryComponent,
    FaqComponent,
    TermComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
