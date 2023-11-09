/**
 * src/app/movie-card/movie-card.component.ts
 * creates
 */
/**
 * Imports 
 */
import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

/**
 * Imports from Angular Material for the UI of the Moviecard
 */
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * Defines the movie-card component
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html', // the HTML template for the movie-card
  styleUrls: ['./movie-card.component.scss']  // the styling for the movie-card
})

/**
 * makes the movie-card component available 
 */
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }
  /**
   * references the getAllMovies endpoint from the fetch-api-data-service component
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });

  }

  /**
   * references the getGenre endpoint from the fetch-api-data-service component and opens a diaolog to display the information
   */

  getGenre(name: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '50%',
      data: {
        title: name,
        content: description,
      },
    });
  }

  /**
   * references the getDirector endpoint from the fetch-api-data-service component and opens a diaolog to display the information
   */

  getDirector(name: string, bio: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '50%',
      data: {
        title: name,
        content: bio,
      },
    });
  }

  /**
   * references the getMovie endpoint from the fetch-api-data-service component and opens a diaolog to display the information
   */
  getSynopsis(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '50%',
      data: {
        title: 'Description',
        content: description,
      },
    });
  }

  /**
 * references the addToFavorites endpoint from the fetch-api-data-service component and adds the movie to the favorites array
 */

  addToFavorites(id: string): void {
    this.fetchApiData.addToFavorites(id).subscribe((Response: any) => {
      this.snackBar.open('Added to Favorite Movies', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   *  checks to see if the movie is in the favoriteMovies array
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
 * references the deleteFromFavorites endpoint from the fetch-api-data-service component and removes the movie to the favorites array
 */

  removeFromFavorites(id: string): void {
    this.fetchApiData.deleteFromFavorites(id).subscribe((Response: any) => {
      this.snackBar.open('Removed from Favorite Movies', 'OK', {
        duration: 2000,
      });
    });
  }
}