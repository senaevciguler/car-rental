import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodeAuthenticationService {

  constructor() { }

  authentication(username, password){
    console.log('test login');

    if(username === 'sena' && password === 'dummy'){
      sessionStorage.setItem('authenticaterUser', username);
      return true;
    }
      return false;
    
  }
  
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }
  isUserLogout(){
    let user = sessionStorage.removeItem('authenticaterUser')
  }

}
