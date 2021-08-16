import React from 'react';

function Header({ onClickCart }) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} alt="logo" src="/img/logo.png" />
        <div>
          <h3 className="text-uppercase">React Botinki</h3>
          <p className="opacity-5">Магазин лучших botinok</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30 cu-p">
          <img onClick={onClickCart} width={18} height={18} alt="cart" src="/img/cart.svg" />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} alt="user" src="/img/user.svg" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
