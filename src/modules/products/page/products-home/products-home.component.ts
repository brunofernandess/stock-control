import { ProductsDataTransferService } from './../../../../app/shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToolbarNavigationComponent } from '../../../../app/shared/componentshared/toolbar-navigation/toolbar-navigation.component';
import { RouterModule, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductsService } from '../../../../app/services/products/products.service';
import { GetAllProductsResponse } from '../../../../app/models/interfaces/producs/response/GetAllProductsResponse';
import { SharedModule } from '../../../../app/shared/shared.module';
import { takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { timeout } from 'rxjs';




@Component({
  selector: 'products-home',
  standalone: true,
  imports: [ToolbarNavigationComponent, RouterModule, SharedModule,],
  templateUrl: './products-home.component.html',
  styleUrls: [],

  providers: [],
})

export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public productDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas(): void {
    const productsLoaded = this.productsDtService.getProductsDatas();

    if  (productsLoaded.length > 0) {
      this.productDatas = productsLoaded;
    } else this.getAPIProductsDatas();

    console.log("DADOS DE PRODUTOS", this.productDatas);


    }
  getAPIProductsDatas() {
    this.productsService
    .getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response) => {
        if(response.length > 0) {
          this.productDatas = response;
          this.productsDtService.setProductsDatas(response);
          console.log("DADOS DE PRODUTOS", this.productDatas);
        }
      },
      error: (error) => {
      console.log(error);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



