import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getEnumArray, passwordValidator, usernameValidator} from "../../../shared/helpers";
import {Role, RoleDisplayNames, User} from "../../../generated-code";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../bookings-overview/bookings-overview.component";
import {AppColors} from "../../../shared/colors";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  title: String;
  addUserForm: FormGroup;
  roles = getEnumArray(Role, RoleDisplayNames);

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.title = data.title;

    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: ['', usernameValidator()],
      password: ['', passwordValidator()],
      role: ['', Validators.required],
    });
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
