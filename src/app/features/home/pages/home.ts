import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../components/hero/hero';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [HeroComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
