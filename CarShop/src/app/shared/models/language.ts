export class Language {

    code: string = '';

    flag_style: string = '';

    name: string = '';

    public constructor(init?:Partial<Language>) {
        Object.assign(this, init);
    }
}