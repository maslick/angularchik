import { Component, OnInit } from '@angular/core';
import { runtimeEnvironment } from '@env/runtimeEnvironment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  url = '';
  user = '';
  apiKey = '';

  constructor() { }

  ngOnInit() {
    this.url = runtimeEnvironment.backendUrl;
    this.user = runtimeEnvironment.user;
    this.apiKey = runtimeEnvironment.key;
  }

}
