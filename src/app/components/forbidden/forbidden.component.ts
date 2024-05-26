import { Component } from '@angular/core';
import {AppColors} from "../../shared/colors";

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

    protected readonly AppColors = AppColors;
}
