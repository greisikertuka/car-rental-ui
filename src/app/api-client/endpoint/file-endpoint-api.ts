import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileEndpointApi {
  private baseUrl = 'http://localhost:8081/files';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUserPicture(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}/profile-picture`;
    return this.http.get(url, {
      ...this.authService.getHttpOptions(true), responseType: 'blob'
    });
  }

  uploadProfilePicture(userId: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}/profile-picture`;
    return this.http.post<any>(url, formData, this.authService.getHttpOptions(true));
  }

  getCarPicture(carId: number): Observable<any> {
    const url = `${this.baseUrl}/cars/${carId}/thumbnail`;
    return this.http.get(url, {
      ...this.authService.getHttpOptions(true), responseType: 'blob'
    });
  }


  uploadCarPicture(carId: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/cars/${carId}/thumbnail`;
    return this.http.post<any>(url, formData, this.authService.getHttpOptions(true));
  }

}
