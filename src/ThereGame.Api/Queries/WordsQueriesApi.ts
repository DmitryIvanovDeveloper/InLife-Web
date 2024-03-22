import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import IWordService from "../../ThereGame.Business/Domain/Util/Services/IWordService";
import WordMapping from "../Util/Mapping/WordMapping";
import IWordModel from "../../ThereGame.Business/Models/IWordModel";
import { useWordsState } from "../../Data/useWords";

export default function useWordsQueriesApi() {

    const wordsService = appContainer.get<IWordService>(TYPES.WordsService);
    const [_, setWordsData] = useWordsState();
    
    const getWordsData = async (): Promise<IWordModel[]> => {

        var response = await wordsService.get();
        if (response.status == Status.OK)
        {
            var data = new WordMapping().response(response.data);
            setWordsData(data);
            return data;
        }
        
        return [];
    }

    return {
        get: async (): Promise<IWordModel[]> => {
           return await getWordsData();
        },
        update: async (cardData: IWordModel): Promise<any> => {

            const token = localStorage.getItem("Token");
            if (!token) {
                return undefined;
            }
            var data = new WordMapping().request(cardData);
            console.log(data);
            var response = await wordsService.update(token, data);
            await getWordsData();
        },
        create: async (cardData: IWordModel): Promise<any> => {

            const token = localStorage.getItem("Token");
            if (!token) {
                return undefined;
            }
            var data = new WordMapping().request(cardData);

            var response = await wordsService.create(token, data);
            await getWordsData();
        }
    }
}