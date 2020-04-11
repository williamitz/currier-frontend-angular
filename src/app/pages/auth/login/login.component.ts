import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../models/login.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bodyLogin: LoginModel;
  loading = false;
  constructor( private authSvc: AuthService, private storageSvc: StorageService, private router: Router ) { }

  ngOnInit() {

    this.bodyLogin = new LoginModel();

  }

  onLogin($event: NgForm) {
    if ($event.valid) {

      this.loading = true;
      this.authSvc.onLogin( this.bodyLogin ).subscribe( async (res) => {
        if (!res.ok) {
          throw new Error( res.error );
        }

        const { css, msg } = this.onGetError( res.showError );

        if (res.showError !== 0) {
          this.onShowAlert(css, msg);
        } else {
          await this.storageSvc.onSaveCredentials( res.data, res.token );
          if ( res.data.user.role === 'ADMIN_ROLE') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/home');
          }
          // this.router.navigateByUrl('/admin');
        }
        this.loading = false;
        console.log(res.data.user.role);
      });
    }
  }
  // <span class="alert-icon"><i class="ni ni-like-2"></i></span>
  onShowAlert( css = 'success', msg = '' ) {
    $('#alertLogin').html( `<div class="alert alert-${ css } alert-dismissible fade show" role="alert">

        <span class="alert-text">
        <strong>Warning!</strong> ${ msg }!</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>` );
  }

  onGetError( showError: number ) {

    const css = showError === 0 ? 'success' : 'danger';
    let msg = showError === 0 ? [''] : [];

    // tslint:disable-next-line: no-bitwise
    if ( showError & 1 ) {
      msg = ['(Usuario) o contraseña inválidos'];
    }

    // tslint:disable-next-line: no-bitwise
    if ( showError & 2 ) {
      msg = ['Usuario o (contraseña) inválidos'];
    }

    return { css, msg: msg.join(', ') };

  }

}
