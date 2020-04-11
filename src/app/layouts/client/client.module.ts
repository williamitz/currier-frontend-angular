import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CLIENT_ROUTES } from './client.routes';
import { HomeComponent } from '../../pages/client/home/home.component';
import { ComponentsModule } from '../../components/components.module';
import { CurrierServicesComponent } from '../../pages/client/currier-services/currier-services.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    CurrierServicesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild( CLIENT_ROUTES )
  ],
  exports: [],
  providers: [],
})
export class ClientLayoutModule {}
