import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Role, Status, User} from '../generated-code';
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken!: string;
  private refreshToken!: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(private cookieService: CookieService) {
    this.accessToken = this.cookieService.get('accessToken');
    this.refreshToken = this.cookieService.get('refreshToken');
    if (this.accessToken) {
      this.getUserDetails(this.accessToken);
    }
  }

  private getUserDetails(token: string): void {
    const user = this.decodeToken(token);
    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(user);
    this.tokenSubject.next(token);
  }

  login(token: string): void {
    this.cookieService.set('token', token);
    this.getUserDetails(token);
  }

  logout(): void {
    this.cookieService.delete('token');
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
    this.tokenSubject.next(null);
  }

  private decodeToken(token: string): User {
    const decodedToken: any = jwtDecode(token);
    return {
      id: decodedToken.id,
      email: decodedToken.email,
      username: decodedToken.username,
      name: decodedToken.name,
      lastName: decodedToken.lastName,
      phone: decodedToken.phone,
      role: decodedToken.role,
      googleLogin: decodedToken.googleLogin,
      status: decodedToken.status,
      darkMode: decodedToken.darkMode,
      imageUrl: decodedToken.imageUrl,
      imagePublicId: decodedToken.imagePublicId,
      createdAt: decodedToken.createdAt,
      lastUpdate: decodedToken.lastUpdate,

    };
  }

  getHttpOptions(isMultipart: boolean = false): { headers: HttpHeaders } {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenSubject.getValue()}`
    });
    if (!isMultipart) {
      headers = headers.set('Content-Type', 'application/json');
    }
    return {headers};
  }
}
