import { AuthService } from "../service-interfaces";
import { AuthDetails } from "../../models/AuthDetails";
import { Credentials } from "../../models/Credentials";
import { injectable } from "inversify";

@injectable()
export class AuthServiceGoogle implements AuthService {
  private registeredGoogleUser?:AuthDetails;

  authenticate(credentials?:Credentials) : Promise<AuthDetails> {
    //implementation of authenticate taking no credentials and instead using google
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!this.registeredGoogleUser) reject("You must sign up with Google first!");
        else resolve(this.registeredGoogleUser);
      }, 2000);
    });
  }

  register(credentials?:Credentials) : Promise<AuthDetails> {
    //implementation of register taking no credentials and instead using google
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.registeredGoogleUser) reject("You are already signed up with Google. Login instead!");
        else {
          this.registeredGoogleUser = {
            username: "bob@gmail.com",
            id: "1234"
          }
          resolve(this.registeredGoogleUser);
        }
      }, 2000);
    });
  }

  deauthenticate() : Promise<void> {
    //implementation of deauthenticate for google-based auth
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}