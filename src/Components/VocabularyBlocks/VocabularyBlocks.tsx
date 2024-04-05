import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IStudentVocabularyBlockModel from '../../ThereGame.Business/Models/IStudentVocabularyBlock';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useVocabularyBlockQueriesApi from '../../ThereGame.Api/Queries/VocabularyBlockQueriesApi';
import LinarProgressCustom from '../CircularProgress';
import VocabularyBlock from './VocabularyBlock';
import { useVocabularyBlockState as useVocabularyBlocksState } from '../../Data/useVocabularyBlocks';
import { useDialogues } from '../../Data/useDialogues';
import VocabularyBlockTab from './VocabularyBlockTab';

export interface IVocabularyBlockTabsProps {
    studentId: string;
    onEditCard: (id: string) => void;
    onCreateNewWord: () => void;
}


export default function VocabularyBlocks(props: IVocabularyBlockTabsProps) {

    const vocabularyBlockQueriesApi = useVocabularyBlockQueriesApi();
    const [dialoguesRecoil] = useDialogues();

    const [vocabularyBlocks] = useVocabularyBlocksState();

    const [selectedVcabularyBlockId, setSelectedVocabularyBlockId] = useState<string>("")
    const [selectedVcabularyBlock, setSelectedVocabularyBlock] = useState<IStudentVocabularyBlockModel | null>();


    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        localStorage.setItem("last vb", newValue);
        setSelectedVocabularyBlockId(newValue);
    };

    function BlockName(name: string, date: Date) {
        var updatedDate = new Date(date);

        return (
            <Box>
                <Typography>{name}</Typography>
                <Typography>{`${updatedDate.toISOString().substring(0, 10)}`}</Typography>
            </Box>
        )
    }

    // Quieries API
    const onCreateBlock = async () => {
        await vocabularyBlockQueriesApi.create(props.studentId, vocabularyBlocks.length);
    }

    // UseEffects


    useEffect(() => {
        vocabularyBlockQueriesApi.get(props.studentId)
            .then(data => {
                setIsLoading(false);
            });
    }, []);


    useEffect(() => {
        if (!vocabularyBlocks.length) {
            return;
        }
        const lastSelectedVocabularyBlockId = localStorage.getItem("last vb");
        if (!lastSelectedVocabularyBlockId) {

            setSelectedVocabularyBlockId(vocabularyBlocks[0].id);
            return;
        }

        setSelectedVocabularyBlockId(lastSelectedVocabularyBlockId);
    }, [vocabularyBlocks]);


    useEffect(() => {
        if (!selectedVcabularyBlockId) {

            return;
        }

        const selectedVocabularyBlock = vocabularyBlocks.find(vocabularyBlock => vocabularyBlock.id == selectedVcabularyBlockId);

        setSelectedVocabularyBlock(selectedVocabularyBlock);
    }, [selectedVcabularyBlockId, vocabularyBlocks]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LinarProgressCustom name={'Loading...'} />
            </Box>
        )
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

            <Button variant='contained' sx={{ backgroundColor: "#009688", m: 1 }} onClick={onCreateBlock}>
                <Typography color="white">Create new block</Typography>
            </Button>

            <Box sx={{ borderBottom: 0, borderColor: 'divider', display: 'flex', justifyContent: 'center', minWidth: "100%" }}>

                <Tabs
                    value={selectedVcabularyBlockId}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {vocabularyBlocks.map((vb, index) => (
                        <VocabularyBlockTab
                            dialogueId={vb.dialogueId}
                            value={vb.id}
                            name={vb.name}
                            createdAt={vb.createdAt}
                        />

                    ))}
                </Tabs>
            </Box>

            {!selectedVcabularyBlock
                ? null
                : <VocabularyBlock
                    studentId={props.studentId}
                    onEditCard={props.onEditCard}
                    onCreateNewWord={props.onCreateNewWord}
                    selectedVcabularyBlock={selectedVcabularyBlock}
                />
            }

        </Box>
    );
}