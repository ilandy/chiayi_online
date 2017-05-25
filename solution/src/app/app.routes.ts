import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

import { ReportComponent }              from './report/report.component';
import { ReportDetailComponent }        from './report/report-detail.component';
import { QueryComponent }               from './query/query.component';
import { QueryDetailComponent }        from './query/query-detail.component';

import { FaqComponent }                 from './faq/faq.component';
import { FaqDetailComponent }           from './faq/faq-detail.component';

import { TermComponent }                from './term/term.component';
import { ProcessComponent }             from './process/process.component';


export const appRoutes: Routes = [
  {
    path: 'index',
    component: ReportComponent
  },
  {
    path: 'report/:id/:subId',
    component: ReportDetailComponent
  },
  {
    path: 'query',
    component: QueryComponent
  },
  {
    path: 'query/:id',
    component: QueryDetailComponent
  },
  {
    path: 'process',
    component: ProcessComponent
  },
  {
    path: 'faq/:page',
    component: FaqComponent
  },
  {
    path: 'faq',
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
