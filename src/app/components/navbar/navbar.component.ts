import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nameUser = '';

  constructor(private storageSvc: StorageService, private router: Router) { }

  ngOnInit() {
    const data = JSON.parse( localStorage.getItem('data') ) || {nameComplete: ''};
    this.nameUser = data.nameComplete;
  }

  async onLogout() {
    await this.storageSvc.onClearStorage();
    this.router.navigateByUrl('');
  }

}
