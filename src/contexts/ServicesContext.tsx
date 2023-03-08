import React, {createContext, PropsWithChildren} from 'react';
import { Container } from "inversify";

//use of context allows the container specified to come from outside, making the everything more loosely coupled
//use of a container allows non-component service classes to access instances of other services
//these can also be passed directly into instances of these service classes in order to mock the classes they depend on

type ServicesContext = {
  servicesContainer:Container;
}

type ServicesContextProps = PropsWithChildren & {container:Container};

export const ServicesContext = createContext<ServicesContext | undefined>(undefined);

export function ServicesContextProvider({children, container}:ServicesContextProps) {
  return <ServicesContext.Provider value={{
    servicesContainer: container
  }}>{children}</ServicesContext.Provider>
}



