import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';




@Component({
  selector: 'toolbar-navigation',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, CommonModule, RouterLink] ,
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: [],


})
export class ToolbarNavigationComponent {

  constructor(private cookie: CookieService, private router: Router) { }

  handleLogout() {
    this.cookie.delete('USER_INFO');
    this.router.navigate(['/home']);
  }

  redirectDashboard() {
    this.router.navigate(['/dashboard']);
  }

  redirectProducts() {
    this.router.navigate(['/products']);
  }
}



