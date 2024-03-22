import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import IQuizleGameService from '../../ThereGame.Business/Domain/Util/Services/IQuizleGameService';
import IQuizlWordModel from "../../ThereGame.Business/Models/IQuizleWordModel";
import QuizlGameMapping from "../Util/Mapping/QuizlGameMapping";
import IQuizleGameModel from "../../ThereGame.Business/Models/IQuizleWordModel";

export default function useQuizlQueriesApi() {

    const quizlGameservice = appContainer.get<IQuizleGameService>(TYPES.QuizlGameService);

    return {
        create: async (quizleGame: IQuizlWordModel): Promise<Status> => {

            const token = localStorage.getItem("Token");
            if (!token) {
                return Status.Unauthorized;
            }

            const dto = new QuizlGameMapping().request(quizleGame, token)
            const result = await quizlGameservice.create(dto, token);
            if (result.status == Status.OK) {

            }
            return result.status;
        },

        // delete: async (id: string): Promise<Status> => {
          
        // },

        get: async (ids: string[]): Promise<IQuizleGameModel[]> => {
            const token = localStorage.getItem("Token");
            if (!token) {
                return [];
            }

            const result = await quizlGameservice.get(ids, token);

            if (result.status == Status.OK) {
                return  new QuizlGameMapping().response(result.data)
            }
            return [];
        },
        // update: async (phrase: IPhraseModel): Promise<Status> => {
          
        // }
    }
}