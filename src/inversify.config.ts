import { Container } from "inversify";
import IAnswerService from "./ThereGame.Business/Domain/Util/Services/IAnswerService";
import IAuthenticationService from "./ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import IDialogueService from "./ThereGame.Business/Domain/Util/Services/IDialogueService";
import IPhraseService from "./ThereGame.Business/Domain/Util/Services/IPhraseService";
import ITeacherService from "./ThereGame.Business/Domain/Util/Services/ITeacherService";
import AuthenticationService from "./ThereGame.Infrastructure/Services/AuthenticationService";
import AnswerService from "./ThereGame.Infrastructure/Services/Dialogue/AnswerService";
import DialogueService from "./ThereGame.Infrastructure/Services/Dialogue/DialogueService";
import PhraseService from "./ThereGame.Infrastructure/Services/Dialogue/PhraseService";
import TeacherService from "./ThereGame.Infrastructure/Services/TeacherService";
import { TYPES } from "./types";
import IStudentDialogueStatisticService from "./ThereGame.Business/Domain/Util/Services/IDialogueStatisticService";
import StudentDialogueStatisticService from "./ThereGame.Infrastructure/Services/Dialogue/DialogueStatisticService";
import IWordService from "./ThereGame.Business/Domain/Util/Services/IWordService";
import WordService from "./ThereGame.Infrastructure/Services/WordsService";

export const appContainer = new Container();

////  Services
appContainer.bind<IDialogueService>(TYPES.DialogueService).to(DialogueService).inSingletonScope();
appContainer.bind<IPhraseService>(TYPES.PhraseService).to(PhraseService).inSingletonScope();
appContainer.bind<IAnswerService>(TYPES.AnswerService).to(AnswerService).inSingletonScope();
appContainer.bind<IAuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService).inSingletonScope();
appContainer.bind<ITeacherService>(TYPES.TeacherService).to(TeacherService).inSingletonScope();
appContainer.bind<IStudentDialogueStatisticService>(TYPES.DialogueStatisticService).to(StudentDialogueStatisticService).inSingletonScope();
appContainer.bind<IWordService>(TYPES.WordsService).to(WordService).inSingletonScope();

