
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../model/login.model'
import { environment } from 'src/environments/environment';


@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  public validateLogin(login: Login) {
    console.log(login);
    return this.httpClient.post<Login>(`${environment.apiURL}/login`, login);
  }
}
