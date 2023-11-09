/**
 * User Login component
 */

// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
  /** 
 * exporting the User Login component to be used in the app
 */
export class UserloginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserloginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

/**
   * This is the function responsible for sending the form inputs to the backend
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user login goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user)); // sets the username in local storage
        localStorage.setItem('token', result.token); // sets the user token in local storage
        this.router.navigate(['movies']); // upon successful login navigates to the movie-card page
        this.snackBar.open('Login successfull ', 'OK', {
          duration: 2000
        });
      },
      (data) => {
        // console.log(data);
        this.snackBar.open(data, 'OK', {
          duration: 2000
        });
      });
  }
}