import '../checkout/CheckoutHeader.css'
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png'
import Logo from '../../assets/images/logo.png'
import MobileLogo from '../../assets/images/mobile-logo.png'
import { NavLink } from 'react-router';
export function CheckoutHeader({ paymentSummary }) {
  return (
    <>
      <div className="checkout-header"
        data-testid="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <NavLink to="/">
              <img className="logo" src={Logo} />
              <img className="mobile-logo" src={MobileLogo} />
            </NavLink>
          </div>

          <div className="checkout-header-middle-section">
            Checkout ({paymentSummary?.totalItems ?? 0}) items
          </div>

          <div className="checkout-header-right-section">
            <img src={CheckoutLockIcon} />
          </div>
        </div>
      </div>
    </>
  );
}