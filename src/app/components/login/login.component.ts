import {Component} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {LoginRequest} from "../../generated-code";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token: string | undefined = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private carRentalApi: CarRentalApi) {
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
        }
      },
      error =>
        console.error('Error logging in', error)
    );
  }

}
