export default function BuildPrompt(sentence: string): string {
    return `
        Sentence: ${sentence}
        1) Give all variations of the Sentence (excluding parentheses, quotation marks, and brackets):
        2) Give all variations's translations in Russian
        3) Give all words of 'variations' from 1) with capitalize Only, comma-separate.
        4) Give variations's tenseses full names, the tenses only, capitalized, exclude duplicate tenses, no any abbreviations.
       
        Use for response the strucuture json {
            variations: string[],
            translations: string[],
            words_uppercase: string,
            tenseses: string[]
        }
    `
}