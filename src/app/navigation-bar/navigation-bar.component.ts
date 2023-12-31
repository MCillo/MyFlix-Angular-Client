/**
 * Navigation Bar component
 */
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
})
/** 
 * exporting the Navigation Bar component to be used in the app
 */
export class NavigationBarComponent {
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }
  
  /**
   * logs the user out of the app by clearing the username and token from local storage then navigates back to the Welcome Page 
   */
  logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('You have successfully logged out', 'OK', {
      duration: 5000,
    });
  }
/**
 * For navigating to the User Profile page
 */
  navigateToProfilePage(): void {
    this.router.navigate(['profile']);
  }
/**
 * for navigating to the Movie Card page
 */
  navigateToMoviesPage(): void {
    this.router.navigate(['movies']);
  }
}
