import { ModuleWithProviders }          from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
import { ReportComponent }              from './report/report.component';
import { QueryComponent }               from './query/query.component';
import { FaqComponent }                 from './faq/faq.component';
import { TermComponent }                from './term/term.component';
import { ProccessComponent }            from './proccess/proccess.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/report',
    pathMatch: 'full'
  },
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

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
