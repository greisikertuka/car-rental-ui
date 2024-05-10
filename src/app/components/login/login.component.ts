import {Component} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {LoginRequest} from "../../generated-code";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token: string | undefined = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private carRentalApi: CarRentalApi,
              private snackBar: MatSnackBar) {
  }

  login(): void {
    let loginRequest: LoginRequest = {
      username: this.username,
      password: this.password
    };
    this.carRentalApi.userEndpointService.userLoginPost(loginRequest).subscribe(
      (response) => {
        this.token = response.token;
        if (this.token) {
          this.authService.login(this.token);
          this.snackBar.open(`Successfully logged in!`, 'Close', {
            duration: 1500,
          });
        }
      },
      () =>
        this.snackBar.open(`Error logging in!`, 'Close', {
          duration: 1500,
        })
    );
  }

}
