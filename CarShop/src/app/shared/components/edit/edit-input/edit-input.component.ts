import { Component, HostBinding, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss'],
  host: { class: 'col' }
})
export class EditInputComponent implements OnInit {

    @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

    @Input() formGroup!: FormGroup;
    @Input() controlName!: string;
    
    @Input() placeholder: string = '';

    @HostBinding('attr.type') @Input() type: string = "text";
    @HostBinding('attr.autofocus') @Input() autofocus: boolean = false;


    constructor() { }

    ngOnInit(): void {
    }


    focus(): void {
        this.inputElement.nativeElement.focus();
    }

    hasValue(): boolean {
        return this.formGroup.controls[this.controlName].value !== '';
    }

    isValid(): boolean {
        return this.formGroup.controls[this.controlName].invalid && (this.formGroup.controls[this.controlName].dirty || this.formGroup.controls[this.controlName].touched);
    }
}