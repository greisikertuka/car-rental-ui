import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";
import {UserEndpointApi} from "../../api-client/endpoint/user-endpoint-api";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Role, Status} from "../../generated-code";
import {formWidth, passwordValidator, phoneNumberValidator, usernameValidator} from "../../shared/helpers";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class LoginComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly userEndpointApi = inject(UserEndpointApi);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  token: string | undefined = '';
  loginView: boolean = true;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  requireAccess: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      father: ['', [Validators.required, Validators.maxLength(20)]],
      birthday: [null, Validators.required],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', phoneNumberValidator()],
      username: ['', usernameValidator()],
      password: ['', passwordValidator()]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.requireAccess = params['requireAccess'] == 'true';
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.userEndpointApi.login({
        username: this.loginForm.value['username'],
        password: this.loginForm.value['password']
      }).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (response) => {
          this.token = response.token;
          if (this.token) {
            this.authService.login(this.token);
            this.snackBar.open(`Successfully logged in!`, 'Close', {
              duration: 1500,
              panelClass: ["success-snackbar"]
            });
            let path = localStorage.getItem("path");
            if (this.requireAccess && path != undefined) {
              let queryParams = JSON.parse(localStorage.getItem("queryParams") || "{}");
              localStorage.removeItem("path");
              localStorage.removeItem("queryParams");
              this.router.navigate([path], {queryParams: queryParams});
            } else {
              this.router.navigate([RoutesPath.home]);
            }
          }
        },
        error: (error) => {
          this.snackBar.open(error.error.toString(), 'Close', {
            duration: 1500,
            panelClass: ["error-snackbar"]
          });
        }
      });
    }
  }

  signUp(): void {
    this.userEndpointApi.signUp({
      name: this.signUpForm.value['name'],
      lastName: this.signUpForm.value['lastName'],
      email: this.signUpForm.value['email'],
      phone: this.signUpForm.value['phone'],
      username: this.signUpForm.value['username'],
      password: this.signUpForm.value['password'],
      googleLogin: false,
      status: Status.Active,
      darkMode: true,
      imageUrl: undefined,
      imagePublicId: undefined,
      role: Role.User,
      createdAt: new Date().toString(),
      lastUpdate: undefined,
      businessId: undefined,

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
