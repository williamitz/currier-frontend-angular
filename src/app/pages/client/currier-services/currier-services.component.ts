import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CurrierService } from '../../../services/currier.service';
import { CurrierModel } from '../../../models/currier.model';
import { NgForm } from '@angular/forms';
import { PagerService } from '../../../services/pager.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-currier-services',
  templateUrl: './currier-services.component.html',
  styleUrls: ['./currier-services.component.css']
})
export class CurrierServicesComponent implements OnInit {

  @ViewChild('map', {static: true}) mapOrigin: ElementRef;
  @ViewChild('infowindowOrigin', {static: true}) infowindowOrigin: ElementRef;
  @ViewChild('infowindowFinish', {static: true}) infowindowFinish: ElementRef;
  // @ViewChild('mapFinish', {static: true}) mapFinish: ElementRef;



  map: google.maps.Map;
  markerOrigin: google.maps.Marker;
  markerFinish: google.maps.Marker;
  // mapF: google.maps.Map;

  bodyCurrier: CurrierModel;

  rowsForPage = 10;

  titleModal = 'Nuevo servicio currier';
  textButton = 'Guardar';
  loadData = false;

  dataServices: any[] = [];
  infoPagination = 'Mostrando 0 de 0 registros.';
  pagination = {
    currentPage : 0,
    pages : [],
    totalPages: 0
  };

  constructor( private cuerrireSvc: CurrierService, private pagerSvc: PagerService ) { }

  ngOnInit() {
    this.bodyCurrier = new CurrierModel();
    this.loadMap();
    // this.loadMapFinish();

    this.onGetService(1);
  }

  loadMap() {

    const latlngO = new google.maps.LatLng( this.bodyCurrier.coordsOrigin.latitude, this.bodyCurrier.coordsOrigin.longitude );
    const latlngF = new google.maps.LatLng( this.bodyCurrier.coordsFinish.latitude, this.bodyCurrier.coordsFinish.longitude );

    const optMap: google.maps.MapOptions = {
      center: latlngO,
      zoom: 13.0,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map( this.mapOrigin.nativeElement, optMap );

    this.markerOrigin = new google.maps.Marker({
      position: latlngO,
      title: 'Origen',
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true
    });

    google.maps.event.addDomListener( this.markerOrigin, 'dragend', (event: any) => {

      this.bodyCurrier.coordsOrigin.latitude =  event.latLng.lat() || 0;
      this.bodyCurrier.coordsOrigin.longitude =  event.latLng.lng() || 0;
    });

    const infoWindowO = new google.maps.InfoWindow();
    infoWindowO.setContent( this.infowindowOrigin.nativeElement );
    infoWindowO.open(this.map, this.markerOrigin);

    google.maps.event.addDomListener( this.markerOrigin, 'click', (event: Event) => {
      infoWindowO.open(this.map, this.markerOrigin);
    });

    this.markerFinish = new google.maps.Marker({
      position: latlngF,
      title: 'Destino',
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true
    });

    const infoWindowF = new google.maps.InfoWindow();
    infoWindowF.setContent( this.infowindowFinish.nativeElement );
    infoWindowF.open(this.map, this.markerFinish);

    google.maps.event.addDomListener( this.markerFinish, 'click', (event: Event) => {
      infoWindowF.open(this.map, this.markerFinish);
    });

    google.maps.event.addDomListener( this.markerFinish, 'dragend', (event: any) => {
      this.bodyCurrier.coordsFinish.latitude =  event.latLng.lat() || 0;
      this.bodyCurrier.coordsFinish.longitude =  event.latLng.lng() || 0;
    });

  }

  // loadMapFinish() {

  //   const latlng = new google.maps.LatLng( -12.04670, -77.03220 );

  //   const optFinish: google.maps.MapOptions = {
  //     center: latlng,
  //     zoom: 13.0,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };

  //   this.mapF = new google.maps.Map( this.mapFinish.nativeElement, optFinish );



  // }

  onGetService( page: number ) {
    this.cuerrireSvc.onGetService( this.rowsForPage, page ).subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }
      this.dataServices = res.data;
      this.pagination = this.pagerSvc.getPager(res.total, page, this.rowsForPage);

      if ( this.pagination.totalPages > 0 ) {

        const start = ((this.pagination.currentPage - 1) * this.rowsForPage) + 1;
        const end = ((this.pagination.currentPage - 1) * this.rowsForPage) + this.dataServices.length;
        this.infoPagination = `Mostrando del ${ start } al ${ end } de ${ res.total } registros.`;
      }

      console.log(res);
    });
  }

  onResetForm() {
    $('#frmCurrier').trigger('reset');
    this.bodyCurrier = new CurrierModel();
    this.titleModal = 'Nuevo servicio currier';
    this.textButton = 'Guardar';
    this.loadData = false;
  }

  onSubmitCurrier($event: NgForm) {

    if ($event.valid) {

      if (!this.loadData) {

        this.cuerrireSvc.onAddService( this.bodyCurrier ).subscribe( (res) => {
          if (!res.ok) {
            this.onShowAlert('danger', 'Error interno del servidor');
            throw new Error( res.error );
          }

          this.onShowAlert('success', 'Se ha creado un nuevo servicio con éxito');
          $('#btnCloseModalCurrier').trigger('click');
          this.onGetService(1);
          console.log(res);
        });

      } else {
        this.cuerrireSvc.onUpdateService( this.bodyCurrier ).subscribe( (res) => {
          if (!res.ok) {
            this.onShowAlert('danger', 'Error interno del servidor');
            throw new Error( res.error );
          }

          this.onShowAlert('success', 'Se ha actualizado un servicio con éxito');
          $('#btnCloseModalCurrier').trigger('click');
          this.onGetService(1);
          console.log(res);
        });
      }

    }

  }

  onLoadEdit( currier: any ) {
    this.titleModal = 'Editar servicio currier';
    this.textButton = 'Guardar cambios';
    this.loadData = true;
    this.bodyCurrier._id = currier._id;
    this.bodyCurrier.observation = currier.observation;
    this.bodyCurrier.weight = currier.weight;
    this.bodyCurrier.coordsOrigin = currier.coordsOrigin;
    this.bodyCurrier.coordsFinish = currier.coordsFinish;

    const latlngO = new google.maps.LatLng( this.bodyCurrier.coordsOrigin.latitude, this.bodyCurrier.coordsOrigin.longitude );
    const latlngF = new google.maps.LatLng( this.bodyCurrier.coordsFinish.latitude, this.bodyCurrier.coordsFinish.longitude );

    this.markerOrigin.setPosition( latlngO );
    this.markerFinish.setPosition( latlngF );
    this.map.setZoom(12.5);
  }

  onShowAlert( css = 'success', msg = '' ) {
    $('#alterCurrier').html( `<div class="alert alert-${ css } alert-dismissible fade show" role="alert">
        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
        <span class="alert-text">
         ${ msg }!</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>` );
  }

}
