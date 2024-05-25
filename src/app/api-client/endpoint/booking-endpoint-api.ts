import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../../authentication/auth.service";
import {Booking} from "../../generated-code";

@Injectable({
  providedIn: 'root'
})
export class BookingEndpointApi {
  private baseUrl = 'http://localhost:8081/bookings';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.authService.tokenSubject$.subscribe(
      token => this.tokenSubject.next(token)
    );
  }

  createBooking(carId: number, userId: number, booking: Booking): Observable<any> {
    const url = `${this.baseUrl}/create?carId=${carId}&userId=${userId}`;
    return this.http.post<any>(url, booking, this.authService.getHttpOptions(this.tokenSubject));
  }

  updateBooking(booking: Booking): Observable<any> {
    const url = `${this.baseUrl}/update`;
    return this.http.put<any>(url, booking, this.authService.getHttpOptions(this.tokenSubject));
  }

  getBookingsByUserId(userId: number): Observable<Booking[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<Booking[]>(url, this.authService.getHttpOptions(this.tokenSubject));
  }
}
