/**
 * Welcome Page component
 */

/**
 * importing modules to use in the Welcome Page component
 */
import { Component, OnInit } from '@angular/core';
import { UserloginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
/**
 * Exporting the Welcome Page component for use in the App
 */
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  /**
   * opens a registration dialog for the user to register for the APP
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  /**
   * opens a user login dialog for the user to login to use the app
   */
openUserLoginDialog(): void {
    this.dialog.open(UserloginFormComponent, {
      width: '280px'
    });
  }
}