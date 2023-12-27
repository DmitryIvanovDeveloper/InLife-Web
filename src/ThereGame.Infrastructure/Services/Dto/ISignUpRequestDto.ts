export default interface ISignUpRequestDto {
    id: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    teacherId?: string;
}