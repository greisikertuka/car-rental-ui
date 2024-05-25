import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";
import {UserEndpointApi} from "../../api-client/endpoint/user-endpoint-api";
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Role} from "../../generated-code";
import {formWidth} from "../../shared/helpers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: string | undefined = '';
  loginView: boolean = true;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  requireAccess: boolean = false;

  constructor(private authService: AuthService,
              private userEndpointApi: UserEndpointApi,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router, private route: ActivatedRoute,) {

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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.requireAccess = params['requireAccess'] == 'true';
    });
  }

  usernameValidator(): ValidatorFn {
    const usernameRegex = /^[a-zA-Z0-9]{8}$/;
    return Validators.pattern(usernameRegex);
  }

  passwordValidator(): ValidatorFn {
    // At least one uppercase, one lowercase, one number, one special character, and at least 8 characters long
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return Validators.pattern(passwordRegex);
  }

  login(): void {
    this.userEndpointApi.login({
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
          let path = localStorage.getItem("path");
          console.log(path);
          console.log(this.requireAccess);
          if (this.requireAccess && path != undefined) {
            let queryParams = JSON.parse(localStorage.getItem("queryParams") || "{}");
            localStorage.removeItem("path");
            localStorage.removeItem("queryParams");
            console.log(queryParams);
            this.router.navigate([path], {queryParams: queryParams});
          } else {
            this.router.navigate([RoutesPath.home]);
          }
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
    this.userEndpointApi.signUp({
      name: this.signUpForm.value['name'],
      lastName: this.signUpForm.value['lastName'],
      email: this.signUpForm.value['email'],
      phone: this.signUpForm.value['phone'],
      username: this.signUpForm.value['username'],
      password: this.signUpForm.value['password'],
      role: Role.User
    }).subscribe(
      () => {
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
