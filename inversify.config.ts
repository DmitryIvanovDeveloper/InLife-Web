import { Container } from "inversify";

const appContainer = new Container();

// appContainer.bind<ISignInViewModel>(TYPES.SignInViewModel).to(SignInViewModel).inSingletonScope();