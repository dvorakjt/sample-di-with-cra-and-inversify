import { UserDetails } from "../../models/UserDetails";

export interface UserRepositoryService {
  findUserById(id:string) : Promise<UserDetails>;
  create(id:string, details:UserDetails) : Promise<UserDetails>;
  update(id:string, updatedDetails:UserDetails) : Promise<UserDetails>;
}