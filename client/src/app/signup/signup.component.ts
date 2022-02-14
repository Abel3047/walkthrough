import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model:any={}; // We create a model here cause we want to pass in information we got from the html into the service
  //model stays as any cause the Type configuring does nothing for us. Since we must set our variables them in the form
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  //this method is called when we hit submit
  create(){
   this.accountService.signup(this.model);
  }

}
