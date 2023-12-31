/**
 * Profile Page component
 */
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
  
  /** 
 * exporting the Profile Page component to be used in the app
 */
export class ProfilePageComponent implements OnInit {
  user: any = {};

  favoriteMovies: any[] = [];

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

/**
 * Gets the user data from the Database using the Get User endpoint from fetch-api-data.service
 */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      console.log(localStorage);

      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.user.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US',
        'UTC+0',
      );
      this.user.FavoriteMovies.forEach((movie: any) => {
        this.favoriteMovies.push(movie);
        console.log(movie);
      });
    });
  }

/**
 * Updates the user data in the Database using the Edit User endpoint from fetch-api-data.service
 */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('Username', data.Username);
        // console.log(data);
        this.snackBar.open('User has been updated', 'OK', {
          duration: 2000,
        });
        window.location.reload();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
    );
  }

/**
 * Deletes the user data from the Database using the Delete User endpoint from fetch-api-data.service
 */
  deleteUser(): void {
    if (confirm('are you sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        // console.log(result);
        localStorage.clear();
      });
    }
  }
}