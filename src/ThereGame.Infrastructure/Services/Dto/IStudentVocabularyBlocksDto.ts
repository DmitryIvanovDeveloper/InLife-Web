import IWordDto, { IWordRequestDto } from "./IWordDto";

export default interface IStudentVocabularyRequestD {
    id: string;
    studentId: string,
    name: string;
    wordsId: string[];
    createdAt: Date;
}