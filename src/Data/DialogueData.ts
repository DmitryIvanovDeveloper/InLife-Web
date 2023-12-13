import { v4 as uuidv4 } from 'uuid';
import { IDialogueModel } from '../ThreGame.Business/Models/IDialogueModel';


export const dialoguesTemplate: IDialogueModel[] = [{
    id: "65079c83-07b7-412a-98fe-8ce5c7a239e7",
    name: "Huy Sobachiy",
    phrase: {
        parentId: "65079c83-07b7-412a-98fe-8ce5c7a239e7",
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
            translate: 'Привет Джон',
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
            translate: 'Привет',
            text: "Hello",
            wordsToUse: [],
            explanations: [],
            phrases: [],
        }],
    }
}]