import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment1',
  standalone: true,
  imports: [],
  templateUrl: './payment1.component.html',
  styleUrls: ['./payment1.component.css']
})
export class Payment1Component {
  constructor(private router: Router) {}

  // Define the redirectToPayments method
  redirectToPayments(): void {
    // Navigate to the payment page
    this.router.navigate(['./payment2']); // Replace '/payment2' with your target route
  }
}
