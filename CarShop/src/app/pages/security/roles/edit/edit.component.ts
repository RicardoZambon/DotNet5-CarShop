import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { EditInputComponent } from 'src/app/shared/components/edit/edit-input/edit-input.component';
import { MessageModel } from 'src/app/shared/models/message-model';
import { RoleEditModel } from 'src/app/shared/models/Security/role-edit-model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { SaveButtonComponent } from 'src/app/shared/buttons/save-button/save-button.component';
import { TabService } from 'src/app/shared/services/tab.service';
import { RoleEditResponse } from 'src/app/shared/models/Security/role-edit-response';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class RolesEditComponent implements OnInit {

    private _newUrl = 'roles/new';
    private _editUrl = 'roles/{roleId}';
    private get url() {
        return this.roleId ? this._editUrl.replace('{roleId}', this.roleId.toString()) : this._newUrl;
    }

    @ViewChild('form') formElement!: ElementRef<HTMLFormElement>;
    @ViewChildren(EditInputComponent) inputs!: QueryList<EditInputComponent>;

    roleId: number | null = null;
    title: string = '';

    roleForm!: FormGroup;

    /* Save */
    @ViewChild('saveButton') saveButton!: SaveButtonComponent;
    validateClick = () => this.validate();
    saveClick = async () => this.save();
    saveAlertMessageModel = new MessageModel('RolesEdit-Save-Alert-Title', 'RolesEdit-Save-Alert-Message', false, false);
    get saveAlertValidationMessage() { return 'RolesEdit-Save-AlertValidation-Message' + (!this.roleId ? '-New' : '') };
    get saveAlertFailureMessage() { return 'RolesEdit-Save-AlertFailure-Message' + (!this.roleId ? '-New' : '') };
    

    constructor(
        private formBuilder: FormBuilder,
        private roleService: RolesService,
        private alertService: AlertService,
        private tabService: TabService,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit(): Promise<void> {
        this.roleForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
        this.roleForm.disable();

        this.roleForm.valueChanges.subscribe(value => {
            if (this.roleForm.dirty) {
                this.tabService.setChangedValues(this.url);
            }
        });
        
        await this.refresh();
    }


    async refresh(model: RoleEditModel | RoleEditResponse | null = null) : Promise<void> {
        if ((model as RoleEditResponse)?.id) {
            if (!this.roleId) {
                this.roleId = (<RoleEditResponse>model).id;
                this.tabService.redirectCurrentTab(this.url);
            }

            model = new RoleEditModel(model as RoleEditResponse);
        }
        else if (!this.roleId) {
            const id = this.route.snapshot.paramMap.get('id');
            if (id) {
                this.roleId = parseInt(id.toString());
            }
        }
        else if (this.roleId && model === null) {
            this.roleId = null;
            this.tabService.redirectCurrentTab(this.url);
        }

        await this.refreshModel(model);
    }
    async refreshModel(model: RoleEditModel | null = null): Promise<void> {
        this.roleForm.disable();

        if (this.roleId) {
            if (model === null) {
                const role = await this.roleService.getRole(this.roleId)
                    .catch(ex => {
                        this.alertService.raiseError(new MessageModel('AlertFailure-Title', 'RolesEdit-Load-AlertFailure-Message', false), ex);

                        const tab = this.tabService.getTab(this.url);
                        if (tab) {
                            this.tabService.closeTab(tab);
                        }
                        return undefined;
                    });

                if (!role) {
                    return;
                }

                model = role;
            }
        }
        else {
            model = new RoleEditModel();
        }

        this.roleForm.setValue(model);
        this.roleForm.enable();

        this.tabService.clearChangedValues(this.url);
        this.roleForm.markAsUntouched();
        this.roleForm.markAsPristine();

        if (this.formElement) {    
            (this.formElement.nativeElement.querySelector('input[autofocus]') as HTMLElement)?.focus();
        }

        await this.refreshTitle();
    }
    async refreshTitle(): Promise<void> {
        if (this.roleId) {
            
            const title = await this.roleService.getRoleDisplayName(this.roleId)
                .catch(ex => {
                    this.alertService.raiseError(new MessageModel('AlertFailure-Title', 'RolesEdit-Title-AlertFailure-Message', false), ex);
                    return undefined;
                });
            
            if (!title) {
                return;
            }

            this.title = title;
        }
        else {
            this.title = 'RolesEdit-Title-New';
        }
        this.tabService.openTab(this.title, this.url);
    }


    validate(): string[] {
        let errors = new Array<string>();

        if (this.roleForm.get('name')?.errors?.required) {
            errors.push('RolesEdit-Name-Required-Validation');
            this.inputs.filter(x => x.controlName === 'name')[0]?.focus();
        }

        return errors;
    }

    async save(): Promise<any> {
        const model = {
            name: this.roleForm.get('name')?.value.toString().trim(),
        };

        this.saveButton.title = model.name;
        
        const role = this.roleId
            ? await this.roleService.updateRole(this.roleId, model)
            : await this.roleService.insertRole(model);
        
        return role;
    }
}