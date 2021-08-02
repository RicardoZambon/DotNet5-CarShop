import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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

    constructor(
        private http: HttpClient
    ) { }

    public async getRoles(startRow: number, endRow: number): Promise<string | RoleListModel[]> {        
        return this.http
            .get<RoleListModel[]>(`${this.baseUrl}/Roles`, {
                params: {
                    'startRow': startRow.toString(),
                    'endRow': endRow.toString()
                }
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            )
            .toPromise();
    }

    public async exportRoles(option: string): Promise<string | Blob> {
        return this.http
            .get(`${this.baseUrl}/Roles/Export/${option}`, { responseType: 'blob' })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            )
            .toPromise();
    }

    public async getRoleDisplayName(roleId: number): Promise<string> {
        return this.http
            .get(`${this.baseUrl}/Roles/Title/${roleId}`, { responseType: 'text' })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error);
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            )
            .toPromise();
    }


    public async deleteRoles(roleIds: number[]): Promise<string | boolean> {
        return this.http
            .request('DELETE', `${this.baseUrl}/Roles`, { body: roleIds })
            .pipe(
                map(() => true),
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            )
            .toPromise();
    }

    public async updateRole(roleId: number, roleModel: RoleEditModel): Promise<RoleEditResponse | string> {
        return this.http
            .post<RoleEditResponse>(`${this.baseUrl}/Roles/${roleId}`, roleModel)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error);
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            )
            .toPromise();
    }

    public async insertRole(roleModel: RoleEditModel): Promise<RoleEditResponse | string> {
        return this.http
            .put<RoleEditResponse>(`${this.baseUrl}/Roles`, roleModel)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error);
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            )
            .toPromise();
    }


    public async getRole(roleId: number): Promise<RoleEditModel | string> {
        return this.http
            .get<RoleEditModel>(`${this.baseUrl}/Roles/${roleId}`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error);
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            )
            .toPromise();
    }
}