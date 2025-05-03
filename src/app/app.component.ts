import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppColors} from "./shared/colors";
import {AppNavbarComponent} from "./shared/app-navbar/app-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    AppNavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-rental-ui';

  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  protected readonly AppColors = AppColors;
}
