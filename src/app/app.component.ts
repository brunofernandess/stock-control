
import { Component, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import{ PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,


    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'stock-control';

  constructor(private primeNgConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}

