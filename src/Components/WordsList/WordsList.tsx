import { Box, List, CardActionArea, Card, useThemeProps, Button, Grid, Typography, IconButton, TextField } from "@mui/material";
import { useWordsState } from "../../Data/useWords";
import { useEffect, useState } from "react";
import IWordModel from "../../ThereGame.Business/Models/IWordModel";
import useWordsQueriesApi from "../../ThereGame.Api/Queries/WordsQueriesApi";
import LinarProgressCustom from "../CircularProgress";

export interface IWordsList {
    onSelectWord: (id: string) => void;
    onAddWord: (id: string) => void;
    onCreateNewWord: () => void;

}
export default function WordsList(props: IWordsList) {
    const [wordsState] = useWordsState();
    const [searchWord, setSearchWord] = useState<string>("");
    const [matchedWordData, setMatchedWordData] = useState<IWordModel[]>([]);

    const wordQueriesApi = useWordsQueriesApi();

    useEffect(() => {
        wordQueriesApi.get()
    }, []);


    useEffect(() => {
        const matchedWordData = wordsState.filter(value => value.word.toLowerCase().includes(searchWord.toLowerCase()))
        if (!matchedWordData.length) {
            localStorage.setItem("new word", searchWord);
        }
        setMatchedWordData(matchedWordData);
    }, [searchWord]);

    useEffect(() => {
        setMatchedWordData(wordsState);
    }, [wordsState]);


    if (!wordsState.length) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LinarProgressCustom name={'Laoding words! Please wait'} />
            </Box>
        )
    }

    return (
        <Box sx={{
            mt: "10px",
            height: '10vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            m: 2,
            alignItems: 'center'
        }}>
            <TextField
                label='search'
                onChange={(event) => setSearchWord(event.target.value)}
            />
            {!matchedWordData.length
                ? <Button onClick={props.onCreateNewWord}>Create new word</Button>
                : null
            }
            <List
                sx={{ overflow: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', ml: 3, backgroundColor: '#80cbc4', boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;", borderRadius: '5px'  }}
            >
                {matchedWordData.map(card => (
                    <CardActionArea onClick={() => props.onAddWord(card.id)} sx={{ width: '100px', m: 1 }}>
                        <Card sx={{
                            p: 1,
                            height: "50px",
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: "center",
                            flexDirection: 'row',
                            minWidth: "80px",
                        }}>
                            <Typography
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                                align="center"
                                variant="h6"
                                color="#616161"
                                fontWeight={600}
                            >
                                {card.word}
                            </Typography>
                        </Card>
                    </CardActionArea>
                ))}

            </List>

        </Box>

    )
}