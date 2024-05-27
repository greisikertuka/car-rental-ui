import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CarEndpointApi {
  private baseUrl = 'http://localhost:8081/cars';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllCars(): Observable<Car[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<Car[]>(url);
  }

  getCarById(id: number): Observable<Car> {
    const url = `${this.baseUrl}/get/${id}`;
    return this.http.get<Car>(url);
  }

  deleteCarById(id: number) {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<any>(url, this.authService.getHttpOptions());
  }

  createCar(car: Car) {
    const url = `${this.baseUrl}/create`;
    return this.http.post<any>(url, car, this.authService.getHttpOptions());
  }
}
