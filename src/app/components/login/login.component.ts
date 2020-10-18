import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login.model';
import { LoginService } from 'src/app/service/login.service';
import {HardcodeAuthenticationService} from '../../service/hardcode-authentication.service';
import {BasicAuthenticationService} from '../../service/basic-authentocation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username ='sena'
  password=''
  errorMessage ='Invalid Login'
  invalidLogin = false
 
  constructor(private router:Router, public hardcodeAuthenticationService: HardcodeAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(){
  {
    if(this.hardcodeAuthenticationService.authentication(this.username,this.password)){
      this.invalidLogin = false 
      this.router.navigate(['/'])
   }else{
     this.invalidLogin = true
   }
  }

}
handleBasicAuthLogin(){
  {
    this.basicAuthenticationService.executeAuthenticationService(this.username,this.password)
    .subscribe(
      data =>{
        console.log(data)
        this.router.navigate(['/'])
        this.invalidLogin = false
      },
      error =>{
        console.log(error)
        this.invalidLogin = true
      }
    )
       
  }

}
handleJWTBasicAuthLogin(){
  {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username,this.password)
    .subscribe(
      data =>{
        console.log(data)
        this.router.navigate(['/'])
        this.invalidLogin = false
      },
      error =>{
        console.log(error)
        this.invalidLogin = true
      }
    )
       
  }

}

}
