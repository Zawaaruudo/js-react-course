import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import axios from 'axios';
import './HomePage.css';
export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      });
  }, [])
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-cdfavicon.png" />
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}