import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('cardElement') cardElement: ElementRef;

  stripePromise: Promise<Stripe>;
  stripe: Stripe;
  card: StripeCardElement;
  paymentResult: string;
  amount: number;
  title: string;

 constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService) {
    this.stripePromise = loadStripe('pk_test_51PZgEnRvbv0RG6bl4GrB72YeDkh9FK2sKCLpCpWlfYQYiyOYHfhxlcsQwyspbCISK4U6FoGWg21XX9wbOc8qRrQZ00jDUzOarY'); // Replace with your Stripe public key
  }

  async ngOnInit() {
    this.stripe = await this.stripePromise;
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    // Get amount and title from query params
    this.route.queryParams.subscribe(params => {
      this.amount = +params['price'];
      this.title = params['title'];
    });
  }

  async handleForm(event: Event): Promise<void> {
    event.preventDefault();
    try {
      await this.submitPayment();
    } catch (error) {
      this.paymentResult = 'Payment failed. Please try again.';
      this.openModal();
    }
  }

  async submitPayment(): Promise<void> {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error('Error generating token:', error);
      this.paymentResult = 'Invalid card details. Please check and try again.';
      this.openModal();
    } else {
      const paymentData = {
        token: token.id,
        amount: this.amount
      };

      const authToken = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.post('http://localhost:8081/api/payment/charge', paymentData, { headers }).subscribe(
        response => {
          console.log('Payment successful', response);
          this.paymentResult = 'Payment successful';
          this.openModal();
        },
        error => {
          console.error('Payment failed', error);
          this.paymentResult = 'Payment failed. Please try again.';
          this.openModal();
        }
      );
    }
  }

  openModal() {
    const modal = document.getElementById("payment-result-modal");
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal() {
    const modal = document.getElementById("payment-result-modal");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
