import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Simplified API for client app to communicate with the API or Server-side
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importing Angular Matterial Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserloginFormComponent } from './user-login-form/user-login-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';



@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    MovieCardComponent,
    UserloginFormComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
