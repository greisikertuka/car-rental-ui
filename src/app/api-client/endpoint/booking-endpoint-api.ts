import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../../authentication/auth.service";
import {Booking} from "../../generated-code";

@Injectable({
  providedIn: 'root'
})
export class BookingEndpointApi {
  private baseUrl = 'http://localhost:8081/bookings';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createBooking(carId: number, userId: number, booking: Booking): Observable<any> {
    const url = `${this.baseUrl}/create?carId=${carId}&userId=${userId}`;
    return this.http.post<any>(url, booking, this.authService.getHttpOptions());
  }

  updateBooking(booking: Booking): Observable<any> {
    const url = `${this.baseUrl}/update`;
    return this.http.put<any>(url, booking, this.authService.getHttpOptions());
  }

  getAllBookings() {
    const url = `${this.baseUrl}/all`;
    return this.http.get<Booking[]>(url, this.authService.getHttpOptions());
  }

  getBookingsByUserId(userId: number): Observable<Booking[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<Booking[]>(url, this.authService.getHttpOptions());
  }

  deleteBookingById(id: number) {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<any>(url, this.authService.getHttpOptions());
  }
}
