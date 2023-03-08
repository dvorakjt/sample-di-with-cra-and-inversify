import { AuthService } from "../service-interfaces";
import { AuthDetails } from "../../models/AuthDetails";
import { Credentials } from "../../models/Credentials";
import {v4 as uuidv4} from 'uuid';
import { injectable } from "inversify";

type userMap = {
  [key:string] : string //maps usernames (email addresses) to ids 
}

@injectable()
export class AuthServiceEmailOnly implements AuthService {
  private users:userMap = {};

  authenticate(credentials?:Credentials) : Promise<AuthDetails> {
    //implementation of authenticate taking only email
    return new Promise((resolve, reject) => {
      if(!credentials || !credentials?.username) reject("You must enter an email address");

      setTimeout(() => {
        const username = credentials?.username as string;
        const id = this.users[username];

        if(!id) reject("Incorrect credentials supplied.");
        else resolve({
          username,
          id
        });
      }, 2000);
    });
  }

  register(credentials?:Credentials) : Promise<AuthDetails> {
    //implementation of register taking only email
    return new Promise((resolve, reject) => {
      if(!credentials || !credentials?.username) reject("You must enter an email address");

      setTimeout(() => {
        const username = credentials?.username as string;
        let id = this.users[username];

        if(id) reject("You are already registed. Login instead!");
        else {
          id = uuidv4()
          this.users[username] = id;
          
          resolve({
            username,
            id
          });
        }
      }, 2000);
    });
  }

  deauthenticate() : Promise<void> {
    //implementation of deauthenticate for email-based auth
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    })
  }
}