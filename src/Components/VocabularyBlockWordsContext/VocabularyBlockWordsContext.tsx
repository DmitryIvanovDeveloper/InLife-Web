import { useState, useEffect, useRef } from "react";
import { useWordsState } from "../../Data/useWords";
import IWordModel from "../../ThereGame.Business/Models/IWordModel";
import ContextMenu from "../ContextMenu/ContextMenu";
import CreateNewCardModal from "../FlashCards/NewCard/CreateNewCardModal";
import { useDialogue } from "../../Data/useDialogues";
import useDialogueQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import { useVocabularyBlockState } from "../../Data/useVocabularyBlocks";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import useVocabularyBlockQueriesApi from "../../ThereGame.Api/Queries/VocabularyBlockQueriesApi";
import { Box } from "@mui/material";

export interface IVocabularyBlockWordsContext {
    dialogueId: string;
}
export default function VocabularyBlockWordsContext(props: IVocabularyBlockWordsContext) {
    const [wordsState] = useWordsState();

    const [selectedWord, setSelectedWord] = useState<IWordModel | undefined>(undefined);
    const [unexpectedWord, setUnexpectedWord] = useState<string>("");
    const [isShowCreateNewWord, setIsShowCreateNewWord] = useState<boolean>(false);
    const [isSelectedWordExistInVocabularyWords, setIsSelectedWordExistInVocabularyWords] = useState<boolean>(false);
    const dialogueRecoil = useDialogue(props.dialogueId);
    const dialogueQueriesApi = useDialogueQueriesApi();
    const [vocabularyBlocks] = useVocabularyBlockState();
    const vocabularyBlockQueriesApi = useVocabularyBlockQueriesApi();
    const [vocabularyWordsId, setVocabularyWordsId] = useState<string[]>(dialogueRecoil.vocabularyWordsId);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    document.onmouseup = () => {

        const word = window.getSelection()?.toString().trim();
        if (!word || !/^[a-zA-Z]+$/.test(word)) {
            setUnexpectedWord("");
            setSelectedWord(undefined);
            return;
        }

        const expectedWordState = findWord(word);
        if (!!word && !expectedWordState) {
            setUnexpectedWord(word);
        }
        setSelectedWord(expectedWordState);
    };

    const findWord = (word: string): IWordModel | undefined => {
        return wordsState.find(wordState => wordState.word == word.toLowerCase().trim());
    }

    const onCloseModal = () => {
        setIsShowCreateNewWord(false);
        setUnexpectedWord("");
    }
    const onCreateNewWord = () => {
        localStorage.setItem("new word", unexpectedWord);
        setIsShowCreateNewWord(true);
    }

    const onAddVocabularyWord = () => {
        if (!selectedWord?.id || isLoading) {
            return;
        }

        if (isSelectedWordExistInVocabularyWords) {

            var filterdVocabularyWords = vocabularyWordsId.filter(id => id != selectedWord.id);
            studentVocabularyHandler(filterdVocabularyWords);
            return;
        }

        studentVocabularyHandler([...vocabularyWordsId, selectedWord.id]);
        setSelectedWord(undefined);
        setUnexpectedWord("");
    }

    const studentVocabularyHandler = async (newVocabularyWordsId: string[]) => {
        setIsLoading(true);

        dialogueRecoil.studentsId.forEach(id => {
            var expectedVocabularyBlock = vocabularyBlocks.find(vb => vb.dialogueId == dialogueRecoil.id && vb.studentId == id);
            if (!!expectedVocabularyBlock) {
                var updatedVocabularyBlock = JSON.parse(JSON.stringify(expectedVocabularyBlock));
                updatedVocabularyBlock.wordsId = newVocabularyWordsId;
                vocabularyBlockQueriesApi.update(updatedVocabularyBlock);
            }
            else  {
                vocabularyBlockQueriesApi.create(id, 0, dialogueRecoil.id, newVocabularyWordsId, dialogueRecoil.name);
            }
        })
        const updatedDialogue: IDialogueModel = JSON.parse(JSON.stringify(dialogueRecoil));

        updatedDialogue.vocabularyWordsId = [...new Set(newVocabularyWordsId)];

        await dialogueQueriesApi.update(updatedDialogue);

        setIsLoading(false);
    }

    useEffect(() => {
        if (!selectedWord) {
            return;
        }
        setIsSelectedWordExistInVocabularyWords(vocabularyWordsId.some(id => id == selectedWord.id));
    }, [selectedWord, vocabularyWordsId])


    useEffect(() => {
        if (!dialogueRecoil) {
            return;
        }
        setVocabularyWordsId(dialogueRecoil.vocabularyWordsId);
    }, [vocabularyWordsId])

    useEffect(() => {
        if (!vocabularyBlocks) {
            return;
        }

    }, [vocabularyWordsId])

    return (
        <Box>
            {!selectedWord && !unexpectedWord
                ? null
                : <ContextMenu
                    isSelectedWordExistInVocabularyWords={isSelectedWordExistInVocabularyWords}
                    isWordExist={!!selectedWord}
                    onAddWord={onAddVocabularyWord}
                    onCreateWord={onCreateNewWord}
                    selecetedWord={selectedWord?.word ?? ""}
                    isLoading={isLoading}
                />
            }


            {isShowCreateNewWord
                ? <CreateNewCardModal onClose={onCloseModal} />
                : null
            }
        </Box>
    )
}