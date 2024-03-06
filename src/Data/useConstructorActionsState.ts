import { atom, useRecoilState } from "recoil";

export function useConstructorActionsState() {
    return useRecoilState(constructorActionsStateAtom);
}

const constructorActionsState: IConstructorActionsState ={
    phrase: {
        isSave: false,
        isReset: false
    },
    answer: {
        isSave: false,
        isReset: false
    },
    selectedNpc: {
        id: "",
        scenarioId: "",
        specificPhraseId: ""
    },
    isScenarioUpdated: false,
    selectedStudentId: ""
}
const constructorActionsStateAtom = atom<IConstructorActionsState>({
    key: 'constructorActionsStateAtom',
    default: constructorActionsState
})

export interface IConstructorActionsState {
    phrase: { 
        isSave: boolean
        isReset: boolean
    }
    answer: {
        isSave: boolean
        isReset: boolean
    },
    selectedNpc: {
        id: string;
        scenarioId: string;
        specificPhraseId: string
    },
    isScenarioUpdated: boolean,
    selectedStudentId: string
}