import '../checkout/CheckoutHeader.css'
import { PaymentSummary } from './PaymentSummary'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../checkout/CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary'
export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get(
        '/api/delivery-options?expand=estimatedDeliveryTime'
      );
      setDeliveryOptions(response.data);
    };
    fetchCheckoutData();
  }, []);
  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions}
            loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary}
            loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}