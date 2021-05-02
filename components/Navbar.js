import { ShopContext } from 'context/shopContext';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const {
    state: { isCartOpen },
    dispatch,
  } = useContext(ShopContext);
  const routes = [
    {
      path: '/',
      label: 'Home',
      featured: false,
    },
    {
      path: !user ? '/api/auth/login' : '/api/auth/logout',
      label: !user ? 'Login' : `${user?.name} Logout`,
      featured: false,
    },
  ];
  const navbarLinks = routes.map((item) => (
    <li key={item.path}>
      <Link href={item.path}>{item.label}</Link>
    </li>
  ));

  const toggleCart = () => {
    if (!isCartOpen) {
      dispatch({ type: 'OPEN_CART' });
    } else {
      dispatch({ type: 'CLOSE_CART' });
    }
  };
  return (
    <nav className="navbar">
      <div className="innerNav">
        <div className="logo">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M21 13.242V20h1v2H2v-2h1v-6.758A4.496 4.496 0 0 1 1 9.5c0-.827.224-1.624.633-2.303L4.345 2.5a1 1 0 0 1 .866-.5H18.79a1 1 0 0 1 .866.5l2.702 4.682A4.496 4.496 0 0 1 21 13.242zm-2 .73a4.496 4.496 0 0 1-3.75-1.36A4.496 4.496 0 0 1 12 14.001a4.496 4.496 0 0 1-3.25-1.387A4.496 4.496 0 0 1 5 13.973V20h14v-6.027zM5.789 4L3.356 8.213a2.5 2.5 0 0 0 4.466 2.216c.335-.837 1.52-.837 1.856 0a2.5 2.5 0 0 0 4.644 0c.335-.837 1.52-.837 1.856 0a2.5 2.5 0 1 0 4.457-2.232L18.21 4H5.79z" />
          </svg>
          <span>BikeShop</span>
        </div>
        <ul>{navbarLinks}</ul>
        {isLoading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        <div className="cartLogo" onClick={toggleCart}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
