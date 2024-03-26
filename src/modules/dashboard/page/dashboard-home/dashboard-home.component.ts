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







@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [ToolbarNavigationComponent, ButtonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})

export class DashboardHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public productsList: Array<GetAllProductsResponse> = [];


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
    }
  },
    error: (err) => {
      console.log(err);
      this.toaster.success('Erro ao buscar produto!', 'Erro!')
      timeout(2000);


      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

    };
