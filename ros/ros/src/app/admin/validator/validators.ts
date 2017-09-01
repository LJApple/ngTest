import {FormControl} from "@angular/forms";

// 只包含英文字母和数字
export function identifierValidator(control: FormControl) {
    let myreg = /^[0-9a-zA-Z\-]{1,32}$/;
    let valid = myreg.test(control.value);
    /*    console.log("编码验证器" + valid);*/
    return valid ? null : {no: true};
}

// 不包含特殊字符的验证器 ^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$
export function normalTextValidator(control: FormControl) {
    const myreg = /^[a-zA-Z0-9\u4e00-\u9fff]{1,32}$/;
    let valid = myreg.test(control.value);
    /*    console.log("编码验证器" + valid);*/
    return valid ? null : {message: true};
}

// 最大长度为32位的数字
export function Num32Validator(control: FormControl) {
    let myreg = /^[0-9]{0,32}$/;
    let valid = myreg.test(control.value);
    /*    console.log("编码验证器" + valid);*/
    return valid ? null : {no: true};
}

export function normalTex64tValidator(control: FormControl) {
    const myreg = /^[a-zA-Z0-9\u4e00-\u9fff]{1,64}$/;
    let valid = myreg.test(control.value);
    return valid ? null : {message: true};
}


// 有且只能是 中文 英文 数字
export function chineseEnglishNumberFilter (control: FormControl) {
    const myreg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    let valid = myreg.test(control.value);
    return valid ? null : {message: true};
}

// 有且只能是 英文 数字
export function EnglishNumberFilter (control: FormControl) {
    const myreg = /^[0-9a-zA-Z]+$/;
    let valid = myreg.test(control.value);
    return valid ? null : {message: true};
}

export function numberFilter (control: FormControl) {
    const myreg = /^\d+(\.\d+)?$/;
    let valid = myreg.test(control.value);
    return valid ? null : {message: true};
}

/*
 工序管理
*/

// 只包含英文字母和数字 16位
export function codeValidator(control: FormControl) {
    let myreg = /^[0-9a-zA-Z]{1,16}$/;
    let valid = myreg.test(control.value);
    /*    console.log("编码验证器" + valid);*/
    return valid ? null : {no: true};
}
// 只能输入数字 16位
export function onlyNumberFilter (control: FormControl) {
    const myreg = /^[0-9]{1,16}$/;
    let valid = myreg.test(control.value);
    return valid ? null : {message: true};
}
export function chineseNumberEnglishFilter (control: FormControl) {
    const myreg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,64}$/;
    let valid = myreg.test(control.value);
    return valid ? null : {message: true};
}

export function mobileNumber(control: FormControl){
   let reg = /^1(3|4|5|7|8)\d{9}$/;
   let valid = reg.test(control.value);
   return valid ? null : {message: true};
}


