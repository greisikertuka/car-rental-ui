import {Component, OnInit, ViewChild} from '@angular/core';
import {UserEndpointApi} from "../../api-client/endpoint/user-endpoint-api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppColors} from "../../shared/colors";
import {Booking, User} from "../../generated-code";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.scss']
})
export class AdminUserTableComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'action'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userEndpointApi: UserEndpointApi,
              private snackBar: MatSnackBar,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
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

  protected readonly AppColors = AppColors;
}
