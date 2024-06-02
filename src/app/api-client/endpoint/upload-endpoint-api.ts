import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileEndpointApi {
  private baseUrl = 'http://localhost:8081/files';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  uploadProfilePicture(userId: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}/profile-picture`;
    return this.http.post<any>(url, formData, this.authService.getHttpOptions());
  }

  getProfilePictureUrl(userId: string): string {
    return `${this.baseUrl}/${userId}/profile-picture`;
  }

}
