import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @HostBinding('attr.loading') loadingAttr!: string | null;
    @ViewChild('button') buttonElement!: ElementRef<HTMLButtonElement>;

    @Input() name!: string;
    @Input() color?: string;
    @Input() icon!: string;
    @Input() label!: string;
    @Input() dropdownLabel!: string;
    @Input() modalId?: string;
    @Input() priority = 0;
    @Input() disabled = false;
    @Input() setLoadingOnClick = false;

    protected loading = false;
    protected success = false;
    protected error = false;

    @Output() onClick = new EventEmitter<ButtonComponent>();
    @Output() onLoadingChange = new EventEmitter<ButtonComponent>();


    constructor() { }

    ngOnInit(): void {
    }


    public get isLoading(): boolean {
        return this.loading;
    }

    public get isSuccess(): boolean {
        return this.success;
    }

    public get isError(): boolean {
        return this.error;
    }

    public get modalReference(): string | null {
        if (this.modalId && this.modalId != '') {
            return '#' + this.modalId;
        }
        return null;
    }


    click(event: Event): void {
        if (this.setLoadingOnClick) {
            this.startLoading();
        }

        setTimeout(() => {
            this.buttonElement.nativeElement.blur();
        }, 200);
        
        this.onClick.emit(this);
    }

    startLoading() {
        this.loading = true;
        this.disabled = true;
        this.loadingAttr = '';
        this.onLoadingChange.emit(this);
    }

    cancelLoading(withError = false) {
        this.loading = false;
        this.disabled = false;
        this.loadingAttr = null;
        this.onLoadingChange.emit(this);

        if (withError) {
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 1000);
        }
    }

    completeLoading(disableButton = false): void {
        if (this.buttonElement) {
            this.buttonElement.nativeElement.blur();
        }
        
        if (this.loading) {
            this.loading = false;
            this.loadingAttr = null;
        }
        
        this.success = true;
        this.onLoadingChange.emit(this);

        setTimeout(() => {
            if (!disableButton) {
                this.disabled = false;
            }
            this.success = false;
        }, 1000);
    }
}