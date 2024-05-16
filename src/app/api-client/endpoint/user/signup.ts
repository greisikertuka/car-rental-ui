import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../../../authentication/auth.service";
import {User} from "../../../generated-code";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private baseUrl = 'http://localhost:8081/user';

  constructor(private http: HttpClient) {
  }

  signUp(user: User): Observable<any> {
    const url = `${this.baseUrl}/signUp`;
    return this.http.post<any>(url, user);
  }
}
