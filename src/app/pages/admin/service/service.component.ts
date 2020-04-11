import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CurrierService } from '../../../services/currier.service';
import { PagerService } from '../../../services/pager.service';
import { CurrierModel } from 'src/app/models/currier.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @ViewChild('map', {static: true}) mapElement: ElementRef;
  @ViewChild('infowindowOrigin', {static: true}) infowindowOrigin: ElementRef;
  @ViewChild('infowindowFinish', {static: true}) infowindowFinish: ElementRef;

  rowsForPage = 10;

  titleModal = 'Nuevo servicio currier';
  loadData = false;

  qClient = '';

  dataServices: any[] = [];
  infoPagination = 'Mostrando 0 de 0 registros.';
  pagination = {
    currentPage : 1,
    pages : [],
    totalPages: 0
  };

  map: google.maps.Map;
  markerOrigin: google.maps.Marker;
  markerFinish: google.maps.Marker;

  bodyCurrier: CurrierModel;

  constructor(private currierSvc: CurrierService, private pagerSvc: PagerService) { }

  ngOnInit() {
    this.bodyCurrier = new CurrierModel();
    this.onGetService(1);
    this.loadMap();
  }

  loadMap() {

    const latlngO = new google.maps.LatLng( -12.040824100078229, -77.04198469848635 );
    const latlngF = new google.maps.LatLng( -12.040824100078229, -77.04198469848635 );

    const optMap: google.maps.MapOptions = {
      center: latlngO,
      zoom: 13.0,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map( this.mapElement.nativeElement, optMap );

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

  onGetService(page: number) {
    console.log('search curriers service');

    this.currierSvc.onGetServiceAdmin(this.rowsForPage, page, this.qClient).subscribe( (res) => {
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
    });

  }

  onShowCurrier( currier: any ) {
    this.titleModal = 'Servicio currier ' + currier.codeService;
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

}
