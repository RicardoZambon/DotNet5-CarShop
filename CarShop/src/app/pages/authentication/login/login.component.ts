import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import Popover from 'bootstrap/js/dist/popover';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    @ViewChildren('popover') popovers!: QueryList<ElementRef>;

    loginForm!: FormGroup;
    loading: boolean = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngAfterViewInit(): void {
        this.popovers.map((x: ElementRef) => {
            return new Popover(x.nativeElement, { content: '' })
        });
    }


    hasFormErrors():boolean {
        return this.loginForm.hasError('invalid');
    }

    submit() {
        if (this.loginForm.valid) {
            this.loginForm.disable();

            const myArray = [1];
            from(myArray).pipe(
                concatMap(item => of(item).pipe(delay(5000)))
            ).subscribe (timedItem => {
                this.loginForm.enable();
                this.loginForm.setErrors({'invalid': true});
            });

        } else {
            Object.keys(this.loginForm.controls).forEach(field => {
                const control = this.loginForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }
}