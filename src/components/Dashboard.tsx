import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export function Dashboard() {
  const userContext = useContext(UserContext);

  return (
  <div className="container">
    <div className="card">
      <h1 className="header">Welcome, {userContext.activeUser?.username}</h1>
      <p>Your favorite color is: {userContext.activeUser?.favoriteColor}</p>
      <p>Your favorite food is: {userContext.activeUser?.favoriteFood}</p>
      <button className="btn"disabled={userContext.isLoading} onClick={() => {
        userContext.logout();
      }}>Logout</button>
    </div>
  </div>
  );
}