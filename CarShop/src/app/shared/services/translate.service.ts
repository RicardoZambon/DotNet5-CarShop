import { Injectable } from '@angular/core';

import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

    private activeLanguage: Language;

    private availableLanguages: Array<Language>;

    
    constructor() {
        this.availableLanguages = this.updateLanguages();

        this.activeLanguage = this.availableLanguages[1];
    }

    private updateLanguages(): Array<Language> {
        return [
            new Language({ code: 'en-uS', flag_style: 'united-states', name: 'English'}),
            new Language({ code: 'de-DE', flag_style: 'germany', name: 'German'}),
            new Language({ code: 'it-IT', flag_style: 'italy', name: 'Italian'}),
            new Language({ code: 'pt-BR', flag_style: 'brazil', name: 'Portuguese'}),
            new Language({ code: 'es-ES', flag_style: 'spain', name: 'Spanish'})
        ]
    }

    getActiveLanguage(): Language {
        return this.activeLanguage;
    }

    getLanguages(): Array<Language> {
        return this.availableLanguages;
    }

    isActive(code: string): boolean {
        return this.activeLanguage?.code == code;
    }

    setLanguage(code: string): void {
        if (this.availableLanguages.length > 0) {
            const newLanguage = this.availableLanguages.filter(x => x.code == code);

            if (newLanguage.length > 0) {
                this.activeLanguage = newLanguage[0];
            } else {
                this.activeLanguage = this.availableLanguages[0];
            }
        }
    }
}