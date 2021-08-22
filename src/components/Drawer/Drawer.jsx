import React, { useState, useContext } from 'react';
import axios from 'axios';
import Info from '../Info';
import AppContext from '../../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemoveItem }) {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { cartItems, setCartItems } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://611a81eb5710ca00173a1a69.mockapi.io/orders', {
        items: cartItems,
      });
      //await axios.put('https://611a81eb5710ca00173a1a69.mockapi.io/cart', []);
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      // ! This is MockApi workaround, cause it can't replace the whole database lol
      for (let i = 0; i, cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://611a81eb5710ca00173a1a69.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert(`MockApi не поддерживает замену всей базы: \n${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {console.log('items.length: ', items.length)}
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="cartItem d-flex align-center mb-20">
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className="cartItemImg"
                    />
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.title}</p>
                      <b>{item.price}</b>
                    </div>
                    <img
                      onClick={() => onRemoveItem(item.id)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul className="cartTotalBlock">
                <li className="d-flex">
                  <span>Итого: </span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderCompleted
                ? `Ваш заказ ${orderId} передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderCompleted ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
