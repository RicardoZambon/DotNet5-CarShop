import { Component, ContentChildren, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { DetailsView } from 'src/app/shared/views/details-view';
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
export class RoleViewDetailsComponent extends DetailsView implements OnInit {

    saveMessageModel = new MessageModel('RolesEdit-Save-Alert-Title', 'RolesEdit-Save-Alert-Message', false, false);
    get saveValidationMessage() { return 'RolesEdit-Save-AlertValidation-Message' + (!this.entityId ? '-New' : '') };
    get saveFailureMessage() { return 'RolesEdit-Save-AlertFailure-Message' + (!this.entityId ? '-New' : '') };

    
    model!: RoleEditModel;
    
    @ViewChild('form') formElement!: ElementRef<HTMLFormElement>;
    @ViewChildren(EditInputComponent) inputs!: QueryList<EditInputComponent>;
    @ViewChildren(EditSectionComponent) titles!: QueryList<EditSectionComponent>;

    @Output() refreshTab = new EventEmitter<{ entityId: string | null, url: string }>()


    constructor(
        private formBuilder: FormBuilder,
        private roleService: RolesService,
        alertService: AlertService,
        tabService: TabService,
        route: ActivatedRoute
    ) {
        super(alertService, tabService, route);
    }


    ngOnInit(): void {
        this.initTab();
    }


    async getTitle(): Promise<string> {
        return this.model?.name ?? '';
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

    async getModel(entityId?: number): Promise<any> {
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