import {useContext, useState} from 'react';
import { UserContext } from '../contexts/UserContext';
import { Dashboard } from './Dashboard';
import { Login } from './Login';
import { Signup } from './Signup';

export function FauxRouter() {
  const {activeUser} = useContext(UserContext);
  const [pageToShow, setPageToShow] = useState("login");
  
  return activeUser ? <Dashboard></Dashboard> : 
    pageToShow === 'login' ? 
      <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
        <Login></Login>
        <p>New User? <button onClick={() => setPageToShow("register")}>Register</button></p>
      </div> :
      <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
        <Signup></Signup>
        <p>Already signed up? <button onClick={() => setPageToShow("login")}>Login</button></p>
      </div>
}