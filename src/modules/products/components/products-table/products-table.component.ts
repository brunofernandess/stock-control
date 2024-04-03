import { Component, Input,  } from '@angular/core';
import { GetAllProductsResponse } from '../../../../app/models/interfaces/producs/response/GetAllProductsResponse';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'products-table',
  standalone: true,
  imports: [CardModule, TableModule, ButtonModule, CommonModule, TooltipModule],
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
@Input() products: Array<GetAllProductsResponse> = [];


public productSelected!: GetAllProductsResponse;
}
