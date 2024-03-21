import { timeout } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProductsService } from './../../../../app/services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ToolbarNavigationComponent } from '../../../../app/shared/componentshared/toolbar-navigation/toolbar-navigation.component';
import { ButtonModule } from 'primeng/button';
import { GetAllProductsResponse } from '../../../../app/models/interfaces/producs/response/GetAllProductsResponse';
import { response } from 'express';

import { ToastrService } from 'ngx-toastr';








@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [ToolbarNavigationComponent, ButtonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})

export class DashboardHomeComponent implements OnInit {

  public productsList: Array<GetAllProductsResponse> = [];


  constructor(
    private productsService: ProductsService,

    private toaster: ToastrService,


  ) { }

  ngOnInit(): void {
    this.getProductDatas();
  }

  getProductDatas(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if(response.length > 0){
          this.productsList = response;

          console.log("DADOS DOS PRODUTOS", this.productsList);
    }
  },
    error: (err) => {
      console.log(err);
      this.toaster.success('Erro ao buscar produto!', 'Erro!')
      timeout(2000);


      }
    });
  }

    };
