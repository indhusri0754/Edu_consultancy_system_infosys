import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment1',
  templateUrl: './payment1.component.html',
  styleUrls: ['./payment1.component.css']
})
export class Payment1Component {
  constructor(private router: Router) {}

  redirectToPayments(): void {
    // Replace '/payment2' with the desired route
    this.router.navigate(['/payment2']);
  }
}
