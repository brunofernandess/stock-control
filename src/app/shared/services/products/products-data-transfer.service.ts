import { GetAllProductsResponse } from './../../../models/interfaces/producs/response/GetAllProductsResponse';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProductsDataTransferService {
  public productsDataEmitter$ =
   new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(products: Array<GetAllProductsResponse>): void {
    if (products){
    this.productsDataEmitter$.next(products);
    this.getProductsDatas();
  }
}
getProductsDatas(){
  this.productsDataEmitter$.pipe(
    take(1),
    map((data) => data?.filter((product) => product.amount > 0))
  )
  .subscribe({
    next: (response)  => {
      if (response){
        this.productsDatas = response;
      }
    },

  });
  return this.productsDatas
}
}
