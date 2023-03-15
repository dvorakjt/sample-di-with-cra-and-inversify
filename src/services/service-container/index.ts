import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../types/types";
import { AuthService, UserRepositoryService, UserService } from "../service-interfaces";
import { AuthServiceEmailAndPassword, AuthServiceEmailOnly, AuthServiceGoogle, UserRepoServiceImpl, UserServiceImpl } from "../service-implementations";

const serviceContainer = new Container();

serviceContainer.bind<AuthService>(TYPES.AuthService).to(AuthServiceGoogle)
serviceContainer.bind<UserRepositoryService>(TYPES.UserRepositoryService).to(UserRepoServiceImpl);
serviceContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl).inSingletonScope();

export { serviceContainer };