import { useState, useContext } from "react"
import { ServicesContext } from "../contexts/ServicesContext";
import { UserContext } from "../contexts/UserContext";
import { AuthService } from "../services/service-interfaces";
import { TYPES } from "../services/types/types";

export function Login() {
  const servicesContext = useContext(ServicesContext);
  const userContext = useContext(UserContext);

  const servicesContainer = servicesContext?.servicesContainer;
  const authService = servicesContainer?.get<AuthService>(TYPES.AuthService);

  const authServiceType = authService?.constructor.name === "AuthServiceGoogle" ? "Google" : (authService?.constructor.name === "AuthServiceEmailOnly" ? "Email" : "Email And Password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
  <div className="card">
    <h1 className="header">Login With {authServiceType}</h1>
    {authServiceType !== "Google" && 
      <>
        <label>Email</label>
        <br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
      </>
    }
    {authServiceType === "Email And Password" && 
      <>
        <label>Password</label>
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <br />
      </>
    }
    <p className="error">{userContext.error}</p>
    <div className="btn-container">
      <button disabled={userContext.isLoading} className="btn" onClick={() => {
        userContext.login({username: email, password})
      }}>Login</button>
    </div>
  </div>);
}