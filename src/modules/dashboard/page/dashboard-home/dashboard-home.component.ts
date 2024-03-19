import { Component } from '@angular/core';
import { ToolbarNavigationComponent } from '../../../../app/shared/componentshared/toolbar-navigation/toolbar-navigation.component';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [ToolbarNavigationComponent, ButtonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})

export class DashboardHomeComponent {

}
