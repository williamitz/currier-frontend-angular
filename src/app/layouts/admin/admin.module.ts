import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routes';
import { ComponentsModule } from '../../components/components.module';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { ServiceComponent } from '../../pages/admin/service/service.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild( ADMIN_ROUTES )
  ],
  exports: [],
  providers: [],
})
export class AdminModule {}
