import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

import { ReportComponent }              from './report/report.component';
import { QueryComponent }               from './query/query.component';
import { FaqComponent }                 from './faq/faq.component';
import { TermComponent }                from './term/term.component';
import { ProccessComponent }            from './proccess/proccess.component';

export const appRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'query',
    component: QueryComponent
  },
  {
    path: 'process',
    component: ProccessComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'faq/:page',
    component: FaqComponent
  },
  {
    path: 'term/:lable',
    component: TermComponent
  },
  {
    path: '**',
    component: ReportComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}