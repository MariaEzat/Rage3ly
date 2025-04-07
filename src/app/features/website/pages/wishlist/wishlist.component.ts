import { Component, Input, OnInit } from '@angular/core';
import { CarOilComponent } from '../../components/car-oil/car-oil.component';
import { CommonModule } from '@angular/common';
import { WebsiteService } from '../../services/website.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [CommonModule, CarOilComponent,SharedModule,RouterModule]
})
export class WishlistComponent implements OnInit {
  constructor(public websiteService: WebsiteService ,private _router: Router) { }
  ngOnInit(): void {
  
  }
}
