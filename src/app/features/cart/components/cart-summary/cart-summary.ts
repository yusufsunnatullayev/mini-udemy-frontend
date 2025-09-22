import { Component, inject, OnInit } from '@angular/core';
import { CartStore } from '../../store/cart.store';
import { CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.html',
  standalone: true,
  imports: [CurrencyPipe, Button],
})
export class CartSummaryComponent implements OnInit {
  readonly cartStore = inject(CartStore);
  constructor() {}

  ngOnInit(): void {}

  onBuy() {
    this.cartStore.clearCart();
  }
}
