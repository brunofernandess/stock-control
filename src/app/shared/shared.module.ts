import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavigationComponent } from './componentshared/toolbar-navigation/toolbar-navigation.component';
import { PrimeIcons } from 'primeng/api';
import { ProductsHomeComponent } from '../../modules/products/page/products-home/products-home.component';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToolbarModule,
    CardModule,
    ButtonModule,
    ToolbarNavigationComponent,
    ProductsHomeComponent


  ],
  exports: [ToolbarNavigationComponent, ButtonModule, RouterLink],
  providers: [DialogService, CurrencyPipe,],
})
export class SharedModule { }
