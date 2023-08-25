import { Component, OnInit } from '@angular/core';
import { BadgeService } from './badge.service';

@Component({
  selector: 'app-badge',
  template: `

  <button mat-icon-button>
    <mat-icon routerLink="/pages/buy-car">add_shopping_cart</mat-icon>
    <span class="badge" *ngIf="counter > 0">{{ counter }}</span>
  </button>

  `,

  styles: [`

  .badge {
    margin-top:10px;
    position: absolute;
    top: -8px;
    right: -8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background-color: red;
    color: white;
    font-size: 10px;
    border-radius: 50%;
    }

  `]
})
export class BadgeComponent implements OnInit {

  counter: number = 0;

  constructor(
    private badgeService: BadgeService,
  ) { }

  ngOnInit() {
    this.badgeService.getCounter().subscribe(counter => {
      this.counter = counter;
    });
  }

}
