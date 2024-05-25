import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginRequest, User} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserEndpointApi {
  private baseUrl = 'http://localhost:8081/user';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.authService.tokenSubject$.subscribe(
      token => this.tokenSubject.next(token)
    );
  }

  login(loginRequest?: LoginRequest): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, loginRequest).pipe(
      map(response => {
        return response;
      })
    );
  }

  signUp(user: User): Observable<any> {
    const url = `${this.baseUrl}/signUp`;
    return this.http.post<any>(url, user);
  }

  updateProfile(user: User): Observable<any> {
    const url = `${this.baseUrl}/update`;
    return this.http.put<any>(url, user, this.authService.getHttpOptions(this.tokenSubject));
  }
}
