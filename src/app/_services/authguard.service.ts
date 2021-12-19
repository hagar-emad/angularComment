import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  UrlTree,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthservicesService } from './authservices.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(
    private auth: AuthservicesService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        console.log(user);

        if (localStorage.getItem("token")) {
          // if (!user.emailVerified)                            // if the user hasn't verified their email, send them to that page
          //     this.router.navigate(['/verify-email']);

          resolve(true);
        } else {
          console.log('Auth Guard: user is not logged in');
          this.router.navigate(['/login']); // a logged out user will always be sent to home
          resolve(false);
        }
      });
    });
  }
}
