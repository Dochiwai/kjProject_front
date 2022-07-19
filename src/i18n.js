import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  jp: {
    translation: {
      "login": "ログイン"
      ,"korea" : "韓国語"
      ,"japan" : "日本語"
      ,"id" : "ID"
      ,"pw" : "パスワード"
      ,"pwre" : "パスワード再入力"
      ,"remember" : "ID記憶"
      ,"findPw" : "パスワード探す"
      ,"email" : "メール"
      ,"phone" : "携帯番号"
      ,"nation" : "国籍"
      ,"name" : "名"
      ,"nickname" : "ニックネーム"
      ,"join" : "会員加入"
      ,"confirm" : "登録"
    }
  },
  ko: {
    translation: {
      "login": "로그인"
      ,"korea" : "한국"
      ,"japan" : "일본"
      ,"id" : "아이디"
      ,"pw" : "비밀번호"
      ,"pwre" : "비밀번호 재입력"
      ,"remember" : "아이디저장"
      ,"findPw" : "비밀번호찾기"
      ,"email" : "이메일"
      ,"phone" : "핸드폰"
      ,"nation" : "국가"
      ,"name" : "이름"
      ,"nickname" : "닉네임"
      ,"join" : "회원가입"
      ,"confirm" : "등록하기"
    }
  }
};

let lang = window.sessionStorage.getItem('lang');
if(lang === null){
    lang = 'kr';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lang,
  });
export default i18n;