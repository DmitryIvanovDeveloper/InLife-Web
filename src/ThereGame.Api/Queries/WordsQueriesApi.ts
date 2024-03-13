import ITeacherService from "../../ThereGame.Business/Domain/Util/Services/ITeacherService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { ITeacherBio } from "../../Components/Profile/ProfileEditor";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import TeacherMapping from "../Util/Mapping/TeacherMapping";
import IWordService from "../../ThereGame.Business/Domain/Util/Services/IWordService";
import WordMapping from "../Util/Mapping/WordMapping";
import IWordModel from "../../ThereGame.Business/Models/IWordModel";

export default function useWordsQueriesApi() {

    const wordsService = appContainer.get<IWordService>(TYPES.WordsService);

    return {
        get: async (): Promise<IWordModel[]> => {

            var response = await wordsService.get();
            console.log(response);
            if (response.status == Status.OK)
            {
                return new WordMapping().response(response.data);
            }
            
            return [];
        },
    }
}