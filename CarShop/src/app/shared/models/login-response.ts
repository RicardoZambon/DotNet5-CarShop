import { UserInfoResponse } from './user-info-response';
export class LoginResponse extends UserInfoResponse {
    public username!: string;
    public token!: string;
    public refreshToken!: string;
    public refreshTokenExpiration!: string;
}