import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'signin', component:SignInComponent},
  {path:'', component:HomeComponent},//I include it here cause it doesn't work ,I don't know why
  {path:'signup', component:SignupComponent},
  //below we have a dummy route that we use to add AuthGuard to all of the children paths. Note that the path 
  //is empty for the dummy route.
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children: [
      {path:'members', component:MemberListComponent},
      {path:'members/:id', component:MemberDetailComponent},//this here takes in a route parameter, thats what that semi does
      {path:'lists', component:ListsComponent },
      {path:'messages', component:MessagesComponent },
    ]
  },
  //The below is to cater for empty or wildcard urls so patchMatch checks the whole url to see if it matches any
  //Thing, and if it doesn't it will take you to home page
  {path:'**', component:HomeComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
