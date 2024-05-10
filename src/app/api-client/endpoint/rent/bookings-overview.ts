import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Booking} from "../../../generated-code";
import {AuthService} from "../../../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookingsOverview {
  private baseUrl = 'http://localhost:8081/bookings';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.authService.tokenSubject$.subscribe(
      token => this.tokenSubject.next(token)
    );
  }

  getBookingsByUserId(userId: number): Observable<Booking[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<Booking[]>(url, this.getHttpOptions());
  }

  private getHttpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenSubject.value}` // Use BehaviorSubject's value property
    });
    return {headers: headers};
  }
}
