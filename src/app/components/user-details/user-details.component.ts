import {Component, OnInit} from '@angular/core';
import {User} from "../../generated-code";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserEndpointApi} from "../../api-client/endpoint/user-endpoint-api";
import {passwordValidator, usernameValidator} from "../../shared/helpers";
import {AppColors} from "../../shared/colors";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user!: User;
  editMode: boolean = false;
  profileEditForm!: FormGroup;
  token: string | undefined = '';

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute,
              private fb: FormBuilder, private userEndpointApi: UserEndpointApi) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
    });
    this.userEndpointApi.getUserById(this.userId).subscribe(
      user => this.user = user,
      () => this.snackBar.open('Error when getting using', 'Close', {
        duration: 1500,
        panelClass: ["error-snackbar"]
      })
    );
    this.profileEditForm = this.fb.group({
      name: [this.user?.name || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', Validators.required],
      username: [this.user?.username || '', usernameValidator()],
      password: ['', passwordValidator()],
    });
    console.log(this.profileEditForm);
  }

  saveProfileChanges() {
    this.user = {
      id: this.user.id,
      name: this.profileEditForm.get("name")?.value,
      lastName: this.profileEditForm.get("lastName")?.value,
      email: this.profileEditForm.get("email")?.value,
      phone: this.profileEditForm.get("phone")?.value,
      username: this.profileEditForm.get("username")?.value,
      password: this.profileEditForm.get("password")?.value,
      role: this.user.role
    };
    this.userEndpointApi.updateUser(
      this.user
    ).subscribe(
      () => this.snackBar.open('Successfully updated user!', 'Close', {
        duration: 1500,
        panelClass: ["success-snackbar"]
      }),
      error =>
        this.snackBar.open(error.error.toString(), 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    )
    this.editMode = false;
  }

  protected readonly AppColors = AppColors;
}
