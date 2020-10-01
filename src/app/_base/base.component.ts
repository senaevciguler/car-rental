import {AfterViewInit, Directive, OnDestroy, OnInit} from '@angular/core';
import {Utility} from './utility';
import {Decorator} from '@angular/compiler-cli/src/ngtsc/reflection';

@Directive({
  selector: '[appBaseComponentDirective]',
})
export abstract class BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading = false;
  public title = 'honeymoney';
  public breakpoint = 2;
  public isMobile = false;

  public errors: string;
  public isComponentReady = false;

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }

  ngOnDestroy() {
    Utility.debug('Destroying');
  }

  ngAfterViewInit() {
    Utility.debug('After init');
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }
/*
  get IS_ADMIN(): boolean {
    return UserService.IS_ADMIN();
  }

  get IS_HOTEL(): boolean {
    return UserService.IS_HOTEL();
  }

  get LOGGED_USER(): User {
    const user = UserService.getLoggedUser();
    return user;
  }

  get LANG(): string {
    return 'tr';
  }*/

}
