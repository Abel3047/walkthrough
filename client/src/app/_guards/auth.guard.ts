import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private account:AccountService, private toastr:ToastrService){}

  canActivate(): Observable<boolean> {
    return this.account.currrentUser$.pipe(
      map(user=>{
         
    console.log(this.account.currrentUser$);
        if(user) return true;
        this.toastr.error('You shall not pass')

      })

    )
  }
  
}
