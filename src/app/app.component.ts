import { Component, OnInit } from '@angular/core';
import { HardcodeAuthenticationService } from './service/hardcode-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService) { }
  ngOnInit(): void {
  }
}
