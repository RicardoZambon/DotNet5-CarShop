import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login-input',
    templateUrl: './login-input.component.html',
    styleUrls: ['./login-input.component.scss']
})
export class LoginInputComponent implements OnInit {

    @Input() formGroup!: FormGroup;

    @Input() controlName!: string;

    @Input() type: string = "text";

    @Input() icon!: string;

    @Input() placeholder!: string;

    @Input() isInvalid!: boolean;


    constructor() { }

    ngOnInit(): void {
    }
}