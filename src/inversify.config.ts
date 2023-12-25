import { Container } from "inversify";
import { TYPES } from "./types";
import IDialogueService from "./ThereGame.Business/Domain/Util/Services/IDialogueService";
import IPhraseService from "./ThereGame.Business/Domain/Util/Services/IPhraseService";
import DialogueService from "./ThereGame.Infrastructure/Services/Dialogue/DialogueService";
import PhraseService from "./ThereGame.Infrastructure/Services/Dialogue/PhraseService";
import IAnswerService from "./ThereGame.Business/Domain/Util/Services/IAnswerService";
import AnswerService from "./ThereGame.Infrastructure/Services/Dialogue/AnswerService";
import IAuthenticationService from "./ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import AuthenticationService from "./ThereGame.Infrastructure/Services/AuthenticationService";
import IUserService from "./ThereGame.Business/Domain/Util/Services/IUserService";
import UserService from "./ThereGame.Infrastructure/Services/UserService";

export const appContainer = new Container();

////  Services
appContainer.bind<IDialogueService>(TYPES.DialogueService).to(DialogueService).inSingletonScope();
appContainer.bind<IPhraseService>(TYPES.PhraseService).to(PhraseService).inSingletonScope();
appContainer.bind<IAnswerService>(TYPES.AnswerService).to(AnswerService).inSingletonScope();
appContainer.bind<IAuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService).inSingletonScope();
appContainer.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();

