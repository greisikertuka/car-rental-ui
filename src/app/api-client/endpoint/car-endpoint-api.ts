import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Car} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CarEndpointApi {
  private baseUrl = 'http://localhost:8081/cars';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.authService.tokenSubject$.subscribe(
      token => this.tokenSubject.next(token)
    );
  }

  getAllCars(): Observable<Car[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<Car[]>(url);
  }

  getCarById(id: number): Observable<Car> {
    const url = `${this.baseUrl}/get/${id}`;
    return this.http.get<Car>(url);
  }
}
