import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { EditInputComponent } from 'src/app/shared/components/edit/edit-input/edit-input.component';
import { MessageModel } from 'src/app/shared/models/message-model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { SaveButtonComponent } from 'src/app/shared/buttons/save-button/save-button.component';
import { TabService } from 'src/app/shared/services/tab.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class RolesEditComponent implements OnInit {

    @ViewChild('form') formElement!: ElementRef<HTMLFormElement>;
    @ViewChildren(EditInputComponent) inputs!: QueryList<EditInputComponent>;

    roleId: string | null = null;
    title: string = '';

    roleForm!: FormGroup;

    /* Save */
    @ViewChild('saveButton') saveButton!: SaveButtonComponent;
    validateClick = () => this.validate();
    saveClick = async () => this.save();
    saveAlertMessageModel = new MessageModel('RolesEdit-Save-Alert-Title', 'RolesEdit-Save-Alert-Message', false, false);
    saveAlertValidationMessage = 'RolesEdit-Save-AlertValidation-Message';
    saveAlertFailureMessage = 'RolesEdit-Save-AlertFailure-Message';


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

        this.roleId = this.route.snapshot.paramMap.get('id');
        if (this.roleId) {
            const title = await this.roleService.getRoleDisplayName(parseInt(this.roleId));
            if (!title.startsWith('InternalServerError:')) {
                this.title = title;
                this.tabService.openCurrentUrl(title);
            }
            else {
                this.tabService.openCurrentUrl(`Role ID: ${this.roleId}`);
            }

            const role = await this.roleService.getRole(parseInt(this.roleId));
            if (typeof role === 'string') {
                let errorMessageModel = new MessageModel('AlertFailure-Title', 'RolesEdit-Save-AlertFailure-Message', false);
                errorMessageModel.selectionName = this.title;
                this.alertService.raiseError(errorMessageModel);
            }
            else {
                this.roleForm.setValue(role);
            }
        }
        else {
            this.saveAlertValidationMessage += '-New';
            this.saveAlertFailureMessage += '-New';

            this.title = 'RolesEdit-New-Title';
            this.tabService.openCurrentUrl('RolesEdit-New-Title');
        }
    }

    validate(): string[] {
        let errors = new Array<string>();

        if (this.roleForm.get('name')?.errors?.required) {
            errors.push('RolesEdit-Name-Required-Validation');
            this.inputs.filter(x => x.controlName === 'name')[0]?.focus();
        }

        return errors;
    }

    async save(): Promise<string> {
        if (this.roleId) {
            return await this.roleService.saveRole(parseInt(this.roleId), {
                name: this.roleForm.get('name')?.value.toString(),
            });
        }
        return 'missing roleId';
    }
}