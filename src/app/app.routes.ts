
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardHomeComponent } from '../modules/dashboard/page/dashboard-home/dashboard-home.component';
import { AuthGuard } from './guards/auth-guard.service';





export const routes: Routes = [
{
  path: '',
  component: HomeComponent,
},


{

  path: 'home',
  component: HomeComponent,
},

{
  path: 'dashboard',
  loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  canActivate: [AuthGuard]
},




{
  path: 'products',
  loadChildren: () => import('../modules/products/products.module').then(m => m.ProductsModule),
  canActivate: [AuthGuard],
},

];
