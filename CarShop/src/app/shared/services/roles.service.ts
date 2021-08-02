import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { RoleListModel } from '../models/Security/role-list-model';
import { RoleEditModel } from './../models/Security/role-edit-model';
import { RoleEditResponse } from '../models/Security/role-edit-response';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    private baseUrl = `${environment.apiUrl}/Security`;

    @Output() onRolesUpdated = new EventEmitter();


    constructor(
        private http: HttpClient
    ) { }

    public async getRoles(startRow: number, endRow: number): Promise<RoleListModel[]> {        
        return this.http
            .get<RoleListModel[]>(`${this.baseUrl}/Roles`, {
                params: {
                    'startRow': startRow.toString(),
                    'endRow': endRow.toString()
                }
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            )
            .toPromise();
    }

    public async exportRoles(option: string): Promise<Blob> {
        return this.http
            .get(`${this.baseUrl}/Roles/Export/${option}`, { responseType: 'blob' })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            )
            .toPromise();
    }

    public async getRoleDisplayName(roleId: number): Promise<string> {
        return this.http
            .get(`${this.baseUrl}/Roles/Title/${roleId}`, { responseType: 'text' })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    switch(error.status) {
                        case 404:
                            throw 'Error-NotFound';
                        default:
                            throw error.error as string;
                    }
                })
            )
            .toPromise();
    }


    public async deleteRoles(roleIds: number[]): Promise<boolean> {
        return this.http
            .request('DELETE', `${this.baseUrl}/Roles`, { body: roleIds })
            .pipe(
                map(() => true),
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            )
            .toPromise();
    }

    public async updateRole(roleId: number, roleModel: RoleEditModel): Promise<RoleEditResponse> {
        return this.http
            .post<RoleEditResponse>(`${this.baseUrl}/Roles/${roleId}`, roleModel)
            .pipe(
                map(role => {
                    this.onRolesUpdated.emit();
                    return role;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            )
            .toPromise();
    }

    public async insertRole(roleModel: RoleEditModel): Promise<RoleEditResponse> {
        return this.http
            .put<RoleEditResponse>(`${this.baseUrl}/Roles`, roleModel)
            .pipe(
                map(role => {
                    this.onRolesUpdated.emit();
                    return role;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            )
            .toPromise();
    }


    public async getRole(roleId: number): Promise<RoleEditModel> {
        return this.http
            .get<RoleEditModel>(`${this.baseUrl}/Roles/${roleId}`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    switch(error.status) {
                        case 404:
                            throw 'Error-NotFound';
                        default:
                            throw error.error as string;
                    }
                })
            )
            .toPromise();
    }
}