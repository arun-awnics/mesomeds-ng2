import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { UserDetails } from '../shared/database/user-details';
/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'mm-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {

  private user: UserDetails;

  constructor(
    private loginService: LoginService
  ) { }

  /**
   * initialising form group
   * @memberOf LoginComponent
   */
  ngOnInit(): void {
    console.log('Init');
  }

  login(userName: string) {
    console.log('Username: ' + userName);
    this.loginService.getUserByName(userName)
    .then((user) => {
      this.user = user;
      console.log('user: ',user);
    });
  }
}
