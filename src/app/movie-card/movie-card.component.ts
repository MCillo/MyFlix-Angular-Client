// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
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

  getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getGenre(name: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '50%',
      data: {
        title: name,
        content: description,
      },
    });
  }

  getDirector(name: string, bio: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '50%',
      data: {
        title: name,
        content: bio,
      },
    });
  }

  getSynopsis(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '50%',
      data: {
        title: 'Description',
        content: description,
      },
    });
  }

  addToFavorites(id: string): void {
    this.fetchApiData.addToFavorites(id).subscribe((Response: any) => {
      this.snackBar.open('Added to Favorite Movies', 'OK', {
        duration: 2000,
      });
    });
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  removeFromFavorites(id: string): void {
    this.fetchApiData.deleteFromFavorites(id).subscribe((Response: any) => {
      this.snackBar.open('Removed from Favorite Movies', 'OK', {
        duration: 2000,
      });
    });
  }
}