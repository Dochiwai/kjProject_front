import axios from "axios";
import { createContext, useMemo, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Head from "./Head.js";
import Login from "./Login.js"; 
import './i18n.js';
import { useTranslation } from "react-i18next";

export const UserContext = createContext({
  setLoggedIn: () => {},
});

function App() {

  const { t, i18n } = useTranslation();
  const changelanguageToKo = () => {
    window.sessionStorage.setItem('lang','ko');
    i18n.changeLanguage('ko')
  }
  const changelanguageToEn = () => {
    window.sessionStorage.setItem('lang','en');
    i18n.changeLanguage('en')
  }

  const [loggedIn, setLoggedIn] = useState();
  const value = useMemo(() => (setLoggedIn), [setLoggedIn]);

  return (
    <UserContext.Provider value={{value :value ,setLoggedIn: setLoggedIn}}>
      <div>
        <div>
          <h1>{t('welcome')}</h1>
          user id : {loggedIn ? loggedIn : "null"}
          <button onClick={changelanguageToKo}>Korean</button>
          <button onClick={changelanguageToEn}>English</button>  
        </div>
        <Head />
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );

}


function Home() {
  const [users, setUsers] = useState([]);

  // POST 요청 전송
  useEffect(() => {
    axios
      .post("/user/findAll")
      .catch((e) => {
        console.log(e);
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <UserList users={users} usersUpdate={setUsers} />
    </>
  );
}

const UserList = ({ users, usersUpdate }) => {
  const rename = (e) => {
    var value = e.target.value;
    users[0].name = value;
    usersUpdate([...users]);
  };

  return (
    <div>
      <input type="text" onChange={rename}></input>
      {users.map((user) => {
        return (
          <div key={user.uid}>
            <ul>
              <li> uid : {user.uid}</li>
              <li> id : {user.id}</li>
              <li> pw : {user.pw}</li>
              <li> name : {user.name}</li>
              <li> nickname : {user.nickname}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

function Portfolio() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nation, setNation] = useState("");

  const columnInfoList = [
    {
      text: "id",
      type: "text",
      target : id,
      onChange: setId,
    },
    {
      text: "pw",
      type: "text",
      target: pw,
      onChange: setPw,
    },
    {
      text: "name",
      type: "text",
      target : name,
      onChange: setName,
    },
    {
      text: "phone",
      type: "text",
      target : phone,
      onChange: setPhone,
    },
    {
      text: "nickname",
      type: "text",
      target : nickname,
      onChange: setNickname,
    },
    {
      text: "email",
      type: "text",
      target : email,
      onChange: setEmail,
    },
    {
      text: "nation",
      type: "text",
      target : nation,
      onChange: setNation,
    },
  ];

  const join = (e) => {
    const data = {};
    columnInfoList.forEach(columnInfo => {
      data[columnInfo.text] = columnInfo.target;
    });

    axios
      .post("/user/save", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div>
        {columnInfoList.map((columnInfo, columnInfoIndex) => {
          return (
            <div key={columnInfoIndex}>
              {columnInfo.text} :{" "}
              <input
                type={columnInfo.type}
                onChange={(e) => columnInfo.onChange(e.target.value)}
              />{" "}
              <br />
            </div>
          );
        })}
        <br></br>
      </div>
      <div>
        <button onClick={join}>등록</button>
      </div>
    </div>
  );
}



export default App;
