import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  isLoading = true;
  ngOnInit() {
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

}
