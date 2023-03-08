import { Credentials } from "../../models/Credentials";
import { AuthDetails } from "../../models/AuthDetails";

export interface AuthService {
  authenticate(credentials?:Credentials) : Promise<AuthDetails>;
  register(credentials?:Credentials) : Promise<AuthDetails>;
  deauthenticate() : Promise<void>;
}