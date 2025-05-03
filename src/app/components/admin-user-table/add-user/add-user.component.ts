import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getEnumArray, passwordValidator, phoneNumberValidator, usernameValidator} from "../../../shared/helpers";
import {Role, User} from "../../../generated-code";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../bookings-overview/bookings-overview.component";
import {AppColors} from "../../../shared/colors";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  title: String;
  addUserForm: FormGroup;
  roles = getEnumArray(Role);

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.title = data.title;

    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      father: ['', [Validators.required, Validators.maxLength(20)]],
      birthday: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', phoneNumberValidator()],
      username: ['', usernameValidator()],
      password: ['', passwordValidator()],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.addUserForm.valid) {
      let user: User = {
        name: this.addUserForm.value['name'],
        lastName: this.addUserForm.value['lastName'],
        email: this.addUserForm.value['email'],
        phone: this.addUserForm.value['phone'],
        username: this.addUserForm.value['username'],
        password: this.addUserForm.value['password'],
        role: this.addUserForm.value['role']
      }
      this.dialogRef.close(user);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  protected readonly Date = Date;

  protected readonly AppColors = AppColors;
}
