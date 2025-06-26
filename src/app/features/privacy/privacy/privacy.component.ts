import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      document.body.style.setProperty('overflow-y', 'auto', 'important');
      document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
    }, 1000);
  }

  openWhatsApp() {
    const phoneNumber = '201000318188'; 
    const message = encodeURIComponent('أهلاً، أريد الاستفسار عن المنتج.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }
}
