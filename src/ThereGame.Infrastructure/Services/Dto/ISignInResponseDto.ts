import { RoleType } from '../../../ThereGame.Business/Util/Role';

export default interface ISignInResponseDto {
    token: string;
    role: RoleType;
}