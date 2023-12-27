export default interface ISignUpModel {

    readonly id: string,
    readonly name: string,
    readonly lastName: string,
    readonly password: string,
    readonly email: string,
    readonly teacherId?: string,
}