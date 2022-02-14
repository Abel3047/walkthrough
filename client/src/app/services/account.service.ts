import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //The below two lines are used to make an observable based on the user and we use them with auth guards that
  //need to subscribe to them
  private currentUserSource= new ReplaySubject<User>(1);
  currrentUser$=this.currentUserSource.asObservable();


  constructor(private shared: SharedService) { }
  
  signup(createDto:any){
    

    this.shared.http.post(this.shared.baseUrl+'account/signup',createDto).subscribe(
      response=>{
        console.log(response);
        //We put the method below in subscribe cause it is an asynchoronous task. If we write code after this 
        //block we shouldn't expect it to recieve the right data. In fact it would come out null if we tried that
        this.LogUserIn(response);
        
      },
      error=>{
        console.log(error);
        //We use error.error cause the http error is what we usually print by  the actual message itself is a 
        //property of the http error response
        this.shared.toastr.error(error.error);
      }
    );
  }

  login(LoginDto:any){
    this.shared.http.post(this.shared.baseUrl+'account/login',LoginDto).subscribe(
      response=>{
        console.log(response);
        //We put the method below in subscribe cause it is an asynchoronous task. If we write code after this 
        //block we shouldn't expect it to recieve the right data. In fact it would come out null if we tried that
        this.LogUserIn(response);
      },
      error=>{
        console.log(error);
        //this toastr service is not working
        this.shared.toastr.error(error.error);
      }
    );
  }


  //We regularly have problems accessing the user and their info. This here below makes that so much more 
  //easier. Make sure that it is in the async subscribe
  getUser(){
    return JSON.parse(localStorage.getItem('User'));
  }
  //Takes users to their 'feed'
  LogUserIn(model:any ){
    localStorage.setItem('User', JSON.stringify(model)); 
    this.currentUserSource.next(model);// This sets the user observable to the currentuser$
    this.shared.router.navigateByUrl('/members');
   }
   //Takes user to the landing/Home page
  LogUserOut(){
    localStorage.removeItem('User'); 
    this.currentUserSource.next();// This sets the user observable to nothing. Or at least I believe, I didn't copy
    this.shared.router.navigateByUrl('/');
  }
  //This is necessary so that it doesn't remove the observable everytime we refresh 
  setCurrentUser=(user:User)=>this.currentUserSource.next(user);
}
