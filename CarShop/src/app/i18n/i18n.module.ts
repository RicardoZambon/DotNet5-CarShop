import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'ngx-translate-cache';

@NgModule({
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateLoaderFactory,
                deps: [HttpClient]
            }
        }),
        TranslateCacheModule.forRoot({
            cacheService: {
              provide: TranslateCacheService,
              useFactory: translateCacheFactory,
              deps: [TranslateService, TranslateCacheSettings]
            },
            cacheMechanism: 'Cookie'
        })
    ],
    exports: [TranslateModule]
})
export class I18nModule {
    constructor(translate: TranslateService, translateCacheService: TranslateCacheService) {
        translateCacheService.init();
        
        translate.addLangs(['en', 'pt']);
        translate.setDefaultLang('en');

        const browserLang = translateCacheService.getCachedLanguage() || translate.getBrowserLang();
        translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');
    }
}

export function translateLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

export function translateCacheFactory(translateService: TranslateService, translateCacheSettings: TranslateCacheSettings) {
    return new TranslateCacheService(translateService, translateCacheSettings);
}