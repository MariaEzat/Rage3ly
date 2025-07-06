import { Component, ViewEncapsulation } from '@angular/core';
import { HomePageService } from '../service/home-page.service';
import { HomePage } from '../interfaces/home-page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  items:HomePage
  constructor(private _homePageService: HomePageService) {

  }
  isLoading = true;
  ngOnInit() {
    this.loadStatistics();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }


  openWhatsApp() {
    const phoneNumber = '201000318188';
    const message = encodeURIComponent('أهلاً، أريد الاستفسار عن المنتج.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  loadStatistics() {
    this._homePageService.getSatistic().subscribe(response => {

      if (response.isSuccess) {
        this.items=response.data

      }
    })
  }
}

