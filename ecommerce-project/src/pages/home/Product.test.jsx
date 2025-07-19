import { it, expect, describe, vi, beforeEach } from 'vitest';
import { Product } from './Product';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
vi.mock('axios');
describe('Product Component', () => {
  let product;
  let loadCart
  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };
    loadCart = vi.fn();
  });
  it('displays product details correctly', () => {
    render(
      <Product
        loadCart={loadCart}
        product={product}
      />
    );

    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs'))
      .toBeInTheDocument();
    // Check if the price is formatted correctly
    expect(
      screen.getByText('10.90'))
      .toBeInTheDocument();
    // Check if the product image and rating stars are displayed correctly
    expect(
      screen.getByTestId('product-image'))
      .toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');
    //  Check if the rating stars image is displayed correctly
    expect(screen.getByTestId('product-rating-stars'))
      .toHaveAttribute('src', 'images/ratings/rating-45.png');
    // Check if the rating count is displayed correctly
    expect(screen.getByText('87'))
      .toBeInTheDocument();
  });
  it('adds product to cart and shows confirmation', async () => {
    render(
      <Product
        loadCart={loadCart}
        product={product}
      />
    );
    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1
    });
    expect(loadCart).toHaveBeenCalled();
  });
});