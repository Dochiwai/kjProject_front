import axios from "axios";
import { useState } from "react";
import "./MainLogin.css";
import $ from 'jquery';
import './i18n.js';
import { useTranslation } from "react-i18next";

function Main() {
  const { t, i18n } = useTranslation();
  formStyle();
  const changelanguageToKo = () => {
    window.sessionStorage.setItem('lang','ko');
    i18n.changeLanguage('ko')
  }
  const changelanguageToEn = () => {
    window.sessionStorage.setItem('lang','jp');
    i18n.changeLanguage('jp')
  }

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  
  const [joinPw, setJoinPw] = useState("");
  const [joinNickname, setJoinNickname] = useState("");
  const [joinEmail, setJoinEmail] = useState("");
  const [joinNation, setJoinNation] = useState("kr");
  
  const userLoginInsert = [
    {
      text: "email",
      type: "text",
      target: loginEmail,
      onChange: setLoginEmail,
    },
    {
      text: "pw",
      type: "text",
      target: loginPw,
      onChange: setLoginPw,
    },
  ];

  const userJoinInsert = [
    {
      text: "email",
      type: "text",
      target: joinEmail,
      onChange: setJoinEmail,
    },
    {
      text: "pw",
      type: "password",
      target: joinPw,
      onChange: setJoinPw,
    },
    {
      text: "nickname",
      type: "text",
      target: joinNickname,
      onChange: setJoinNickname,
    },
    {
      text: "nation",
      type: "text",
      target: joinNation,
      onChange: setJoinNation,
    },
  ]

  const login = (e) => {
    const data = {};
    userLoginInsert.forEach((loginInfo) => {
      data[loginInfo.text] = loginInfo.target;
    });

    axios
      .post("/user/login", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const join = (e) =>{
    const data = {};
    userJoinInsert.forEach((joinInfo) => {
      data[joinInfo.text] = joinInfo.target;
    });

    axios
      .post("/user/join", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });    
  }

  return (
    <div class="form">
      <div class="form-toggle"></div>
      <div class="form-panel one">
        <div class="form-header">
          <h1><h1>{t('login')}</h1></h1>
          <button onClick={changelanguageToKo}>{t('korea')}</button>
          <button onClick={changelanguageToEn}>{t('japan')}</button>  
        </div>
        <div class="form-content">
          <form>
            <div class="form-group">
              <label for="email">{t('email')}</label>
              <input type="text" id="loginEmail" name="loginEmail" required="required" onChange= {(e) => setLoginEmail(e.target.value)}/>
            </div>
            <div class="form-group">
              <label for="pw">{t('pw')}</label>
              <input type="password" id="loginPw" name="loginPw" required="required" onChange= {(e) => setLoginPw(e.target.value)}/>
            </div>
            <div class="form-group">
              <label class="form-remember">
                <input type="checkbox"/>{t('remember')}
              </label><a href="#" class="form-recovery">{t('findPw')}</a>
            </div>
            <div class="form-group">
              <button type="button" onClick={login}>{t('login')}</button>
            </div>
          </form>
        </div>
      </div>
      <div class="form-panel two">
        <div class="form-header">
          <h1>{t('join')}</h1>
        </div>
        <div class="form-content">
          <form>
            <div class="form-group">
              <label for="joinEmail">{t('email')}</label>
              <input type="text" id="joinEmail" name="joinEmail" onChange={(e)=>setJoinEmail(e.target.value)} required="required"/>
            </div>
            <div class="form-group">
              <label for="password">{t('pw')}</label>
              <input type="password" id="joinPw" name="joinPw" onChange={(e)=>setJoinPw(e.target.value)} required="required"/>
            </div>
            <div class="form-group">
              <label for="joinNickname">{t('nickname')}</label>
              <input type="text" id="joinNickname" name="joinNickname" onChange={(e)=>setJoinNickname(e.target.value)} required="required"/>
            </div>
            <div class="form-group">
              <label for="joinNation">{t('nation')}</label>
              <select id = "joinNation" name = "joinNation" onChange={(e)=>setJoinNation(e.target.value)}>
                <option value = "kr">{t('korea')}</option>
                <option value = "jp">{t('japan')}</option>
              </select>
            </div>
            <div class="form-group">
              <button type="button" onClick={join}>{t('confirm')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function formStyle(){
  $(document).ready(function() {
    var panelOne = 550,
      panelTwo = $('.form-panel.two')[0].scrollHeight;
  
    $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
      e.preventDefault();
  
      $('.form-toggle').addClass('visible');
      $('.form-panel.one').addClass('hidden');
      $('.form-panel.two').addClass('active');
      $('.form').animate({
        'height': panelTwo
      });
    });
  
    $('.form-toggle').on('click', function(e) {
      e.preventDefault();
      $(this).removeClass('visible');
      $('.form-panel.one').removeClass('hidden');
      $('.form-panel.two').removeClass('active');
      $('.form').animate({
        'height': panelOne
      });
    });
  });
  
}

export default Main;
