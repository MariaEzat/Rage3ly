import { Component } from '@angular/core';
import { TokenService } from './shared/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rage3ly';
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    if (!this.tokenService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

}
