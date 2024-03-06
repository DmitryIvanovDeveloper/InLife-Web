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
        setIsReset: (isReset: boolean) => {
            const updatedState: IConstructorActionsState = JSON.parse(JSON.stringify(constructorActionsState));
            updatedState.answer.isReset = isReset;
            updatedState.phrase.isReset = isReset;

            setConstructorActionsState(updatedState);
        },
        setSelectedNpc: (npcId: string) => {
            const updatedState: IConstructorActionsState = JSON.parse(JSON.stringify(constructorActionsState));
            updatedState.selectedNpc.id = npcId;
            updatedState.selectedNpc.scenarioId = "";
            updatedState.selectedNpc.specificPhraseId = "";


            setConstructorActionsState(updatedState);
        },
        setSelectedScenario: (scenarioId: string) => {
            const updatedState: IConstructorActionsState = JSON.parse(JSON.stringify(constructorActionsState));
            updatedState.selectedNpc.scenarioId = scenarioId;
            updatedState.selectedNpc.specificPhraseId = "";

            setConstructorActionsState(updatedState);
        },
        setSpecificPhrase: (specificPhraseId: string) => {
            const updatedState: IConstructorActionsState = JSON.parse(JSON.stringify(constructorActionsState));
            updatedState.selectedNpc.specificPhraseId = specificPhraseId;

            setConstructorActionsState(updatedState);
        },
        setIsScenarioUpdated: (isUpdated: boolean) => {
            setConstructorActionsState(prev => ({
                ...prev,
                isScenarioUpdated: isUpdated
            }));
        },
        setSelectedStudentId: (id: string) => {
            setConstructorActionsState(prev => ({
                ...prev,
                selectedStudentId: id
            }));
        },
    }
}