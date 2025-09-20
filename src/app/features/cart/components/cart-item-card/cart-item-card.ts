import { Component, inject, input, OnInit } from '@angular/core';
import { ICart } from '../../models/cart.interface';
import { LucideAngularModule, BookCheck, AlarmClockCheck, Globe, Trash2 } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.html',
  standalone: true,
  imports: [LucideAngularModule, ButtonModule, CurrencyPipe],
})
export class CartItemCardComponent implements OnInit {
  item = input<ICart | null>(null);
  readonly cartStore = inject(CartStore);

  BookCheckIcon = BookCheck;
  AlarmClockCheckIcon = AlarmClockCheck;
  GlobeIcon = Globe;
  Trash2Icon = Trash2;

  constructor() {}

  ngOnInit(): void {}
}
