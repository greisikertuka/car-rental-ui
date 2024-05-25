import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BookingEndpointService,
  CarEndpointService,
  Configuration,
  RatingEndpointService,
  User,
  UserEndpointService
} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CarRentalApi implements OnInit {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  private basePath: string = 'http://localhost:8081';
  private configuration: Configuration = new Configuration();
  private user!: User | null;
  private token!: String | null;

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => {
        this.user = user;
        this.updateConfiguration();
      }
    );
    this.authService.tokenSubject$.subscribe(
      (token) => {
        this.token = token;
        this.updateConfiguration();
      }
    );
  }

  private updateConfiguration(): void {
    this.configuration = new Configuration({
      accessToken: this.token !== null ? this.token.toString() : undefined,
      username: this.user?.username
    });
  }


  carEndpointService = new CarEndpointService(this.httpClient, this.basePath, this.configuration);
  bookingEndpointService = new BookingEndpointService(this.httpClient, this.basePath, this.configuration);
  userEndpointService = new UserEndpointService(this.httpClient, this.basePath, this.configuration);
  ratingEndpointService = new RatingEndpointService(this.httpClient, this.basePath, this.configuration);
}


