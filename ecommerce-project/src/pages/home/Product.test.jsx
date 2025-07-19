import { it, expect, describe } from 'vitest';
import { vi } from 'vitest';
import { Product } from './Product';
import { render, screen } from '@testing-library/react';
describe('Product Component', () => {
  it('displays product details correctly', () => {
    const product = {
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
    const loadCart = vi.fn();
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
});