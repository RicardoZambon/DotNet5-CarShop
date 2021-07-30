import { ValidationErrors } from '@angular/forms';

export class MessageModel {
    private _title!: string;
    private _message!: string;
    selectionCount: number = 0;
    selectionName: string = '';
    validations = new Array<string>();

    private titleHasPlural = true;
    private messageHasPlural = true;

    public get title(): string {
        return this._title + (this.titleHasPlural && this.selectionCount > 1 ? '-Plural' : '');
    }
    public set title(value: string) {
        this._title = value;
    }

    public get message(): string {
        return this._message + (this.messageHasPlural && this.selectionCount > 1 ? '-Plural' : '');
    }
    public set message(value: string) {
        this._message = value;
    }

    constructor(title: string, message: string, titleHasPlural: boolean = true, messageHasPlural: boolean = true) {
        this._title = title;
        this._message = message;
        this.titleHasPlural = titleHasPlural;
        this.messageHasPlural = messageHasPlural;
    }

    static fromMessageModel(messageModel: MessageModel) {
        let newModel = new MessageModel(
            messageModel._title,
            messageModel._message,
            messageModel.titleHasPlural,
            messageModel.messageHasPlural);
        
        newModel.selectionCount = messageModel.selectionCount;
        newModel.selectionName = messageModel.selectionName;
        newModel.validations = messageModel.validations;
        
        return newModel;
    }
}