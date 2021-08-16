import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';

function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // * Native example
    // fetch('https://611a81eb5710ca00173a1a69.mockapi.io/items')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });

    // * Axios example
    axios.get('https://611a81eb5710ca00173a1a69.mockapi.io/items').then((res) => {
      setItems(res.data);
    });

    axios.get('https://611a81eb5710ca00173a1a69.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    // setCartItems([...cartItems, obj]);         !bad!
    // setCartItems((prev) => [...prev, obj]);    !better!
    axios.post('https://611a81eb5710ca00173a1a69.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveCartItem = (id) => {
    axios.delete(`https://611a81eb5710ca00173a1a69.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemoveItem={onRemoveCartItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск: ${searchValue}` : 'Все botinki'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())) // example of filtering (case sensitive) while mapping component
            .map((obj) => (
              <React.Fragment key={obj.id}>
                <Card
                  title={obj.title}
                  price={obj.price}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  onFavorite={() => console.log('Нажали плюс')}
                  onPlus={(item) => onAddToCart(item)}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
