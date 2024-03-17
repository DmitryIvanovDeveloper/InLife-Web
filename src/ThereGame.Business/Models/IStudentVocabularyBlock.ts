export default interface IStudentVocabularyBlockModel {
    id: string;
    studentId: string;
    name: string;
    createdAt: Date,
    wordsId: string[]
}