import {Component, OnInit} from '@angular/core';
import {User} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppColors} from "../../shared/colors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserEndpointApi} from "../../api-client/endpoint/user-endpoint-api";
import {convertToCamelCase, passwordValidator, usernameValidator} from "../../shared/helpers";
import {FileEndpointApi} from "../../api-client/endpoint/file-endpoint-api";

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
  selectedFile: File | null = null;
  token: string | undefined = '';
  profilePictureSrc: string | undefined;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private userEndpointApi: UserEndpointApi,
              private fileEndpointApi: FileEndpointApi) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      user => this.user = user!,
      () => this.snackBar.open('There was an error when getting the user!', 'Close', {
        duration: 1500,
        panelClass: ["error-snackbar"]
      })
    );
    this.fileEndpointApi.getUserPicture(this.user.id!).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureSrc = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.profileForm.patchValue({
        file: file
      });
      this.profileForm.get('file')?.updateValueAndValidity();
    }
  }

  saveProfilePicture(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('fileName', this.selectedFile.name);

      console.log('FormData:', formData.get('file'), formData.get('fileName'));

      this.fileEndpointApi.uploadProfilePicture(this.user.id!, formData).subscribe(
        response => {
          this.snackBar.open(response['message'], 'Close', {
            duration: 1500,
            panelClass: ['success-snackbar']
          });
          this.profileForm.reset();
        },
        () => {
          this.snackBar.open('Error when uploading file', 'Close', {
            duration: 1500,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
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
  protected readonly convertToCamelCase = convertToCamelCase;
}
