import { ReportData } from './../interface/reportData';

const validationMsg = {
      needName :         '請輸入姓名',
      needLocation :     '請輸入事件地址',
      needContnt :       '請輸入陳情案件內容',
      needEmail :        '請輸入Email',
      needPhone :        '您選擇的回覆方式為「電話回覆」，電話或行動電話請擇一輸入',
      needAddr :         '您選擇的回覆方式為「書面回覆」，請輸入書面寄送地址',
      needRecaptcha :    '請輸入驗證碼',
    };

export let formDataValidation = (formData: ReportData) => {


    //   姓名必填
    this.isNameValid(formData.Sugg_Name);

    //   案件地址必填
    this.isLocationValid(formData.Subj_Location);

    //   陳請內容必填
    this.isContentValid(formData.Subj_Content);

    //   Email 必填 (格式為 Email)
    this.isEmailValid(formData.Sugg_Email);

    //   回覆方式為 2 時 Mobile or Telno 則一必填 (格式為純數字)
     this.isEmailValid(formData.Sugg_Email);
    if (formData.Sugg_ReplyWay === '2' && (!formData.Sugg_Mobile||!formData.Sugg_Telno)){
      alert(validationMsg.needPhone);
    }
    //   回覆方式為 3 時 Addr1,2,4 必填
    if (formData.Sugg_ReplyWay === '3' && (!formData.Sugg_Addr1||!formData.Sugg_Addr2||!formData.Sugg_Addr4)){

      alert(validationMsg.needAddr);
    }
    //   驗證碼必填 (A-z0-9 Rxp)
    if (formData.Input_ValidationCode){

      alert(validationMsg.needRecaptcha);
    }

  }

export let isNameValid = (formField:string) => {
  if (!formField) {
    alert(validationMsg.needName);
  }
}
export let isLocationValid = (formField:string) => {
  if (!formField) {
    alert(validationMsg.needLocation);
  }
}
export let isContentValid = (formField:string) => {
  if (!formField) {
    alert(validationMsg.needContnt);
  }
}
export let isEmailValid = (formField:string) => {
  if (!formField) {
    alert(validationMsg.needEmail);
  }
}
export let isPhoneValid = (formField:ReportData) => {
  if (formField.Sugg_ReplyWay === '2' && (!formField.Sugg_Mobile||!formField.Sugg_Telno)){
      alert(validationMsg.needPhone);
  }
  if (!formField) {
    alert(validationMsg.needEmail);
  }
}

export let getFormData = (formData: ReportData, caseData: any): string => {
    let result =
      `Subj_Item=`+                caseData.Id
      + `&Subj_Subitem=`+          caseData.SubId
      + `&Case_Token=`+            formData.Case_Token
      + `&Sugg_Name=`+             formData.Sugg_Name
      + `&Subj_Zone=`+             formData.Subj_Zone
      + `&Subj_District=`+         formData.Subj_District
      + `&Subj_Location=`+         formData.Subj_Location
      + `&Subj_Content=`+          formData.Subj_Content
      + `&Subj_IsinDanger=`+       formData.Subj_IsinDanger

      + `&Subj_FileCount=`+        formData.Subj_FileCount
      + `&Atth_FileNames=`+        formData.Atth_FileNames

      + `&Sugg_ReplyWay=`+         formData.Sugg_ReplyWay
      + `&Sugg_Email=`+            formData.Sugg_Email
      + `&Sugg_Telno=`+            formData.Sugg_Telno
      + `&Sugg_Mobile=`+           formData.Sugg_Mobile
      + `&Sugg_Addr1=`+            (formData.Sugg_Addr1?formData.Sugg_Addr1:"")
      + `&Sugg_Addr2=`+            (formData.Sugg_Addr2?formData.Sugg_Addr2:"")
      + `&Sugg_Addr3=`+            (formData.Sugg_Addr3?formData.Sugg_Addr3:"")
      + `&Sugg_Addr4=`+            (formData.Sugg_Addr4?formData.Sugg_Addr4:"")

      + `&Sugg_TypeId=`+           formData.Sugg_TypeId
      + `&Sugg_AgeRng=`+           formData.Sugg_AgeRng
      + `&Sugg_Sex=`+              formData.Sugg_Sex

      + `&Input_ValidationCode=`+  formData.Input_ValidationCode
      + `&Hash_Code=`+             formData.Hash_Code
      + `&Time_Stamp=`+            formData.Time_Stamp;

    return result;
}
