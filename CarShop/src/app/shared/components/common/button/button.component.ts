import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @HostBinding('attr.loading') loadingAttr!: string | null;
    @ViewChild('button') buttonElement!: ElementRef<HTMLDivElement>;

    @Input() name!: string;
    @Input() color?: string;
    @Input() icon!: string;
    @Input() label!: string;
    @Input() dropdownLabel!: string;
    @Input() modalId?: string;
    @Input() priority = 0;
    @Input() disabled = false;
    @Input() setLoadingOnClick = false;

    protected _disabled = false;
    protected loading = false;
    protected success = false;
    protected warning = false;
    protected error = false;

    @Output() onClick = new EventEmitter<ButtonComponent>();
    @Output() onLoadingChange = new EventEmitter<ButtonComponent>();


    constructor() { }

    ngOnInit(): void {
    }


    public get isDisabled(): boolean {
        return this._disabled || this.disabled;
    }

    public get isLoading(): boolean {
        return this.loading;
    }
    
    public get isSuccess(): boolean {
        return this.success;
    }

    public get modalReference(): string | null {
        if (this.modalId && this.modalId != '') {
            return '#' + this.modalId;
        }
        return null;
    }


    public get displayIcon(): string {
        if (this.loading) {
            return 'fa-spinner fa-spin';
        }
        else if (this.success) {
            return 'fa-check';
        }
        else if (this.error) {
            return 'fa-times';
        }
        else if (this.warning) {
            return 'fa-exclamation';
        }
        return this.icon;
    }

    public get buttonClass(): string {
        if (this.success) {
            return 'btn-success';
        }
        else if (this.error) {
            return 'btn-danger';
        }
        else if (this.warning) {
            return 'btn-warning';
        }
        return '';
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
        this._disabled = true;
        this.loadingAttr = '';
        this.onLoadingChange.emit(this);
    }

    
    cancelLoading() {
        this.loading = false;
        this._disabled = false;
        this.loadingAttr = null;
        this.onLoadingChange.emit(this);
    }

    cancelLoadingWithWarning() {
        this.cancelLoading();

        this.warning = true;
        setTimeout(() => {
            this.warning = false;
        }, 1000);
    }

    cancelLoadingWithError() {
        this.cancelLoading();

        this.error = true;
        setTimeout(() => {
            this.error = false;
        }, 1000);
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
                this._disabled = false;
            }
            this.success = false;
        }, 1000);
    }
}