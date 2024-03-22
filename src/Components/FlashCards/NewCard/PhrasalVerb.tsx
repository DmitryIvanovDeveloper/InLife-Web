import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useWordsState } from "../../../Data/useWords";

export interface IPhrasalVerb {
    wordsId: string[]
}

export interface IPhrasalVerbProps {
    word: string;
    onWordChange: (word: string) => void;
    setPhrasalVerbsForms: (wordsId: IPhrasalVerb) => void;
}
export default function PhrazalVerb(props: IPhrasalVerbProps) {
    const [wordsData] = useWordsState();

    const [phrasalVerbs, setPhrasalVerbs] = useState<IPhrasalVerb>({wordsId: []});
    const [unexpectedWords, setUnexpectedWord] = useState<string[]>([]);

    useEffect(() => {
        var splittedText = props.word.split(" ").filter(e => e);

        var wordsId = splittedText.map(wordText => {
            var expectedWord = wordsData.find(wd => wd.word.includes(wordText));
            if (!expectedWord) {
                setUnexpectedWord([...unexpectedWords, wordText])
                return ""
            }

            setUnexpectedWord([]);
            return expectedWord?.id;;
        })

        if (!!unexpectedWords.length) {
            return;
        }

        props.setPhrasalVerbsForms({wordsId: wordsId});
    }, [props.word]);

    return (
        <Grid container>

            <Grid item>
                <TextField
                    value={props.word}
                    error={!unexpectedWords}
                    helperText={!!unexpectedWords.length ? `The word '${unexpectedWords.join(',')}' a doesn't exist in the dictionary! Please add` : ""}
                    onChange={(event) => props.onWordChange(event.target.value)}
                    sx={{ m: 1, }}
                    label=''>
                </TextField>
            </Grid>
        </Grid>
    )
}