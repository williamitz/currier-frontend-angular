import { Injectable } from '@angular/core';
import {  CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad  {

  constructor(private authSvc: AuthService, private router: Router) {}

  canLoad(): Promise<boolean> {
    return new Promise( (resolve) => {
      this.authSvc.onVerifyToken().subscribe((res) => {
        if (!res.ok) {
          this.router.navigateByUrl('');
          return resolve(false);
        }

        resolve(true);
      });
    });
  }
}
