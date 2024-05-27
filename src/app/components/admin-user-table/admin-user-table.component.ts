import {Component, OnInit, ViewChild} from '@angular/core';
import {UserEndpointApi} from "../../api-client/endpoint/user-endpoint-api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppColors} from "../../shared/colors";
import {User} from "../../generated-code";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../authentication/auth.service";
import {RoutesPath} from "../../shared/routes";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddUserComponent} from "./add-user/add-user.component";
import {ConfirmDialogComponent} from "../../shared/approve-dialog/confirm-dialog.component";

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.scss']
})
export class AdminUserTableComponent implements OnInit {
  users: User[] = [];
  loggedInUser!: User;
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userEndpointApi: UserEndpointApi,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      user => this.loggedInUser = user!
    );
    this.getUsers();
  }

  getUsers() {
    this.userEndpointApi.getAllUsers().subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      () =>
        this.snackBar.open('Error while getting all users!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        }));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openAddUserPopup() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      height: '750px',
      data: {title: 'Add User'}
    });

    dialogRef.afterClosed().subscribe(addedUser => {
      if (addedUser) {
        this.userEndpointApi.createUser(addedUser).subscribe(
          () => {
            this.snackBar.open('User was created successfully!', 'Close', {
              duration: 1500,
              panelClass: ["success-snackbar"]
            });
            this.getUsers();
          },
          () => this.snackBar.open('There was an error when creating the user!', 'Close', {
            duration: 1500,
            panelClass: ["error-snackbar"]
          })
        );
      }
    });
  }

  deleteUser(id: number): void {
    this.userEndpointApi.deleteUserById(id).subscribe(() => {
        this.snackBar.open('Successfully deleted user!', 'Close', {
          duration: 1500,
          panelClass: ["success-snackbar"]
        });
        this.getUsers();
      },
      () =>
        this.snackBar.open('Error deleting user!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        }));
  }

  navigateToUserDetails(userId: number) {
    if (this.loggedInUser.id == userId) {
      this.router.navigate([RoutesPath.profile]);

    } else {
      this.router.navigate([RoutesPath.userDetails], {queryParams: {userId: userId}});
    }
  }

  openDeleteUserDialog(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '200px',
      data: {title: 'Are you sure you want to delete this user?', user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id!);
      }
    });
  }

  protected readonly AppColors = AppColors;
}
