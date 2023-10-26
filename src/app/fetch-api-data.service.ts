import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces are for naming and defining objects that will be called during the following API calls 
interface UserDetail {
  Username: string;
  Password: string;
}

type UserRegistrationResponse = UserDetail;

interface UpdatedUser {
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
}

interface LoginResponse {
  user: string;
  token: string;
}

interface Movie {
  Title: string;
  Description: string;
  Genre: Genre;
  Director: Director;
  ImagePath: string;
  Featured: boolean;
}

interface Director {
  Name: string;
  Bio: string;
}

interface Genre {
  Name: string;
  Description: string;
}

interface LoggedInUser {
  token: string;
  user: {
    _id: string;
  };
}

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the API call for the "User Registration" endpoint
  public userRegistration(
    userDetails: UserDetail,
  ): Observable<UserRegistrationResponse> {
    console.log(userDetails);
    return this.http
      .post<UserRegistrationResponse>(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError),
      ) as Observable<UserRegistrationResponse>;
  }

  // Making the API Call for the "Get All Movies" endpoint
  getAllMovies(): Observable<Array<Movie>> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Array<Movie>>(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
      ) as Observable<Array<Movie>>;
  }

  // Making the API call for the "Get Movie" endpoint
  getMovie(title: string): Observable<Movie> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie>(apiUrl + 'movies/title/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
      ) as Observable<Movie>;
  }

  // Making the API call for the "Get Director" endpoint
  getDirector(directorName: string): Observable<Director> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Director>(apiUrl + 'movies/director' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
      ) as Observable<Director>;
  }

  // Making the API call for "Get Genre" endpoint
  getGenre(genreName: string): Observable<Genre> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Genre>(apiUrl + 'movies/genre' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
      ) as Observable<Genre>;
  }

  // Making the API call for "Get Favorites" endpoint
  getFavorites(): Observable<LoggedInUser> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get<LoggedInUser>(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError),
      ) as Observable<LoggedInUser>;
  }

  // Making the API call to "Add to Favorites" endpoint
  addFavorites(movieId: string): Observable<UpdateUser> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.FavoriteMovies.push(movieID);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .post(
        apiUrl + 'users/' + user.Username + '/movies/' + movieId, {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer' + token,
          }),
          responseType: 'text',
        },
      )
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
      ) as Observable<UpdatedUser>;
  }

  // Checks if the Favorite Movies array has contents or is empty
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;

  }
  // Makling the API call for "Delete from Favorites" endpoint
  deleteFavorites(movieID: string): Observable<UpdatedUser> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const index = user.FavoriteMovies.indexOf(movieID);
    if (index > -1) {
      // Only splice when an item is found in the array
      user.FavoriteMovies.splice(index, 1);
    }
    // Save the updates to local storage
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
      ) as Observable<UpdatedUser>;
  }


  // Making the API call for "Edit User" endpoint
  editUser(updatedUser: UpdatedUser): Observable<UpdatedUser> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + user.Username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
      ) as Observable<UpdatedUser>;
  }



  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}