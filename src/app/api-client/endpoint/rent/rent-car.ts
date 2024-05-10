import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../../../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RentCar {
  private baseUrl = 'http://localhost:8081/bookings';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.authService.tokenSubject$.subscribe(
      token => this.tokenSubject.next(token)
    );
  }

  createBooking(carId: number, userId: number, booking: any): Observable<any> {
    const url = `${this.baseUrl}/create?carId=${carId}&userId=${userId}`;
    return this.http.post<any>(url, booking, this.getHttpOptions());
  }

  private getHttpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenSubject.value}` // Use BehaviorSubject's value property
    });
    return {headers: headers};
  }
}
