import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
  
export class NavigationBarComponent {
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }
  
  logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('You have successfully logged out', 'OK', {
      duration: 5000,
    });
  }

  navigateToProfilePage(): void {
    this.router.navigate(['profile']);
  }

  navigateToMoviesPage(): void {
    this.router.navigate(['movies']);
  }
}
