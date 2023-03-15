
# Dependency Injection with InversifyJS and Create React APP

## Inversion of Control and Dependency Injection
Inversion of Control and Depenency injection are powerful tools in a developers arsenal. These design patterns enable us to make our code more loosely coupled, more extensible and flexible, and more testable.

Frameworks like Angular are heavily reliant on Inversion of Control (IoC) and Dependency Injection (DI), and though these patterns are present in React in the form of Contexts and Props, I found myself wanting to be able to create service classes which could be autowired with each other, as well as passed into components via Context.

This project serves as a proof of concept for how these powerful patterns can be incorporated into a React app bootstrapped with Create React App.

## Setup
An IoC container is provided by InversifyJS, a popular IoC/DI library for JavaScript. This library allows you to designated classes as injectable, meaning that the container can recognize them and autowire them together with the classes upon with they depend, by marking them with the @injectable annotation. These dependences are marked with the @inject annotation.

Because CRA does not natively provide support for annotations, CRACO was used to override these settings, while avoiding ejecting CRA.

## Services
Interfaces are defined for each type of service that the application will use, defining the methods that each service is expected to have. The three service interfaces I've created are an auth service, a user repository service, and a user service.

The auth service provides methods for authenticating, registering, and deauthenticating. The user repository service provides methods for finding, creating and updating user records. Finally, the user service provides methods for logging in, signing up and logging out.

These services are implemented by concrete classes, and the implementation details of these can vary as long as the method signatures and return types match.

The services container defines which concrete service classes should be provided for which interface, and then these services are autowired with each other by the container.

The autowired services are provided to components within the React app via context.

This makes it really easy to swap service classes out for other classes implementing the same interfaces, thus bringing all the benefits of IoC and DI into React.