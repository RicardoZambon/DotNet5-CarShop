import { Component, OnInit } from '@angular/core';

import { TranslateService } from './../../../shared/services/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  changeLanguage(code: string): void {
      this.translateService.setLanguage(code);
  }
}
