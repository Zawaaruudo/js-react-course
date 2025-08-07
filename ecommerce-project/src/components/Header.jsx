import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import CartIcon from '../../public/images/icons/cart-icon.png'
import SearchIcon from '../../public/images/icons/search-icon.png';
import LogoWhite from '../../public//images/logo-white.png';
import MobileLogoWhite from '../../public/images/mobile-logo-white.png'
import './Headerr.css'
export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');
  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  }
  const searchProducts = () => {
    navigate(`/?search=${search}`);
  }
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="return-to-home-link">
            <img className="logo"
              data-testid="header-logo"
              src={LogoWhite} />
          </NavLink>
          <NavLink to="/" className="return-to-home-link">
            <img className="mobile-logo"
              data-testid="header-mobile-logo"
              src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            value={search}
            onChange={updateSearchInput}
            className="search-bar"
            type="text"
            placeholder="Search"
            data-testid="header-search-bar"
          />

          <button onClick={searchProducts} className="search-button"
            data-testid="header-search-button">
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders"
            data-testid="header-orders-link">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout"
            data-testid="header-cart-link">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}