import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserSignup } from '../auth.model';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private errorMsg?: string;

  userToRegister: IUserSignup = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    verifyPassword: ''
  };

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {

  }

  ngOnInit(){}

  async register() {
    // try {
    //   const res = await this.registerService.register(userToRegister);
    //   if(res && res.errorMessage){
    //     alert(res.errorMessage);
    //   }
    // } catch (e) {
    //   alert('Désolé, une erreur a eu lieu empéchant votre enregistrement');
    // }
    this.router.navigate(['login']);
  }

  login() {
    this.router.navigate(['login']);
  }

  backHome() {
    this.router.navigate(['portal']);
  }

}
