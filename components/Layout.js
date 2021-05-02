import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';

export default function Layout({ children }) {
  return (
    <div className="grid">
      <Navbar />
      <Cart />
      <main className="main">{children}</main>
    </div>
  );
}
