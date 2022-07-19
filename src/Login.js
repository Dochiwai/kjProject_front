import axios from "axios";
import { useLocalStorage , useContext, useState } from "react";
import { UserContext } from './App';

function Login() {
  
    const[id,setId] = useState("");
    const[pw,setPw] = useState("");
    const[userInfo,setUserInfo] = useState("");
    const { setLoggedIn } = useContext(UserContext);

    const userInsert =[
      {
        text : "id",
        type : "text",
        target : id,
        onChange : setId,
      },
      {
        text : "pw",
        type : "text",
        target : pw ,
        onChange : setPw,
      }
    ]
    
    const login = (e) => {
      
      const data = {};
      userInsert.forEach(loginInfo =>{
        data[loginInfo.text] = loginInfo.target;
      });
  
      axios
      .post('/user/login',data)
      .then((response) =>{
        setUserInfo(response.data);
        setLoggedIn(response.data.uid);
      })
      .catch((e) =>{
        console.log(e);
      })
  
    }
  
    return(
      <div>
        {userInsert.map((userInsertInfo,userInsertKey) => {
          return(
            <div key = {userInsertKey}>
              {userInsertInfo.text} : {" "}
              <input type = {userInsertInfo.type}
                onChange = {(e) => userInsertInfo.onChange(e.target.value)}
              ></input>
            </div>
          );
        })}
        <div>
          <button onClick={login}>로그인</button>
        </div>
        <div>
          <>
            <LoginUserInfo userInfo = {userInfo} />
          </>
        </div>
      </div>
    )
  }
  
  const IsLogin = ({userInfo}) =>{
    if(userInfo === ""){
      return(
        <div>로그인을 해주세요</div>
      )
    }else{
      return(
        <div> {userInfo.id} 님</div>
      )
    }
  }
  
  const LoginUserInfo = ({userInfo}) => {
    return(
      <div>
        user.uid : {userInfo.uid}<br></br>
        user.id : {userInfo.id}<br></br>
        user.name : {userInfo.name}<br></br>
        user.nickname : {userInfo.nickname}<br></br>
        user.nation : {userInfo.nation}<br></br>
        user.phone : {userInfo.phone}<br></br>
        user.email : {userInfo.email}<br></br>
        user.url : <img src = {userInfo.url} alt="프로필사진"></img>
        <IsLogin userInfo = {userInfo}></IsLogin>
      </div>
    );
  };

export default Login;

