import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interfaces/response.interface';
import { CurrierModel } from '../models/currier.model';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})

export class CurrierService {

  constructor(private http: HttpClient) { }

  onAddService( body: CurrierModel ) {
    return this.http.post<IResponse>( URI_API + `/service/add`, body, { headers: { Authorization: localStorage.getItem('token') } } );
  }

  onUpdateService( body: CurrierModel ) {
    // tslint:disable-next-line: max-line-length
    return this.http.put<IResponse>( URI_API + `/service/update/${ body._id }`, body, { headers: { Authorization: localStorage.getItem('token') } } );
  }

  onGetService( rowsForPage: number, page: number ) {
    const header = { headers: { Authorization: localStorage.getItem('token') } };
    // tslint:disable-next-line: max-line-length
    return this.http.get<IResponse>( URI_API + `/service/get?rowsForPage=${ rowsForPage }&page=${ page }`, header );
  }

  onGetServiceAdmin( rowsForPage: number, page: number, qClient = '' ) {
    const header = { headers: { Authorization: localStorage.getItem('token') } };
    const qParams = `rowsForPage=${ rowsForPage }&page=${ page }&qClient=${ qClient }`;
    // tslint:disable-next-line: max-line-length
    return this.http.get<IResponse>( URI_API + `/service/get/admin?${ qParams }`, header );
  }


}
