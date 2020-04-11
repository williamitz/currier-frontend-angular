import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { ClientModel } from '../models/client.model';
import { LoginModel } from '../models/login.model';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  onSingin( body: ClientModel ) {
    return this.http.post<IResponse>( URI_API + `/singIn`, body );
  }

  onLogin( body: LoginModel ) {
    return this.http.post<IResponse>( URI_API + `/login`, body );
  }

  onVerifyToken() {
    return this.http.put<IResponse>( URI_API + `/verify/token`, {} , {headers: { Authorization: localStorage.getItem('token') }} );
  }
}
