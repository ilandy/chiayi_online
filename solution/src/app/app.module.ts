import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { ReportComponent } from './report/report.component';
import { QueryComponent } from './query/query.component';
import { FaqComponent } from './faq/faq.component';
import { TermComponent } from './term/term.component';
import { ProccessComponent } from './proccess/proccess.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    QueryComponent,
    FaqComponent,
    TermComponent,
    ProccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
