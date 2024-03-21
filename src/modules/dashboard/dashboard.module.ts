import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import{ToolbarModule} from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../../app/shared/shared.module';
import { ToolbarNavigationComponent } from '../../app/shared/componentshared/toolbar-navigation/toolbar-navigation.component';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardHomeComponent,
    RouterModule.forChild(DASHBOARD_ROUTES),
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastrModule,
    ChartModule,
    SharedModule,
    ToolbarNavigationComponent,
    ToastrModule,


  ],

  providers: [MessageService, CookieService, ToastrService],
})
export class DashboardModule { }
