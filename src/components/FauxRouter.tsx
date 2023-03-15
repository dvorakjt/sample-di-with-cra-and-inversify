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
      <div className="container">
        <Login></Login>
        <p>New User? <button className="btn" onClick={() => setPageToShow("register")}>Register</button></p>
      </div> :
      <div className="container">
        <Signup></Signup>
        <p>Already signed up? <button className="btn" onClick={() => setPageToShow("login")}>Login</button></p>
      </div>
}