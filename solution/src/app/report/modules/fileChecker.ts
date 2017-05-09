/**
 * Created by mattyyzac on 2016/11/14.
 */

/*
 * check single file size
 * ok = true,
 * > 10MB = false
 *
 * */
export let checkFilesSize = (f: File): boolean => {
  const limit: number = 10485760; // 10MB = 10 * 1024 * 1024

  let ret = f.size <= limit;
  if (!ret) {
    alert(`'${f.name}' 超過單檔 10MB 上限`);
  }
  return ret;
}

/*
 * check total files size
 * ok = true
 * >20MB = false
 *
 * */
export let checkTotalFilesSize = (f: File[]): boolean => {
  const limit: number = 20971520; //20MB = 20 * 1024 * 1024
  let tsize: number = 0;
  for(let i=0; i<f.length; i++){
    tsize += f[i].size;
  }

  let ret = tsize <= limit;
  if (!ret){
    alert('上傳檔案超過總合 20MB 上限');
  }
  return ret;
}

/*
 * check file name contains a ;
 * ok = true;
 * has ; = false;
 *
 * */
export let checkFileName = (f: File): boolean => {
  let name = '';
  if (f.name.split('.')[0])
    name = f.name.split('.')[0];

  let ret = name.indexOf(';') == -1;
  if (!ret){
    alert(`'${f.name}' 檔名包含 ; 分號`);
  }
  return ret;
}

/*
 * check file's ext name
 * ok = true
 *
 * */
export let checkExtName = (f: File): boolean => {
  let extName = '';
  if (f.name.toLowerCase().split('.'))
    extName = f.name.split('.').pop();

  const available = ['doc', 'docx', 'xls', 'xlsx',
    'pdf', 'txt',
    'bmp', 'jpg', 'jpeg', 'gif', 'png', 'odt', 'ods',
    'zip'];
  let ret = available.indexOf(extName.toLowerCase()) >= 0;
  if (!ret){
    alert(`'${f.name}' 副檔名不屬於允許上傳類型`);
  }
  return ret;
}

export let checkFilenameIsExist = (files: File[], container: File[]): File[] => {
  let temp: File[] = [];
  for(let j = 0; j < files.length; j++){
    let fname = files[j].name;
    for(let i = 0; i < container.length; i++){
      let sameFileName = container[i].name.indexOf(fname) > -1;
      if (sameFileName){
        alert(`'${fname}' 檔名已存在，請重新選擇檔案`);
        temp = this.sliceItem(files, j);
        return temp;
      }
    } // i
  } // j
  return files;
}
function sliceItem(fs: File[], delIndex: number): File[]{
  //wtf! array.splice | slice cannot use here! why?
  let ret: File[] = [];
  if (!fs || !delIndex)
    return [];

  for(let i = 0; i < fs.length; i++){
    if (i !== delIndex){
      ret.push(fs[i]);
    }
  }
  return ret;
}

export let joinUploadedFileName = (files: File[]): string => {
  let result = '';
  for(let i=0; i < files.length; i++){
    result += files[i].name + ';';
  }
  if (result.substring(result.length - 1) === ';'){
    result = result.substring(0, result.length - 1);
  }
  //console.log(result);
  return result;
}

export let genCaseToken = (length: number): string => {
  let text: string = ''; //final result
  let possibilities = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  for(let i = 0; i < length; i++ ){
    text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
  }
  return text;
}

export let getFormData = (formData: any): string => {
    let result =
      `Subj_Item=`+                '01'
      + `&Subj_Subitem=`+          '01'
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
