import {Component, OnInit} from '@angular/core';
import {User} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppColors} from "../../shared/colors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserEndpointApi} from "../../api-client/endpoint/user-endpoint-api";
import {passwordValidator, usernameValidator} from "../../shared/helpers";
import {UserProfileEndpointApi} from "../../api-client/endpoint/upload-endpoint-api";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  editMode: boolean = false;
  profileEditForm!: FormGroup;
  profileForm!: FormGroup;
  token: string | undefined = '';
  selectedFile: File | null = null;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private userEndpointApi: UserEndpointApi,
              private userProfileEndpointApi: UserProfileEndpointApi) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      user => this.user = user!,
      () => this.snackBar.open('There was an error when getting the user!', 'Close', {
        duration: 1500,
        panelClass: ["error-snackbar"]
      })
    );
    this.profileEditForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      username: [this.user.username, usernameValidator()],
      password: ['', passwordValidator()],
    });
    this.profileForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  /*onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveProfilePicture(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.userProfileEndpointApi.uploadProfilePicture(this.user.id!, formData).subscribe(
        () => {
          this.snackBar.open('Profile picture was uploaded successfully!', 'Close', {
            duration: 1500,
            panelClass: ['success-snackbar']
          });
          // Reset the form after successful upload if needed
          this.profileForm.reset();
        },
        error => {
          this.snackBar.open(error.error.toString(), 'Close', {
            duration: 1500,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }*/

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
    this.userEndpointApi.updateProfile(
      this.user
    ).subscribe(
      () => this.login(),
      error =>
        this.snackBar.open(error.error.toString(), 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    )
    this.editMode = false;
  }

  login(): void {
    this.snackBar.open(`Successfully updated profile!`, 'Close', {
      duration: 1500,
      panelClass: ["success-snackbar"]
    });
    this.userEndpointApi.login({
      username: this.user.username,
      password: this.user.password
    }).subscribe(
      (response) => {
        this.token = response.token;
        if (this.token) {
          this.authService.login(this.token);
        }
      },
      error =>
        this.snackBar.open(error.error.toString(), 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    );
  }

  protected readonly AppColors = AppColors;
}
