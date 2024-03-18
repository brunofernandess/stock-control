import { Observable } from 'rxjs';
import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(

    private UserService: UserService,
    private router: Router
  ) { }

  canActivate():
     | Observable<boolean | UrlTree>
     | Promise<boolean | UrlTree >
     | boolean
     | UrlTree {

      if (!this.UserService.isLoggedIn()) {
        this.router.navigate(['/home']);
        return false;
      }

      this.UserService.isLoggedIn();
      return true;
  }
}
