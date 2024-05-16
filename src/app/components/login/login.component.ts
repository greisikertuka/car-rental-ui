import {Component} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";
import {SignUpService} from "../../api-client/endpoint/user/signup";
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Role} from "../../generated-code";
import {formWidth} from "../../shared/helpers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService,
              private carRentalApi: CarRentalApi,
              private signUpService: SignUpService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: ['', this.usernameValidator()],
      password: ['', this.passwordValidator()]
    });
  }

  token: string | undefined = '';
  loginView: boolean = true;
  loginForm: FormGroup;
  signUpForm: FormGroup;

  usernameValidator(): ValidatorFn {
    const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
    return Validators.pattern(usernameRegex);
  }

  passwordValidator(): ValidatorFn {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return Validators.pattern(passwordRegex);
  }

  login(): void {
    this.carRentalApi.userEndpointService.userLoginPost({
      username: this.loginForm.value['username'],
      password: this.loginForm.value['password']
    }).subscribe(
      (response) => {
        this.token = response.token;
        if (this.token) {
          this.authService.login(this.token);
          this.snackBar.open(`Successfully logged in!`, 'Close', {
            duration: 1500,
            panelClass: ["success-snackbar"]
          });
          this.router.navigate([RoutesPath.home]);
        }
      },
      error =>
        this.snackBar.open(error.error.toString(), 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    );
  }

  signUp(): void {
    this.signUpService.signUp({
      name: this.signUpForm.value['name'],
      lastName: this.signUpForm.value['lastName'],
      email: this.signUpForm.value['email'],
      phone: this.signUpForm.value['phone'],
      username: this.signUpForm.value['username'],
      password: this.signUpForm.value['password'],
      role: Role.User
    }).subscribe(
      (response: any) => {
        this.snackBar.open('Successfully created account!', 'Close', {
          duration: 1500,
          panelClass: ["success-snackbar"]
        });
        this.loginView = true;
      },
      (error: any) => {
        this.snackBar.open(error.error.toString(), 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
      }
    );
  }

  protected readonly AppColors = AppColors;
  protected readonly formWidth = formWidth;
}
