import { ChartModule } from 'primeng/chart';
import { timeout } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProductsService } from './../../../../app/services/products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarNavigationComponent } from '../../../../app/shared/componentshared/toolbar-navigation/toolbar-navigation.component';
import { ButtonModule } from 'primeng/button';
import { GetAllProductsResponse } from '../../../../app/models/interfaces/producs/response/GetAllProductsResponse';
import { response } from 'express';

import { ToastrService } from 'ngx-toastr';
import { ProductsDataTransferService } from '../../../../app/shared/services/products/products-data-transfer.service';
import{Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChartData, ChartOptions} from 'chart.js';
import { CardModule,  } from 'primeng/card';
import { ProductsHomeComponent } from '../../../products/page/products-home/products-home.component';
import { Router } from '@angular/router';








@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [ToolbarNavigationComponent, ButtonModule, CardModule, ChartModule, ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})

export class DashboardHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public productsList: Array<GetAllProductsResponse> = [];

  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions


  constructor(
    private productsService: ProductsService,

    private toaster: ToastrService,
    private productsDtService: ProductsDataTransferService



  ) { }


  ngOnInit(): void {

    this.getProductDatas();
  }

  getProductDatas(): void {
    this.productsService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe({
      next: (response) => {
        if(response.length > 0){
          this.productsList = response;
          this.productsDtService.setProductsDatas(this.productsList);
          this.setProductsChartConfig();
    }
  },

    error: (err) => {
      if(err.status === 404){
        this.toaster.error('Sessão expirada, faça login novamente!', 'Erro!')
        timeout(2000);
      }

      }
    });
  }

  setProductsChartConfig(): void {
    if(this.productsList.length > 0) {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productsChartDatas = {
      labels: this.productsList.map((element) => element?.name),
      datasets: [
        {
          label: 'Quantidade',
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          data: this.productsList.map((element) => element?.amount),
        },
      ],

  };

  this.productsChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {

            color: textColor,
          },
        },
      },


      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
          }
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }
  }


  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();

}
  }


