import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarClientComponent } from './sidebar-client/sidebar-client.component';
import { RouterModule } from '@angular/router';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarClientComponent,
    SidebarAdminComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarClientComponent,
    SidebarAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
