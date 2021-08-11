import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { QueryParametersModel } from './../models/query-parameters-model';
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


    async getRoles(startRow: number, endRow: number, queryParameters: QueryParametersModel): Promise<RoleListModel[]> {
        return await lastValueFrom(this.http
            .post<RoleListModel[]>(`${this.baseUrl}/Roles`, queryParameters, {
                params: { 
                    'startRow': startRow.toString(),
                    'endRow': endRow.toString()
                }
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            ));
    }

    async exportRoles(option: string, queryParameters: QueryParametersModel): Promise<Blob> {
        return await lastValueFrom(this.http
            .post(`${this.baseUrl}/Roles/Export/${option}`, queryParameters, { responseType: 'blob' })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            ));
    }

    async getRoleDisplayName(roleId: number): Promise<string> {
        return await lastValueFrom(this.http
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
            ));
    }


    async deleteRoles(roleIds: number[]): Promise<boolean> {
        return await lastValueFrom(this.http
            .request('DELETE', `${this.baseUrl}/Roles`, { body: roleIds })
            .pipe(
                map(() => true),
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            ));
    }

    async updateRole(roleId: number, roleModel: RoleEditModel): Promise<RoleEditResponse> {
        return await lastValueFrom(this.http
            .post<RoleEditResponse>(`${this.baseUrl}/Roles/${roleId}`, roleModel)
            .pipe(
                map(role => {
                    this.onRolesUpdated.emit();
                    return role;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            ));
    }

    async insertRole(roleModel: RoleEditModel): Promise<RoleEditResponse> {
        return await lastValueFrom(this.http
            .put<RoleEditResponse>(`${this.baseUrl}/Roles`, roleModel)
            .pipe(
                map(role => {
                    this.onRolesUpdated.emit();
                    return role;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            ));
    }


    async getRole(roleId: number): Promise<RoleEditModel> {
        return await lastValueFrom(this.http
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
            ));
    }
}