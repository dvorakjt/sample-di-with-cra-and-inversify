import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export function Dashboard() {
  const userContext = useContext(UserContext);

  return <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
    <div style={{width: "fit-content", height: "fit-content", padding: "20px", boxShadow: "4px 4px 4px lightgray", borderRadius: "4px", border: "1px solid lightgray"}}>
    <h1 style={{fontSize: "18px", textAlign: "center"}}>Welcome, {userContext.activeUser?.username}</h1>
    <p>Your favorite color is: {userContext.activeUser?.favoriteColor}</p>
    <p>Your favorite food is: {userContext.activeUser?.favoriteFood}</p>
    <button disabled={userContext.isLoading} onClick={() => {
      userContext.logout();
    }}>Logout</button>
    </div>
  </div>
}