
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardHomeComponent } from '../modules/dashboard/page/dashboard-home/dashboard-home.component';
import { AuthGuard } from './guards/auth-guard.service';
import { ProductsHomeComponent } from '../modules/products/page/products-home/products-home.component';




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
  component: DashboardHomeComponent,

},




{
  path: 'products',
  component: ProductsHomeComponent,

},


];
