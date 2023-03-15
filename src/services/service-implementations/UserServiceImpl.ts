import { BehaviorSubject } from "rxjs";
import type { AuthService, UserRepositoryService, UserService } from "../service-interfaces";
import { User } from "../../models/User";
import { TYPES } from "../types/types";
import { inject, injectable } from "inversify";
import { AuthDetails } from "../../models/AuthDetails";
import { UserDetails } from "../../models/UserDetails";
import { Credentials } from "../../models/Credentials";

@injectable()
export class UserServiceImpl implements UserService {
  isLoading = new BehaviorSubject(false);
  error = new BehaviorSubject<string>("");
  activeUser = new BehaviorSubject<User | null>(null);

  constructor(@inject(TYPES.AuthService) private authService:AuthService, @inject(TYPES.UserRepositoryService) private userRepo:UserRepositoryService) {
  }

  login(credentials?:Credentials) : void {
    this.error.next("");
    this.isLoading.next(true);

    this.authService.authenticate(credentials)
      .then((authDetails:AuthDetails) => {
        this.userRepo.findUserById(authDetails.id)
          .then((userDetails:UserDetails) => {
            this.activeUser.next({...authDetails, ...userDetails});
            this.isLoading.next(false);
          })
          .catch((error) => {
            this.error.next(error);
            this.isLoading.next(false);
          });
      })
      .catch((error) => {
        this.error.next(error);
        this.isLoading.next(false);
      });
  }

  signup(userDetails:UserDetails, credentials?:Credentials) : void {
    this.error.next("");
    this.isLoading.next(true);

    this.authService.register(credentials)
      .then((authDetails:AuthDetails) => {
        this.userRepo.create(authDetails.id, userDetails)
          .then((userDetails:UserDetails) => {
            this.activeUser.next({...authDetails, ...userDetails});
            this.isLoading.next(false);
          })
          .catch((error) => {
            this.error.next(error);
            this.isLoading.next(false);
          });
      })
      .catch((error) => {
        this.error.next(error);
        this.isLoading.next(false);
      });
  }
  logout() : void {
    this.isLoading.next(true);
    this.authService.deauthenticate().then(() => {
      this.activeUser.next(null);
      this.isLoading.next(false);
    })
  }
}