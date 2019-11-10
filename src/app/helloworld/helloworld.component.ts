import { Component, OnInit } from '@angular/core';
import { runtimeEnvironment } from "@env/runtimeEnvironment";

@Component({
  selector: 'app-helloworld',
  templateUrl: './helloworld.component.html',
  styleUrls: ['./helloworld.component.scss']
})
export class HelloworldComponent implements OnInit {

  url = "";
  user = "";
  apiKey = "";

  constructor() { }

  ngOnInit() {
    this.url = runtimeEnvironment.backendUrl;
    this.user = runtimeEnvironment.user;
    this.apiKey = runtimeEnvironment.key;
  }

}
