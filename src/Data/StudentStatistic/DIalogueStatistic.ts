import IStudentDialogueStatisticModel from "../../ThereGame.Business/Models/IStudentDialogueStatisticModel";

export const DialogueStatistic: IStudentDialogueStatisticModel[] = [{
        studentId: "e7dc7264-500c-41b8-afd3-0cb081963dc9",
        dialogueId: "3ad8c2c9-dd22-4dc2-849c-a18de202e995",
        startDate: new Date(),
        dialogueHistory: [{
            phraseId: "",
            phrase: "Hah",
            answers: [
                "What are you doing here?",
                "What the fuck"
            ]
        }],
        endDate: new Date(),
    },
    {
        studentId: "e7dc7264-500c-41b8-afd3-0cb081963dc9",
        dialogueId: "9499764f-c0da-45e9-8a38-eadc226617e2",
        startDate: new Date('2024-02-10'),
        dialogueHistory:  [{
            phraseId: "",
            phrase: "Go away",
            answers: [
                "Why?",
            ]
        }],
        endDate: new Date(),
    }
]