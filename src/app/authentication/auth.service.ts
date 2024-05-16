import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../generated-code';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  user$ = this.userSubject.asObservable();
  tokenSubject$ = this.tokenSubject.asObservable();

  login(token: string): void {
    const user = this.decodeToken(token);

    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(user);
    this.tokenSubject.next(token);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
    this.tokenSubject.next(null);
  }

  private decodeToken(token: string): any {
    const decodedToken: any = jwtDecode(token);
    return {
      id: decodedToken.id,
      email: decodedToken.email,
      username: decodedToken.username,
      name: decodedToken.name,
      phone: decodedToken.phone,
      role: decodedToken.role
    };
  }
}


