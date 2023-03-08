import { injectable } from "inversify";
import { UserDetails } from "../../models/UserDetails";
import { UserRepositoryService } from "../service-interfaces";

type db = {
  [key:string] : UserDetails;
}

@injectable()
export class UserRepoServiceImpl implements UserRepositoryService {

  private db:db = {};

  create(id: string, userDetails:UserDetails): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.db[id] = userDetails;
        resolve(this.db[id]);
      }, 500);
    });
  }

  update(id: string, updatedDetails:UserDetails): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.db[id] = updatedDetails;
        resolve(this.db[id]);
      }, 500);
    });
  }

  findUserById(id: string): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.db[id];
        if(!user) reject("user not found");
        else resolve(user);
      }, 500);
    });
  }
}