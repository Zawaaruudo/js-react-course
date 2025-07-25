import { Header } from '../../components/Header'
import axios from 'axios'
import { useState, useEffect } from 'react';
import './OrdersPage.css'
import { OrdersGrid } from './OrdersGrid';
export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data);
    }
    fetchOrdersData();
  }, []);
  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <Header cart={cart} loadCart={loadCart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}