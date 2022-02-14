import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public baseUrl=environment.baseUrl;
  //Everything here below is made public so that the services that take from it can access it. But be sure to make 
  //sure that the shared class itself is private so that we have some level of security
  constructor(public http:HttpClient, public router:Router,public toastr:ToastrService) { }


}
