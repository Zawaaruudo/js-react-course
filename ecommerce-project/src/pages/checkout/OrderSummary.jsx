
import { DeliveryDate } from "./DeliveryDate";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
            />

            <div className="cart-item-details-grid">
              <CartItemDetails
                cartItem={cartItem}
                loadCart={loadCart}
              />
              <DeliveryOptions
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
                loadCart={loadCart}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}