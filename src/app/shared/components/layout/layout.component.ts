import { Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/features/website/services/website.service';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(public websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.getUserName()
  }


 

  
  getUserName() {
    this.websiteService.userLoading = true;
    this.websiteService.getUserInfo().subscribe((res) => {
      if (res.isSuccess) {
        this.websiteService.userInfo = res.data;
        this.getUserFeatures();
      }
    });
  }

  getUserFeatures() {
    this.websiteService.getUserFeatures().subscribe((res) => {
      if (res.isSuccess) {
        SharedService.featureList = res.data.featureIds;
        this.websiteService.userLoading = false;
      } else {
        console.error('Failed to load user features:', res.message);
      }
    });
  }
}
