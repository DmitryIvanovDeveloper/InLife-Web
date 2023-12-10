import { v4 as uuidv4 } from 'uuid';
import { IDialogueModel } from '../../Business/Models/IDialogueModel';


export const dialoguesTemplate: IDialogueModel[] = [{
    id: "8943434-534545-65657-6767",
    phrase: {
        parentId: "8943434-534545-65657-6767",
        id: "7er9rere-54546-6767-",
        text: "Hello, my name is John",
        tensesList: [
            "Present Simple"
        ],
        comments: "What ti loh",
        answers: [{
            parentId: "7er9rere-54546-6767-",
            id: "8954054-54545",
            tensesList: [
                "Present Simple"
            ],
            text: "Hello, John",
            wordsToUse: [],
            explanations: [],
            phrases: [],
        },
        {
            parentId: "785454-545-545",
            id: "95454-545-545",
            tensesList: [
                "Present Simple"
            ],
            text: "Hello",
            wordsToUse: [],
            explanations: [],
            phrases: [],
        }],
    }
}]