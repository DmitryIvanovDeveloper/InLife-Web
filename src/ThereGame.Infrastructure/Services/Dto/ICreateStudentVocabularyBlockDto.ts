export default interface ICreateStudentVocabularyBlockDto {
    id: string;
    studentId: string,
    dialogueId: string;
    order: number,
    name: string;
    wordsId: string[]
}