import { useState, useContext } from "react"
import { ServicesContext } from "../contexts/ServicesContext";
import { UserContext } from "../contexts/UserContext";
import { AuthService } from "../services/service-interfaces";
import { TYPES } from "../services/types/types";

export function Signup() {
  const servicesContext = useContext(ServicesContext);
  const userContext = useContext(UserContext);

  const servicesContainer = servicesContext?.servicesContainer;
  const authService = servicesContainer?.get<AuthService>(TYPES.AuthService);

  const authServiceType = authService?.constructor.name === "AuthServiceGoogle" ? "Google" : (authService?.constructor.name === "AuthServiceEmailOnly" ? "Email" : "Email And Password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");

  return (
  <div style={{width: "fit-content", height: "fit-content", padding: "20px", boxShadow: "4px 4px 4px lightgray", borderRadius: "4px", border: "1px solid lightgray"}}>
    <h1 style={{fontSize: "18px", textAlign: "center"}}>Register With {authServiceType}</h1>
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
    <label>Favorite Color</label>
    <br />
    <input type="text" value={favoriteColor} onChange={(e) => setFavoriteColor(e.target.value)} />
    <br />
    <br />
    <label>Favorite Food</label>
    <br />
    <input type="text" value={favoriteFood} onChange={(e) => setFavoriteFood(e.target.value)} />
    <br />
    <br />
    <p>{userContext.error}</p>
    <button disabled={userContext.isLoading} onClick={() => {
      userContext.signup({favoriteColor, favoriteFood}, {username: email, password})
    }}>Register</button>
  </div>);
}