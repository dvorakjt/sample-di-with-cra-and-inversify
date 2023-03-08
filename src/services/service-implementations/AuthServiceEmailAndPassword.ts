import { AuthService } from "../service-interfaces";
import { AuthDetails } from "../../models/AuthDetails";
import { Credentials } from "../../models/Credentials";
import {v4 as uuidv4} from 'uuid';
import { injectable } from "inversify";

type userMap = {
  [key:string] : {
    username:string;
    password:string;
    id:string;
  }
}

@injectable()
export class AuthServiceEmailAndPassword implements AuthService {
  private users:userMap = {};

  authenticate(credentials?:Credentials) : Promise<AuthDetails> { 
    //implementation of auth service taking email and password
    return new Promise((resolve, reject) => {
      if(!credentials || (!credentials.username && !credentials.password)) reject("You must enter a username and password");
      if(!credentials?.username) reject("You must enter a username");
      if(!credentials?.password) reject("You must enter a password");

      setTimeout(() => {
        console.log("credentials - username " + credentials?.username);

        const user = this.users[credentials?.username as keyof typeof this.users];

        if(!user ||
          user.password !== credentials?.password) reject("Incorrect credentials supplied.");
        else resolve({
          username : user.username,
          id: user.id
        });
      }, 2000);
    });
  }

  register(credentials?:Credentials) : Promise<AuthDetails> {
    //implementation of register taking email and password
    return new Promise((resolve, reject) => {
      if(!credentials || (!credentials.username && !credentials.password)) reject("You must enter a username and password");
      if(!credentials?.username) reject("You must enter a username");
      if(!credentials?.password) reject("You must enter a password");

      setTimeout(() => {
        if(this.users[credentials?.username as keyof typeof this.users]) reject("You are already registered. Login instead!");
        else {
          const user = {
            username: credentials?.username as string,
            password: credentials?.password as string,
            id: uuidv4()
          };
          this.users[user.username] = user;

          resolve({
            username : user.username,
            id: user.id
          });
        }
      }, 2000);
    });
  }

  deauthenticate() : Promise<void> {
    //implementation of deauthenticate for email and password based auth
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    })
  }
}