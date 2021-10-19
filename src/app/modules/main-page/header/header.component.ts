import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  public onLogout(): void {
    this.router.navigate(['']);
    this.cookieService.deleteAll();
  }

  
}
