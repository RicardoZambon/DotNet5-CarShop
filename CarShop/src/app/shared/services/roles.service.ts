import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RoleListModel } from '../models/Security/RoleListModel';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    private baseUrl = `${environment.apiUrl}/Security`;

    constructor(
        private http: HttpClient
    ) { }

    public async getRoles(startRow: number, endRow: number): Promise<string | RoleListModel[]> {        
        return await this.http
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
}
