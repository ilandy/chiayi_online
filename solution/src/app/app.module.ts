import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { BaseAPIURL } from './shared/global.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ReportComponent } from './report/report.component';
import { ReportDetailComponent } from './report/report-detail.component';
import { QueryComponent } from './query/query.component';
import { FaqComponent } from './faq/faq.component';
import { FaqDetailComponent } from './faq/faq-detail.component';

import { TermComponent } from './term/term.component';
import { ProcessComponent } from './process/process.component';
import { QueryDetailComponent } from './query/query-detail.component';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    ReportComponent,
    QueryComponent,
    FaqComponent,
    TermComponent,
    ProcessComponent,
    ReportDetailComponent,
    QueryDetailComponent,
    FaqDetailComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    BaseAPIURL
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
