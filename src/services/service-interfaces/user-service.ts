import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { Credentials } from '../../models/Credentials';
import { UserDetails } from '../../models/UserDetails';

export interface UserService {
  isLoading:Observable<boolean>;
  error:Observable<string>;
  activeUser:Observable<User | null>;
  login(credentials?:Credentials) : void;
  signup(userDetails:UserDetails, credentials?:Credentials) : void;
  logout() : void;
}