import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import DialogueConstructor from '../Constructors/DialogueConstructor/DialogueConstructor';
import { Locations } from '../Data/Locations';
import { useDialogueItemConstructor } from '../Data/useDialogues';
import { useSelection } from '../Data/useSelection';
import { useTeacher } from '../Data/useTeacher';
import useDialogueQueriesApi from '../ThereGame.Api/Queries/DialogueQueriesApi';
import { IDialogueModel } from '../ThereGame.Business/Models/IDialogueModel';
import AppBarCustom from '../Components/AppBarCustom';
import LinarProgressCustom from '../Components/CircularProgress';
import DialogueGraph from '../Components/GraphTree/DialogueGraph';
import LocationCarousel from '../Components/LocationCarousel';
import DialoguesTab from './DialogesTab';

export interface IDialoguesProps { }

export default function Dialogues(props: IDialoguesProps): JSX.Element | null {

    const dialogueQueriesApi = useDialogueQueriesApi();

    const [teacher] = useTeacher();

    const [npcId, setNpcId] = useState<string>(Locations[0].id ?? '');
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const [dialogues, setDialogues] = useState<IDialogueModel[]>(teacher?.dialogues ?? []);
    const [isNewDialogueCreating, setIsNewDialogueCreating] = useState<boolean>();
    const [dialogue, setDialogue] = useState<IDialogueModel | null>(null);
    const [isHideLocations, setIsHideLocations] = useState<boolean>(false);
    const [selection, setSelection] = useSelection();

    const onChangeLocation = (id: string) => {
        setNpcId(id);
        setDialogue(null);
        setDialogueItemConstructor(() => <div></div>);

    }
    const createNewDialogue = async () => {
        setIsNewDialogueCreating(true)
        await dialogueQueriesApi.create(npcId);
        setIsNewDialogueCreating(false)
    }

    const onClick = (clickedDialogue: IDialogueModel) => {
        if (dialogue?.id == clickedDialogue.id) {
            setSelection("");
            setDialogue(null);
            setIsHideLocations(false);
            setDialogueItemConstructor(() => <div></div>);

            return;
        }

        setSelection(dialogue?.id ?? "");
        setDialogue(clickedDialogue);
        setIsHideLocations(true);
        setDialogueItemConstructor(() => <DialogueConstructor id={clickedDialogue.id} setStates={() => { }} />);
    }

    

    useEffect(() => {
        if (!npcId) {
            return;
        }

        setDialogues(teacher?.dialogues.filter(d => d.levelId == npcId) ?? []);
    }, [npcId, teacher]);

    if (!npcId) {
        return null;
    }

    return (
        <Box component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 1000,
                overflow: "hidden",
                overflowY: "scroll",
            }}

            autoComplete="off" >
            
            <AppBarCustom
                name={Locations.find(l => l.id == npcId)?.name ?? ''}
            />
            {isHideLocations
                ? null
                : <LocationCarousel setLevel={onChangeLocation} id={npcId} />
            }
            
            <Box>
                {isNewDialogueCreating
                    ? <LinarProgressCustom name='Creating' />
                    : <Button
                        fullWidth
                        variant='contained'
                        onClick={createNewDialogue}>
                        Create New Dialogue
                    </Button>
                }
            </Box>

           <DialoguesTab 
                dialogues={dialogues} 
                onClick={onClick}
                dialogue={dialogue}
            />

            {!dialogue
                ? null
                : <DialogueGraph dialogueId={dialogue.id} />
            }
        </Box>
    );
}