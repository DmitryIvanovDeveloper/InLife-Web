import { atom, useRecoilState } from "recoil";

export function useConstructorActionsState() {
    return useRecoilState(constructorActionsStateAtom);
}

const constructorActionsState: IConstructorActionsState ={
    phrase: {
        isSave: false
    },
    answer: {
        isSave: false
    }
}
const constructorActionsStateAtom = atom<IConstructorActionsState>({
    key: 'constructorActionsStateAtom',
    default: constructorActionsState
})

export interface IConstructorActionsState {
    phrase: { 
        isSave: boolean
    }
    answer: {
        isSave: boolean
    }
}