import { Container } from "inversify";
import IThereGameDataService from "./ThereGame.Business/Domain/Util/Services/IThereGameDataService";
import ThereGameDataService from "./ThereGame.Api/ThereGameDataService";
import { TYPES } from "./types";
import IDialogueService from "./ThereGame.Business/Domain/Util/Services/IDialogueService";
import IPhraseService from "./ThereGame.Business/Domain/Util/Services/IPhraseService";
import DialogueService from "./ThereGame.Infrastructure/Services/Dialogue/DialogueService";
import PhraseService from "./ThereGame.Infrastructure/Services/Dialogue/PhraseService";
import IAnswerService from "./ThereGame.Business/Domain/Util/Services/IAnswerService";
import AnswerService from "./ThereGame.Infrastructure/Services/Dialogue/AnswerService";

export const appContainer = new Container();

appContainer.bind<IThereGameDataService>(TYPES.ThereGameDataService).to(ThereGameDataService).inSingletonScope();
appContainer.bind<IDialogueService>(TYPES.DialogueService).to(DialogueService).inSingletonScope();
appContainer.bind<IPhraseService>(TYPES.PhraseService).to(PhraseService).inSingletonScope();
appContainer.bind<IAnswerService>(TYPES.AnswerService).to(AnswerService).inSingletonScope();