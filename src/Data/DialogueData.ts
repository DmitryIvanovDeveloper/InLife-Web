import { id } from 'inversify';
import { IDialogueModel } from '../ThereGame.Business/Models/IDialogueModel';
import { LanguageType } from './LanguageType';
import IAnswerModel from '../ThereGame.Business/Models/IAnswerModel';

export const dialoguesTemplate: IDialogueModel[] = [];



// [{
//     isPublished: false,
//     id: "9972dde4-9d5d-11ee-8c90-0242ac120002",
//     levelId: process.env.REACT_APP_LOCATION_BUS_STATION,
//     name: "Street: Bus Station",
//     phrase: {
//         parentId: null,
//         id: "a22bb65e-9d5d-11ee-8c90-0242ac120002",
//         text: '',
//         comments: '',
//         tensesList: [],
//         answers: [{
//             tensesList: [],
//             text: 'Hello',
//             wordsToUse: '',
//             mistakeExplanations: [],
//             translates: [],
//             phrases: [],
//             parentId: 'a22bb65e-9d5d-11ee-8c90-0242ac120002',
//             id: "cddb6abd-652b-45b3-9405-45ebea2f8819",
//         }],
//     }
// }]