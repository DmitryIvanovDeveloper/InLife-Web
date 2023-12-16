import { Container } from "inversify";
import IThereGameDataService from "./ThereGame.Business/Domain/Util/Services/IThereGameDataService";
import ThereGameDataService from "./ThereGame.Api/ThereGameDataService.ts";
import { TYPES } from "./types.ts";
import IDialogueService from "./ThereGame.Business/Domain/Util/Services/IDialogueService.ts";
import IPhraseService from "./ThereGame.Business/Domain/Util/Services/IPhraseService.ts";
import DialogueService from "./ThereGame.Infrastructure/Services/Dialogue/DialogueService.ts";
import PhraseService from "./ThereGame.Infrastructure/Services/Dialogue/PhraseService.ts";
import IAnswerService from "./ThereGame.Business/Domain/Util/Services/IAnswerService.ts";
import AnswerService from "./ThereGame.Infrastructure/Services/Dialogue/AnswerService.ts";

export const appContainer = new Container();

appContainer.bind<IThereGameDataService>(TYPES.ThereGameDataService).to(ThereGameDataService).inSingletonScope();
appContainer.bind<IDialogueService>(TYPES.DialogueService).to(DialogueService).inSingletonScope();
appContainer.bind<IPhraseService>(TYPES.PhraseService).to(PhraseService).inSingletonScope();
appContainer.bind<IAnswerService>(TYPES.AnswerService).to(AnswerService).inSingletonScope();