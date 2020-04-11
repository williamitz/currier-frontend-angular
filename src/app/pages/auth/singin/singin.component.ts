import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientModel } from '../../../models/client.model';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  @ViewChild('mapSingin', {static: true}) mapSingin: ElementRef;
  @ViewChild('alertSingin', {static: true}) alertSingin: ElementRef;

  bodyClient: ClientModel;

  map: google.maps.Map;
  loading = false;

  constructor(private authSvc: AuthService, private storageSvc: StorageService, private router: Router) { }

  ngOnInit() {

    this.bodyClient = new ClientModel();

    this.onLoadMap();

  }

  onLoadMap() {

    const latlng = new google.maps.LatLng( -12.04670, -77.03220 );

    const optMaps: google.maps.MapOptions = {
      center: latlng,
      zoom: 13.0,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map( this.mapSingin.nativeElement, optMaps );
    const marker = new google.maps.Marker({
      title: 'Mi ubicación',
      animation: google.maps.Animation.DROP,
      map: this.map,
      position: latlng,
      draggable: true
    });

    google.maps.event.addDomListener( marker, 'dragend', (event: any) => {
      this.bodyClient.latitude =  event.latLng.lat() || 0;
      this.bodyClient.longitude =  event.latLng.lng() || 0;
    });
  }

  onSingin($event: NgForm) {

    if ($event.valid) {
      this.loading = true;
      this.authSvc.onSingin( this.bodyClient ).subscribe( async (res) => {
        if (!res.ok) {
          throw new Error( res.error );
        }

        const { css, msg } = this.onGetError( res.showError );

        if (res.showError !== 0) {
          this.onShowAlert(css, msg);
        } else {
          await this.storageSvc.onSaveCredentials( res.data, res.token );

          this.router.navigateByUrl('/home');
        }

        this.loading = false;
      });
    }
  }

  onShowAlert( css = 'success', msg = '' ) {
    $('#alertSingin').html( `<div class="alert alert-${ css } alert-dismissible fade show" role="alert">
        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
        <span class="alert-text">
        <strong>Warning!</strong> ${ msg }!</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>` );
  }

  onGetError( showError: number ) {

    const css = showError === 0 ? 'success' : 'danger';
    const msg = showError === 0 ? [''] : ['Ya existe un registro'];

    // tslint:disable-next-line: no-bitwise
    if ( showError & 1 ) {
      msg.push('con este email o usuario');
    }

    // tslint:disable-next-line: no-bitwise
    if ( showError & 2 ) {
      msg.push('se encuentra inactivo');
    }

    return { css, msg: msg.join(', ') };

  }

}
