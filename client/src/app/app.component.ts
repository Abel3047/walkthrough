import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Walkthrough';

  constructor(private account:AccountService){}

  ngOnInit(){
    this.setCurrentUser();// This makes sure that everytime we refresh, the user is reset for the observable
    //We need this observable for the guards we have, that can only compare with observables not json strings
  }

  setCurrentUser(){
    const user:User=JSON.parse(localStorage.getItem('User'));
    this.account.setCurrentUser(user);
  }
}
