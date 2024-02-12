import { useDialoguesStatistic } from "../../Data/useDialogueStatistic";
import { appContainer } from "../../inversify.config";
import IStudentDialogueStatisticService from "../../ThereGame.Business/Domain/Util/Services/IDialogueStatisticService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { TYPES } from "../../types";

export default function useDialogueStatisticApi() {
    const dialogueStatisticService = appContainer.get<IStudentDialogueStatisticService>(TYPES.DialogueStatisticService);
    const [_, setDialoguesStatistic] = useDialoguesStatistic();

    return {
        get: async (id: string): Promise<Status> => {
            var result = await dialogueStatisticService.GetByStudentId(id);
            setDialoguesStatistic(result.data);
            return result.status;
        }
    }
}