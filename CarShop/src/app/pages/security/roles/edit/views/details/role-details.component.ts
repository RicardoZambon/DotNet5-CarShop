import { Component, ContentChildren, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { DetailsDatasource } from 'src/app/shared/datasources/details-datasource';
import { EditInputComponent } from 'src/app/shared/components/edit/edit-input/edit-input.component';
import { MessageModel } from 'src/app/shared/models/message-model';
import { RoleEditModel } from 'src/app/shared/models/Security/role-edit-model';
import { RoleEditResponse } from 'src/app/shared/models/Security/role-edit-response';
import { RolesService } from 'src/app/shared/services/roles.service';
import { TabService } from 'src/app/shared/services/tab.service';
import { EditSectionComponent } from 'src/app/shared/components/edit/edit-section/edit-section.component';

@Component({
    selector: 'app-view-role-details',
    templateUrl: './role-details.component.html'
})
export class RoleViewDetailsComponent extends DetailsDatasource implements OnInit {
    
    private _newUrl = 'roles/new';
    private _editUrl = 'roles/{roleId}';
    get url() {
        return this.entityId ? this._editUrl.replace('{roleId}', this.entityId.toString()) : this._newUrl;
    }

    get title(): string {
        return this.model?.name ?? '';
    }
    model!: RoleEditModel;
    
    @ViewChild('form') formElement!: ElementRef<HTMLFormElement>;
    @ViewChildren(EditInputComponent) inputs!: QueryList<EditInputComponent>;
    @ViewChildren(EditSectionComponent) titles!: QueryList<EditSectionComponent>;

    @Output() refreshTab = new EventEmitter<{ entityId: string | null, url: string }>()


    constructor(
        private formBuilder: FormBuilder,
        private roleService: RolesService,
        protected alertService: AlertService,
        protected tabService: TabService,
        protected route: ActivatedRoute
    ) {
        super(alertService, tabService, route);
    }


    ngOnInit(): void {
        this.initDetails();
    }

    dataFormSetup(): FormGroup {
        return this.formBuilder.group({
            name: ['', Validators.required]
        });
    }


    getNewModel(model: RoleEditModel | RoleEditResponse): RoleEditModel {
        if (model instanceof RoleEditResponse) {
            return new RoleEditModel(model);
        }
        return model;
    }

    async getModel(entityId: number | null): Promise<any> {
        if (entityId) {
            return await this.roleService.getRole(entityId)
                .catch(ex => {
                    this.alertService.raiseError(new MessageModel('AlertFailure-Title', 'RolesEdit-Load-AlertFailure-Message', false), ex);
                    throw ex;
                });
        }

        return new RoleEditModel();
    }


    validate(): string[] {
        let errors = new Array<string>();

        if (this.dataForm.get('name')?.errors?.required) {
            errors.push('RolesEdit-Name-Required-Validation');
            this.inputs.filter(x => x.controlName === 'name')[0]?.focus();
        }

        return errors;
    }

    async save(): Promise<any> {
        const model = {
            name: this.dataForm.get('name')?.value.toString().trim(),
        };

        const role = this.entityId
            ? await this.roleService.updateRole(this.entityId, model)
            : await this.roleService.insertRole(model);
        
        return role;
    }
}