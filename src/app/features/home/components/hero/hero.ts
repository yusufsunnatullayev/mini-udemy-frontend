import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  standalone: true,
  imports: [ButtonModule],
})
export class HeroComponent implements OnInit {
  router = inject(Router);
  constructor() {}

  ngOnInit(): void {}
}
