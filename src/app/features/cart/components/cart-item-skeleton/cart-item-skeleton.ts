import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart-item-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule, ButtonModule],
  templateUrl: './cart-item-skeleton.html',
})
export class CartItemSkeletonComponent {}
