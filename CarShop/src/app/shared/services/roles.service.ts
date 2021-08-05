import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, delay, map } from 'rxjs/operators';

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
    
    private queryParameters = new QueryParametersModel();
    private _filtersApplied = false;
    public get filtersApplied() { return this._filtersApplied; }

    @Output() onRolesUpdated = new EventEmitter();


    constructor(
        private http: HttpClient
    ) { }


    applyFilter(filters: { [id: string]: any }): void {
        this._filtersApplied = true;
        this.queryParameters.Filters = filters;
    }

    clearFilters(): void {
        this._filtersApplied = false;
        this.queryParameters.Filters = {};
    }


    async getRoles(startRow: number, endRow: number): Promise<RoleListModel[]> {
        
        return this.http
            .post<RoleListModel[]>(`${this.baseUrl}/Roles`, this.queryParameters, {
                params: { 
                    'startRow': startRow.toString(),
                    'endRow': endRow.toString()
                }
            })
            .pipe(
                delay(3000),
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            )
            .toPromise();
    }

    async exportRoles(option: string): Promise<Blob> {
        return this.http
            .post(`${this.baseUrl}/Roles/Export/${option}`, this.queryParameters, { responseType: 'blob' })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    throw error.error as string;
                })
            )
            .toPromise();
    }

    async getRoleDisplayName(roleId: number): Promise<string> {
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


    async deleteRoles(roleIds: number[]): Promise<boolean> {
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

    async updateRole(roleId: number, roleModel: RoleEditModel): Promise<RoleEditResponse> {
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

    async insertRole(roleModel: RoleEditModel): Promise<RoleEditResponse> {
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


    async getRole(roleId: number): Promise<RoleEditModel> {
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