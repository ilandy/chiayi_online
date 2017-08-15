import { RecaptchaCode } from './../interface/report';
import { ReportData } from './../interface/reportData';


const validationMsg = {
      needName:      '請輸入姓名',
      needLocation:  '請輸入事件地址',
      needDist:      '由於您的身份，請選擇事件發生的里別',
      needContnt:    '請輸入陳情案件內容',
      needEmail:     {
                        empty:  '請輸入 Email',
                        format: 'Email 格式錯誤'
                      },
      needPhone:     {
                        empty:  '您選擇的回覆方式為「電話回覆」，電話或行動電話請擇一輸入',
                        format: {
                          phone: '電話格式錯誤',
                          mob: '手機格式錯誤'
                        }
                      },
      needAddr:      '您選擇的回覆方式為「書面回覆」，請輸入書面寄送地址',
      needSex:       '請選擇性別',
      needAge:       '請選擇年齡',
      needRecaptcha: '請輸入驗證碼',
      done:          ''
    };
const RETURNOBJ = {
  msg : '',
  field: ''
};
const RegExp = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([\w\W\-\d]+\.)+[\w\W]{2,}))$/,
      phone: /^(0[2-8]{1})?\d{7,8}/,
      mob:   /^09\d{8}$/
}
export let formDataValidation = (formData: ReportData):any => {
   let screenWidth: number = screen.availWidth;
    //   姓名必填
    if(!formData.Sugg_Name){
      return {
        field: 'name',
        msg: validationMsg.needName
      }
    }

    //   案件地址必填
    if(!formData.Subj_Location){
      return {
        field: 'addr',
        msg: validationMsg.needLocation
      }
    }

    //   陳請內容必填
    if(!formData.Subj_Content){
      return {
        field: 'comment',
        msg: validationMsg.needContnt
      }
    }

    //   Email 必填 (格式為 Email)
    if(!formData.Sugg_Email){
        return {
          field: 'email',
          msg: validationMsg.needEmail.empty
        }
    } else if (formData.Sugg_Email.search(RegExp.email)) {
        return {
          field: 'email',
          msg: validationMsg.needEmail.format
        }
    }
    // 回覆方式為電話時，需填寫其中一個電話欄位
    if (formData.Sugg_ReplyWay === '1' ){

      if(formData.Sugg_Mobile || formData.Sugg_Telno){

          if (formData.Sugg_Mobile && formData.Sugg_Mobile.search(RegExp.mob)) {
            return {
                field: screenWidth > 769? 'mobile1':'mobile2',
                msg: validationMsg.needPhone.format.mob
              }
          }
          if (formData.Sugg_Telno && formData.Sugg_Telno.search(RegExp.phone)){
              return {
                  field: screenWidth > 769? 'phone1':'phone2',
                  msg: validationMsg.needPhone.format.phone
              }
           }

      } else {
        return {
              field: screenWidth > 769? 'phone1':'phone2',
              msg: validationMsg.needPhone.empty
            }
      }
    }

    //   回覆方式為 2 時 Addr1,2,4 必填
    if (formData.Sugg_ReplyWay === '2' && !formData.Sugg_Addr4){
      return {
              field: 'addr4',
              msg: validationMsg.needAddr
            }
    }
    //   角色驗證
    if(formData.Sugg_TypeId === "3" || formData.Sugg_TypeId === "5"){
      if(formData.Subj_Zone==='0'){
        return {
                field: 'location',
                msg: validationMsg.needDist
        }
      }
    }
    //   年齡必填
    if (!formData.Sugg_AgeRng){
       return {
              field: 'age0',
              msg: validationMsg.needAge
            }
    }

    //   性別必填
    // if (!formData.Sugg_Sex){
    //    return {
    //           field: 'sex0',
    //           msg: validationMsg.needSex
    //         }
    // }

    //   驗證碼必填 (A-z0-9 Rxp)
    if (!formData.Input_ValidationCode){
       return {
              field: 'validationCode',
              msg: validationMsg.needRecaptcha
            }
    }

    //  驗證全過
    return validationMsg.done;
  }

export let getFormData = (formData: ReportData, caseData: any, recaptcha: RecaptchaCode): string => {
    let result =
      `Subj_Item=`+                caseData.Id
      + `&Subj_Subitem=`+          caseData.SubId
      + `&Case_Token=`+            formData.Case_Token
      + `&Sugg_Name=`+             formData.Sugg_Name
      + `&Subj_Zone=`+             formData.Subj_Zone
      + `&Subj_District=`+         formData.Subj_District
      + `&Subj_Location=`+         formData.Subj_Location
      + `&Subj_GPS=`+              (formData.Subj_GPS?formData.Subj_GPS:"")
      + `&Subj_Content=`+          formData.Subj_Content
      + `&Subj_IsinDanger=`+       (formData.Subj_IsinDanger?formData.Subj_IsinDanger:"N")

      + `&Subj_FileCount=`+        formData.Subj_FileCount
      + `&Atth_FileNames=`+        formData.Atth_FileNames

      + `&Sugg_ReplyWay=`+         (formData.Sugg_ReplyWay?formData.Sugg_ReplyWay:"0")
      + `&Sugg_Email=`+            formData.Sugg_Email
      + `&Sugg_Telno=`+            (formData.Sugg_Telno?formData.Sugg_Telno:"")
      + `&Sugg_Mobile=`+           (formData.Sugg_Mobile?formData.Sugg_Mobile:"")
      + `&Sugg_Addr1=`+            (formData.Sugg_Addr1?formData.Sugg_Addr1:"")
      + `&Sugg_Addr2=`+            (formData.Sugg_Addr2?formData.Sugg_Addr2:"")
      + `&Sugg_Addr3=`+            (formData.Sugg_Addr3?formData.Sugg_Addr3:"")
      + `&Sugg_Addr4=`+            (formData.Sugg_Addr4?formData.Sugg_Addr4:"")

      + `&Sugg_TypeId=`+           formData.Sugg_TypeId
      + `&Sugg_AgeRng=`+           formData.Sugg_AgeRng
      + `&Sugg_Sex=`+              formData.Sugg_Sex

      + `&Input_ValidationCode=`+  formData.Input_ValidationCode
      + `&Hash_Code=`+             encodeURIComponent(recaptcha.HashCode)
      + `&Time_Stamp=`+            recaptcha.TimeStamp;

    return result;
}
