import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../../authentication/auth.service";
import {Rating} from "../../generated-code";

@Injectable({
  providedIn: 'root'
})
export class RatingEndpointApi {
  private baseUrl = 'http://localhost:8081/ratings';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.authService.tokenSubject$.subscribe(
      token => this.tokenSubject.next(token)
    );
  }

  addRating(carId: number, userId: number, bookingId: number, rating: Rating): Observable<any> {
    const url = `${this.baseUrl}/create?carId=${carId}&userId=${userId}&bookingId=${bookingId}`;
    return this.http.post<any>(url, rating, this.authService.getHttpOptions(this.tokenSubject));
  }
}
