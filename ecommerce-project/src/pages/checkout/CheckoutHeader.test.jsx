import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutPage } from './CheckoutPage';
import axios from 'axios';
vi.mock('axios');
describe('CheckoutHeader component', () => {
  let loadCart;
  let cart;
  let deliveryOptions;
  let paymentSummary;
  beforeEach(() => {
    loadCart = vi.fn();
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
      product: {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        image: "/images/cotton-socks.png",
        price: 1090,
        rating: {
          stars: 4.5, count: 87
        },
        keywords: ['socks', 'cotton', 'apparel'],
      },
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
      product: {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        name: 'Intermediate Size Basketball',
        image: "/images/basketball.png",
        price: 2095,
        rating: {
          stars: 4, count: 127
        },
        keywords: ['sports', 'basketball'],
      },
    }];
    deliveryOptions = [{
      id: '1',
      deliveryDays: 7,
      priceCents: 0,
      estimatedDeliveryTimeMs: 1747597994451
    },
    {
      id: '2',
      deliveryDays: 3,
      priceCents: 499,
      estimatedDeliveryTimeMs: 1747252394451
    }, {
      id: '3',
      deliveryDays: 1,
      priceCents: 999,
      estimatedDeliveryTimeMs: 1747079594451
    }];
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };
    axios.get.mockImplementation(async (url) => {
      if (url === '/api/delivery-options?expand=estimatedDeliveryTime') {
        return { data: deliveryOptions };
      }
      if (url === '/api/payment-summary') {
        return { data: paymentSummary };
      }
      return { data: {} };
    });
  });
  it('displays the page correctly', async () => {
    render(
      <MemoryRouter>
        <CheckoutPage
          paymentSummary={paymentSummary}
          cart={cart}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );
    screen.debug();
    const paymentSummaryElement = await screen.findByTestId('payment-summary-product-cost');
    expect(axios.get)
      .toHaveBeenCalledWith('/api/delivery-options?expand=estimatedDeliveryTime');
    expect(axios.get).toHaveBeenCalledWith('/api/payment-summary');
    expect(screen.getByText('Review your order')).toBeInTheDocument();
    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs'))
      .toBeInTheDocument();
    expect(screen.getByText('Intermediate Size Basketball')).toBeInTheDocument();
    expect(paymentSummaryElement).toBeInTheDocument();
    expect(screen.getByText('Payment Summary')).toBeInTheDocument();
    expect(screen.getByTestId('payment-summary-product-cost'))
      .toHaveTextContent('Items (3):');
    expect(screen.getByTestId('payment-summary-shipping-cost'))
      .toHaveTextContent('4.99');
  });
});