import React, {createContext, PropsWithChildren, useContext, useState, useRef} from "react";
import { Credentials } from "../models/Credentials";
import { User } from "../models/User";
import { UserDetails } from "../models/UserDetails";
import { UserService } from "../services/service-interfaces";
import { TYPES } from "../services/types/types";
import { ServicesContext } from "./ServicesContext";

export const UserContext = createContext<any>(undefined);

//subscribing to observables provided by services and using these subscriptions to update state 
//allows the data from services to directly update the UI
export function UserContextProvider({children}:PropsWithChildren) {
  const serviceContext = useContext(ServicesContext);
  const serviceContainer = serviceContext?.servicesContainer;
  const userService = serviceContainer?.get<UserService>(TYPES.UserService);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const isLoadingSubscription = useRef(userService?.isLoading.subscribe({
    next: (status) => {
      console.log(status);
      if(isLoading !== status) setIsLoading(status);
    }
  }));

  const activeUserSubscription = useRef(userService?.activeUser.subscribe({
    next: (user) => {
      console.log("User");
      console.log(user);
      if(activeUser !== user) setActiveUser(user);
    }
  }));

  const errorSubsription = useRef(userService?.error.subscribe({
    next: (err) => {
      console.log(err);
      if(error !== err) setError(err);
    }
  }));

  const login = (credentials?:Credentials) => {
    userService?.login(credentials);
  }

  const signup = (userDetails:UserDetails, credentials?:Credentials) => {
    console.log(userDetails);
    console.log(credentials);
    userService?.signup(userDetails, credentials);
  }

  const logout = () => {
    userService?.logout();
  }

  return (
    <UserContext.Provider value={{
      isLoading, activeUser, error, login, signup, logout
    }}>{children}</UserContext.Provider>
  )
}