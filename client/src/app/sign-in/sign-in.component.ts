import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  model:any={};
  //We made the service public so that we can access the method
  constructor(public account:AccountService) { }

  ngOnInit(): void {
  }

}
