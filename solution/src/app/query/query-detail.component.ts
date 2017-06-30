import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.scss']
})
export class QueryDetailComponent implements OnInit {


  @Input() queryDetail: any;
  @Input() queryForm: FormGroup;
  @Output() closeDetail = new EventEmitter();

  constructor() {

  }

  getLinks(Atth,qD) {
    let content = this.queryDetail.Content[0];
    let caseNo = content.case_no1 + '-' + content.case_no2 + '-' + content.case_no3 + '-' + content.case_no4;
    return encodeURIComponent(Atth.SerialNo)
           + "?fileName=" + encodeURIComponent(Atth.FileName)
           + "&caseNo="   + encodeURIComponent(caseNo)
           + "&suggName=" + encodeURIComponent(content.sugg_name)
           + "&organNo="  + qD.org_no + "&deptId=" + qD.dept_no
           + "&seqNo="    + qD.seq_no + "&sNo="    + qD.s_no;


  }

  wordsSplit (words:string) {
      if (words.length > 30) {
        return words.substr(0,30)+'...';
      } else {
        return words;
      }
  }

  goBack() {
    this.queryForm.setValue({
      Id: '',
      Owner: '',
      Mail: '',
      Recaptcha: ''
    });
    this.queryForm.markAsUntouched();
    this.closeDetail.emit();
    this.scrollTop();
  }
  scrollTop () {
    document.body.scrollTop = 0;
  }


  ngOnInit() {
    this.scrollTop();
  }


}
