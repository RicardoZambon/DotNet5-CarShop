import { RoleEditResponse } from './role-edit-response';
export class RoleEditModel {
    name: string = '';

    constructor(response: RoleEditResponse | null = null) {
        if (response) {
            this.name = response.name;
        }
    }
}