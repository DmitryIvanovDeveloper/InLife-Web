import { IConstructorActionsState, useConstructorActionsState } from "./useConstructorActionsState";

export default function useConstructorActions() {

    const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState()

    return {
        setIsSavePhrase: (isSave: boolean) => {
            const updatedState: IConstructorActionsState = JSON.parse(JSON.stringify(constructorActionsState));

            updatedState.phrase.isSave = isSave;

            setConstructorActionsState(updatedState);
        },

        setIsSaveAnswer: (isSave: boolean) => {
            const updatedState: IConstructorActionsState = JSON.parse(JSON.stringify(constructorActionsState));

            updatedState.answer.isSave = isSave;
            setConstructorActionsState(updatedState);
        },
    }
}