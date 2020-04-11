import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  onSaveCredentials( data: any, token: string ): Promise<boolean> {
    return new Promise( (resolve) => {
      localStorage.setItem('token', token);
      localStorage.setItem('data', JSON.stringify( data ));
      resolve(true);
    });
  }

  onClearStorage(): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.clear();
      resolve(true);
    });
  }
}
