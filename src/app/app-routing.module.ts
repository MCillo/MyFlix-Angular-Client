/**
 * module for routing to the different component views in the APP
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/** 
 * exporting the app routingmodule component to be used in the app
 */
export class AppRoutingModule { }
