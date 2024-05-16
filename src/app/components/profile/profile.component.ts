import {Component, OnInit} from '@angular/core';
import {User} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppColors} from "../../shared/colors";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      user => this.user = user!,
      () => this.snackBar.open('There was an error when getting the user!', 'Close', {
        duration: 1500,
        panelClass: ["error-snackbar"]
      })
    )
  }


  protected readonly AppColors = AppColors;
}
